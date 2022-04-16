const OrangeToken = artifacts.require("OrangeToken");

module.exports = function (deployer) {
  deployer.deploy(OrangeToken);
};
