const FruitSwap = artifacts.require("FruitSwap");
const AppleToken = artifacts.require("AppleToken");
const OrangeToken = artifacts.require("OrangeToken");

const toBN = web3.utils.toBN;

contract("FruitSwap", (accounts) => {
  let [owner, fruitSwapOwner, user] = accounts;
  let fruitSwap;
  let appleToken;
  let orangeToken;

  beforeEach(async () => {
    // Creating new instances to make tests idempotent
    appleToken = await AppleToken.new({ from: owner });
    orangeToken = await OrangeToken.new({ from: owner });
    fruitSwap = await FruitSwap.new(appleToken.address, orangeToken.address, { from: fruitSwapOwner });
    // Initialize FruitSwap with Apples and Oranges
    await appleToken.mint(fruitSwap.address, web3.utils.toWei('100', 'ether'), { from: owner });
    await orangeToken.mint(fruitSwap.address, web3.utils.toWei('100', 'ether'), { from: owner });
    // Initialize User with Apples and Oranges
    await appleToken.mint(user, web3.utils.toWei('100', 'ether'), { from: owner });
    await orangeToken.mint(user, web3.utils.toWei('100', 'ether'), { from: owner });
  })

  afterEach(async () => {
    await fruitSwap.kill({ from: fruitSwapOwner });
    await appleToken.kill({ from: owner });
    await orangeToken.kill({ from: owner });
  });

  context('.swapAppleForOrange()', async () => {
    it("should swap apples to oranges", async () => {
      await appleToken.approve(fruitSwap.address, web3.utils.toWei('500', 'ether'), { from: user });
      await fruitSwap.swapAppleForOrange(web3.utils.toWei('100', 'ether'), { from: user });
      assert.equal(web3.utils.toWei('200', 'ether'), await orangeToken.balanceOf(user));
    });

    it('should emit SwapEvent', async () => {
      await appleToken.approve(fruitSwap.address, web3.utils.toWei('500', 'ether'), { from: user });
      const result = await fruitSwap.swapAppleForOrange(web3.utils.toWei('100', 'ether'), { from: user });
      const event = result.logs[0].event;
      assert.equal(event, 'SwapEvent');
    });
  });

  context('.swapOrangeForApple()', async () => {
    it("should swap oranges to apples", async () => {
      await orangeToken.approve(fruitSwap.address, web3.utils.toWei('500', 'ether'), { from: user });
      await fruitSwap.swapOrangeForApple(web3.utils.toWei('100', 'ether'), { from: user });
      assert.equal(web3.utils.toWei('200', 'ether'), await appleToken.balanceOf(user));
    });

    it('should emit SwapEvent', async () => {
      await orangeToken.approve(fruitSwap.address, web3.utils.toWei('500', 'ether'), { from: user });
      const result = await fruitSwap.swapOrangeForApple(web3.utils.toWei('100', 'ether'), { from: user });
      const event = result.logs[0].event;
      assert.equal(event, 'SwapEvent');
    });
  });
});

