const OrangeToken = artifacts.require("OrangeToken");
const toBN = web3.utils.toBN;

contract("OrangeToken", (accounts) => {
  let instance;
  beforeEach(async () => {
    instance = await OrangeToken.deployed();
  })
  
  it("should mint tokens on creation", async () => {
    const totalSupply = await instance.totalSupply();
    const mintedAmount = totalSupply.div(toBN(1e18));
    assert.equal(500, mintedAmount);
  });

  it("should give minted tokens to owner", async() => {
    const balanceInWei = await instance.balanceOf(accounts[0]);
    assert.equal(web3.utils.toWei('500', 'ether'), balanceInWei);
  });
});
