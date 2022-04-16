const FruitSwap = artifacts.require("FruitSwap");
const AppleToken = artifacts.require("AppleToken");
const OrangeToken = artifacts.require("OrangeToken");

module.exports = function (deployer) {
  const applePromise = AppleToken.deployed();
  const orangePromise = OrangeToken.deployed();

  Promise.all([applePromise, orangePromise]).then((contracts) => {
    deployer.deploy(FruitSwap, contracts[0].address, contracts[1].address);
  });
};
