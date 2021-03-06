// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var Verifier = artifacts.require('SquareVerifier');
var Proof = require('../../zokrates/code/square/proof.json')

contract('TestERC721Mintable', accounts => {

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    describe('Test Verification with correct proof', function () {
        beforeEach(async function () {
            this.contract = await Verifier.new();
        })

        it('It should accept correct proof', async function() {
            //console.log(Proof)
            let result = await this.contract.verifyTx.call(
                Proof.proof.A, 
                Proof.proof.A_p, 
                Proof.proof.B, 
                Proof.proof.B_p, 
                Proof.proof.C, 
                Proof.proof.C_p, 
                Proof.proof.H, 
                Proof.proof.K, 
                Proof.input
            );
            assert.equal(result, true, 'Correct proof should be accepted');
        })
    });

    describe('Test Verification with in-correct proof', function () {
        beforeEach(async function () {
            this.contract = await Verifier.new();
        })

        it('It should not accept incorrect proof', async function() {
            let wrongInputs = [1, 1]

            let result = await this.contract.verifyTx.call(
                Proof.proof.A, 
                Proof.proof.A_p, 
                Proof.proof.B, 
                Proof.proof.B_p, 
                Proof.proof.C, 
                Proof.proof.C_p, 
                Proof.proof.H, 
                Proof.proof.K, 
                wrongInputs
            );
            assert.equal(result, false, 'Incorrect proof should not be accepted');
        })
    });
})


// Test verification with incorrect proof
