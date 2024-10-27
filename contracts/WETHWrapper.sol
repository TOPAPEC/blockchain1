pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWETH is IERC20 {
    function deposit() external payable;
    function withdraw(uint256) external;
}

contract WETHWrapper {
    IWETH public immutable WETH;
    event ETHWrapped(address indexed user, uint256 amount);
    event ETHUnwrapped(address indexed user, uint256 amount);
    event ETHReceived(address indexed sender, uint256 amount);
    constructor(address _weth) {
        require(_weth != address(0), "Invalid WETH address");
        WETH = IWETH(_weth);
    }
    function wrapETH() external payable {
        require(msg.value > 0, "Must send ETH to wrap");
        WETH.deposit{value: msg.value}();
        require(WETH.transfer(msg.sender, msg.value), "WETH transfer failed");
        emit ETHWrapped(msg.sender, msg.value);
    }
    function unwrapWETH(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(WETH.transferFrom(msg.sender, address(this), amount), "WETH transfer failed");
        WETH.withdraw(amount);
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "ETH transfer failed");
        emit ETHUnwrapped(msg.sender, amount);
    }
    function getWETHBalance(address account) external view returns (uint256) {
        return WETH.balanceOf(account);
    }
    function getETHBalance() external view returns (uint256) {
        return address(this).balance;
    }
    receive() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }
    fallback() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }
}