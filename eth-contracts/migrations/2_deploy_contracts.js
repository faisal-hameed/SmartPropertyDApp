// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var CustomERC721Token = artifacts.require("CustomERC721Token");

module.exports = function (deployer) {
  deployer.deploy(SquareVerifier)
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
    });
    deployer.deploy(CustomERC721Token);
};
