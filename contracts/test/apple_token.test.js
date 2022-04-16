const AppleToken = artifacts.require("AppleToken");
const toBN = web3.utils.toBN;

contract("AppleToken", (accounts) => {
  let instance;
  beforeEach(async () => {
    instance = await AppleToken.deployed();
  })
  
  it("should mint tokens on creation", async () => {
    // BN (BigNumber) is in string format - so require custom operator methods
    const totalSupplyInWei = await instance.totalSupply();
    const mintedAmount = totalSupplyInWei.div(toBN(1e18));
    assert.equal(500, mintedAmount);
  });

  it("should give minted tokens to owner", async() => {
    const balanceInWei = await instance.balanceOf(accounts[0]);
    assert.equal(web3.utils.toWei('500', 'ether'), balanceInWei);
  });
});
