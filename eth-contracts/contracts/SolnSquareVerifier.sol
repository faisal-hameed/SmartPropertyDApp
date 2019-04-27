pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token {

    SquareVerifier verifier;

    constructor(address verifierAddress) public {
        verifier = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        address owner;
    }

    // TODO define an array of the above struct
    //Solution[] private solutions = new Solution[](0);

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) public submissions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded();


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint tokenId, address to, bytes32 key) internal {
        Solution memory sol = Solution(tokenId, to);
        submissions[key] = sol;
        //solutions[tokenId] = sol;

        //Emit event
        emit SolutionAdded();
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNew
    (
        uint tokenId,
        address to,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    ) public {
        // Create uniqe solution key
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

        // Check solution not already consumed
        require(submissions[key].owner == address(0), "Solution already consumed");

        // Verify proof
        require(verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Incorrect proff provided.");

        // Record solution submission
        addSolution(tokenId, to, key);

        // Mint token
        super.mint(to, tokenId);

    }

}

contract Verifier {
    function verifyTx(
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    )
        public returns (bool r);
}