import { ethers } from "hardhat";

async function main() {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.waitForDeployment();
    console.log("Token deployed to:", await token.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });