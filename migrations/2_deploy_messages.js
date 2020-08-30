// var TRXMessages = artifacts.require("./TRXMessages.sol");
var TronBillion = artifacts.require("./TronBillion.sol");
//var TrxChain = artifacts.require("./TrxChain.sol");

module.exports = function (deployer) {
  // deployer.deploy(TRXMessages);
  deployer.deploy(TronBillion);
  //deployer.deploy(TrxChain);
};
