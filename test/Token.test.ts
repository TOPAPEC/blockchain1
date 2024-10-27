import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Token } from "../typechain-types";

describe("Token", function () {
    let token: Token;
    let owner: HardhatEthersSigner;
    let addr1: HardhatEthersSigner;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.waitForDeployment();
    });

    it("Should have correct initial supply", async function () {
        const totalSupply = await token.totalSupply();
        expect(totalSupply).to.equal(ethers.parseEther("1000000"));
    });

    it("Should allow owner to mint tokens", async function () {
        const mintAmount = ethers.parseEther("100");
        await token.mint(addr1.address, mintAmount);
        const balance = await token.balanceOf(addr1.address);
        expect(balance).to.equal(mintAmount);
    });
});