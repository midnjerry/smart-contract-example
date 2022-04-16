const FruitSwap = artifacts.require("FruitSwap");
const toBN = web3.utils.toBN;

contract("FruitSwap", (accounts) => {
  let instance;
  beforeEach(async () => {
    instance = await FruitSwap.deployed();
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
