const Migrations = artifacts.require("AppleToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
