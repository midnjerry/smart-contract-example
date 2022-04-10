const Migrations = artifacts.require("OrangeToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
