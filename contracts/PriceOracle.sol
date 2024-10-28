// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ETHWETHOracle {
    AggregatorV3Interface internal priceFeed;

    event PriceUpdated(int256 price, uint256 timestamp);

    error InvalidPriceFeed();

    constructor(address _priceFeed) {
        if (_priceFeed == address(0)) revert InvalidPriceFeed();
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getPriceFeed() external view returns (address) {
        return address(priceFeed);
    }

    function getLatestPrice() external returns (int256, uint256) {
        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 timestamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        emit PriceUpdated(price, timestamp);
        return (price, timestamp);
    }

    function getLatestPriceView() external view returns (int256, uint256) {
        (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 timestamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        return (price, timestamp);
    }

    function getDecimals() external view returns (uint8) {
        return priceFeed.decimals();
    }

    function getDescription() external view returns (string memory) {
        return priceFeed.description();
    }
}