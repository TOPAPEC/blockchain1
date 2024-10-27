pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PairCreator is Ownable {
    IUniswapV2Router02 public immutable uniswapRouter;
    IUniswapV2Factory public immutable uniswapFactory;
    address public immutable WETH;
    event PairCreated(address token, address pair);
    constructor() Ownable(msg.sender) {
        uniswapRouter = IUniswapV2Router02(0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008);
        uniswapFactory = IUniswapV2Factory(0x7E0987E5b3a30e3f2828572Bb659A548460a3003);
        WETH = uniswapRouter.WETH();
    }
    function createPair(address token) external returns (address pair) {
        pair = uniswapFactory.createPair(token, WETH);
        emit PairCreated(token, pair);
        return pair;
    }
    function addLiquidity(
        address token,
        uint tokenAmount,
        uint minTokenAmount,
        uint minEthAmount
    ) external payable {
        IERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
        IERC20(token).approve(address(uniswapRouter), tokenAmount);

        uniswapRouter.addLiquidityETH{value: msg.value}(
            token,
            tokenAmount,
            minTokenAmount,
            minEthAmount,
            msg.sender,
            block.timestamp + 15 minutes
        );
    }
    function withdrawToken(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(msg.sender, balance);
    }
    function withdrawETH() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}