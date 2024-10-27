import { ethers } from "hardhat";

async function main() {
    const wethWrapperAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    const wethWrapper = await ethers.getContractAt("WETHWrapper", wethWrapperAddress);

    // Wrap 0.1 ETH
    const tx = await wethWrapper.wrapETH({
        value: ethers.parseEther("0.1")
    });
    await tx.wait();
    console.log("Successfully wrapped ETH to WETH");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });