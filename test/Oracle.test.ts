import { expect } from "chai";
import { ethers } from "hardhat";
import { ETHWETHOracle } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("ETHWETHOracle", function () {
    let oracle: ETHWETHOracle;
    let owner: SignerWithAddress;

    const PRICE_FEED_ADDRESS = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        const Oracle = await ethers.getContractFactory("ETHWETHOracle");
        oracle = await Oracle.deploy(PRICE_FEED_ADDRESS) as ETHWETHOracle;
    });

    describe("Constructor", function () {
        it("Should set the price feed address correctly", async function () {
            expect(await oracle.getPriceFeed()).to.equal(PRICE_FEED_ADDRESS);
        });

        it("Should revert with zero address", async function () {
            const Oracle = await ethers.getContractFactory("ETHWETHOracle");
            await expect(Oracle.deploy(ethers.ZeroAddress))
                .to.be.revertedWithCustomError(oracle, "InvalidPriceFeed");
        });
    });

    describe("Price Feed Functions", function () {
        it("Should get latest price and emit event", async function () {
            const tx = await oracle.getLatestPrice();
            const receipt = await tx.wait();

            const event = receipt.logs[0];
            expect(event).to.not.be.undefined;

            const iface = oracle.interface;
            const decodedEvent = iface.parseLog(event);
            expect(decodedEvent?.name).to.equal("PriceUpdated");

            const [price, timestamp] = decodedEvent?.args || [];
            expect(price).to.not.equal(0n);
            expect(timestamp).to.not.equal(0n);
        });

        it("Should get latest price view", async function () {
            const [price, timestamp] = await oracle.getLatestPriceView();
            expect(price).to.not.equal(0n);
            expect(timestamp).to.not.equal(0n);
        });

        it("Should get correct decimals", async function () {
            const decimals = await oracle.getDecimals();
            expect(decimals).to.equal(8);
        });

        it("Should get description", async function () {
            const description = await oracle.getDescription();
            expect(description).to.be.a('string');
            expect(description.length).to.be.greaterThan(0);
        });
    });
});