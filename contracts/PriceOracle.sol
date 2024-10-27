pragma solidity ^0.8.20;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

contract PriceOracle {
    address public immutable pair;
    address public immutable token0;
    address public immutable token1;

    constructor(address _pair) {
        pair = _pair;
        IUniswapV2Pair uniswapPair = IUniswapV2Pair(_pair);
        token0 = uniswapPair.token0();
        token1 = uniswapPair.token1();
    }

    function getReserves() public view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) {
        return IUniswapV2Pair(pair).getReserves();
    }

    function getPrice0() public view returns (uint256) {
        (uint112 reserve0, uint112 reserve1,) = getReserves();
        require(reserve0 > 0 && reserve1 > 0, "No liquidity");
        return (uint256(reserve1) * 1e18) / uint256(reserve0);
    }

    function getPrice1() public view returns (uint256) {
        (uint112 reserve0, uint112 reserve1,) = getReserves();
        require(reserve0 > 0 && reserve1 > 0, "No liquidity");
        return (uint256(reserve0) * 1e18) / uint256(reserve1);
    }
}