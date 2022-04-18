// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AppleToken.sol";
import "./OrangeToken.sol";

contract FruitSwap is Ownable {
    AppleToken public appleToken;
    OrangeToken public orangeToken;

    event SwapEvent(uint amountGiven, string tokenGiven, uint AmountReceived, string tokenReceived);

    constructor(address _appleContract, address _orangeContract) {
        appleToken = AppleToken(_appleContract);
        orangeToken = OrangeToken(_orangeContract);
    }

    function setAppleTokenContract(address _address) external onlyOwner {
        appleToken = AppleToken(_address);
    }

    function setOrangeTokenContract(address _address) external onlyOwner {
        orangeToken = OrangeToken(_address);
    }

    function getApplePerOrangeRate() public pure returns (uint256) {
        return 1;
    }

    // check, effects, interaction pattern - to protect against reentry attacks
    function swapAppleForOrange(uint256 _amount) external {
        require(_amount <= appleToken.balanceOf(msg.sender),"Not enough apples to swap");
        uint256 rate = getApplePerOrangeRate();
        // Solidity ^0.8.0 fixes overflow and underflow issues, SafeMath not required.
        uint256 orangeAmount = _amount / rate;
        require(orangeAmount <= orangeToken.balanceOf(address(this)),"Fruit Swap does not have enough oranges");
        // interaction
        appleToken.transferFrom(msg.sender, address(this), _amount);
        orangeToken.transfer(msg.sender, orangeAmount);
        emit SwapEvent(_amount, 'APPLE', orangeAmount, 'ORANGE');
    }

    function swapOrangeForApple(uint256 _amount) external {
        require(_amount <= orangeToken.balanceOf(msg.sender), "Not enough oranges to swap");
        uint256 rate = getApplePerOrangeRate();
        uint256 appleAmount = _amount * rate;
        require(appleAmount <= appleToken.balanceOf(address(this)), "Fruit Swap does not have enough apples");
        orangeToken.transferFrom(msg.sender, address(this), _amount);
        appleToken.transfer(msg.sender, appleAmount);
        emit SwapEvent(_amount, 'ORANGE', appleAmount, 'APPLE');
    }

    function kill() public onlyOwner {
        selfdestruct(payable(msg.sender));
    }
}
