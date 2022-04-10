const Migrations = artifacts.require("FruitSwap");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
