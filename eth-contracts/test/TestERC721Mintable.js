var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_zero = '0x0000000000000000000000000000000000000000';
    const account_one = accounts[0];
    const account_two = accounts[1];
    const tokenId1 = 1;
    const tokenId2 = 2;
    const tokenId3 = 3;

    describe('match erc721 spec', function () {
        let tx;
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({ from: account_one });

            // TODO: mint multiple tokens
            tx = await this.contract.mint(account_one, tokenId1, { from: account_one })
            tx = await this.contract.mint(account_one, tokenId2, { from: account_one })
        })

        it('emits the correct event', async function () {
            assert.equal(tx.logs[0].event, 'Transfer')
            assert.equal(tx.logs[0].args.from, account_zero)
            assert.equal(tx.logs[0].args.to, account_one)
            assert.equal(tx.logs[0].args.tokenId, tokenId2)
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply.call();

            assert.equal(totalSupply.toNumber(), 2, 'Total supply is incorrect');
        })

        it('should get token balance', async function () {
            let balance = await this.contract.balanceOf(account_one);

            assert.equal(balance.toNumber(), 2, 'Token balance is incorrect');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let id = 2;
            let expectedURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/' + id;

            let result = await this.contract.tokenURI.call(id);

            assert.equal(result, expectedURI, 'Token URI is incorect');
        })

        it('should transfer token from one owner to another', async function () {
            let reverted = false;
            let tx;
            try {
                tx = await this.contract.transferFrom(account_one, account_two, tokenId1);
            } catch (e) {
                console.log(e);
                reverted = true;
            }

            assert.equal(reverted, false, 'Token should be transfered');
            // Should emit correct event
            assert.equal(tx.logs[0].event, 'Transfer')
            assert.equal(tx.logs[0].args.from, account_one)
            assert.equal(tx.logs[0].args.to, account_two)
            assert.equal(tx.logs[0].args.tokenId, tokenId1)
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({ from: account_one });
        })

        it('should fail when minting when address is not contract owner', async function () {
            let reverted = false;

            try {
                await this.contract.mint(account_one, tokenId1, { from: account_two })
            } catch (e) {
                //console.log(e);
                reverted = true;
            }

            assert.equal(reverted, true, 'Token cannot be minted by non-owner');
        })

        it('should return contract owner', async function () {
            let expectedOwner = account_one;

            let owner = await this.contract.getOwner.call();

            assert.equal(owner, expectedOwner, 'Contract owner is not correct');
        })

    });
})