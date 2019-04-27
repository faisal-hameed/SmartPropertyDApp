# Real Estate Marketplace (ERC-721 based tokens on Ethereum platform)

ERC-721 based property tokens which can be traded on Markeplace.

# Testing Contracts
Run below command to test your contracts
`truffle test`

# ZoKrates Process (zkSNARKs)

This is a 5 step process:

1. Compile Program
2. Trusted Setup
3. Compute-Witness
4. Generate-Proof
5. Export-Verifier

```
docker run -v <path-to-zokrates-code>:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash
cd code/square
~/zokrates compile -i square.code
~/zokrates setup [--proving-scheme pghr13]
~/zokrates compute-witness -a 2 4
~/zokrates generate-proof
~/zokrates export-verifier
```
Now copy verifier.sol in contracts folder and update solidity version  


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
