const AppleToken = artifacts.require("AppleToken");
const toBN = web3.utils.toBN;

contract("AppleToken", (accounts) => {
  let appToken;
  let [owner, recipient] = accounts;

  beforeEach(async () => {
    appToken = await AppleToken.new();
  });

  afterEach(async () => {
    await appToken.kill();
  });

  it("should mint tokens on creation", async () => {
    const totalSupplyInWei = await appToken.totalSupply();
    const mintedAmount = totalSupplyInWei.div(toBN(1e18));
    assert.equal(500, mintedAmount);
  });

  it("should give minted tokens to owner", async () => {
    const balanceInWei = await appToken.balanceOf(owner);
    assert.equal(web3.utils.toWei('500', 'ether'), balanceInWei);
  });

  // Test of direct transfer
  it("should transfer tokens from owner to recipient", async () => {
    await appToken.transfer(recipient, web3.utils.toWei('100', 'ether'));
    const expectedSenderAmount = web3.utils.toWei('400', 'ether');
    const expectedRecipientAmount = web3.utils.toWei('100', 'ether');
    assert.equal(expectedSenderAmount, await appToken.balanceOf(owner));
    assert.equal(expectedRecipientAmount, await appToken.balanceOf(recipient));
  });

  // Test of 2-step transfer
  it("should transfer tokens to recipient using transerFrom", async () => {
    const amount = web3.utils.toWei('100', 'ether');
    await appToken.approve(owner, amount, {from: owner})
    await appToken.transferFrom(owner, recipient, amount);
    const expectedSenderAmount = web3.utils.toWei('400', 'ether');
    const expectedRecipientAmount = amount;
    assert.equal(expectedSenderAmount, await appToken.balanceOf(owner));
    assert.equal(expectedRecipientAmount, await appToken.balanceOf(recipient));
  });
});
