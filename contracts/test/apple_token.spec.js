const AppleToken = artifacts.require("AppleToken");
const toBN = web3.utils.toBN;

contract("AppleToken", (accounts) => {
  let instance;
  beforeEach(async () => {
    instance = await AppleToken.deployed();
  })
  
  it("should mint tokens on creation", async () => {
    const totalSupply = await instance.totalSupply();
    const mintedAmount = totalSupply.div(toBN(1e18));
    assert.equal(500, mintedAmount);
  });
});
