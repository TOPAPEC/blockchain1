import { ethers, run } from "hardhat";

async function main() {
    const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

    const WETHWrapper = await ethers.getContractFactory("WETHWrapper");
    const wethWrapper = await WETHWrapper.deploy(WETH_ADDRESS);
    await wethWrapper.waitForDeployment();

    const wethWrapperAddress = await wethWrapper.getAddress();
    console.log("WETHWrapper deployed to:", wethWrapperAddress);

    console.log("Waiting for a few blocks...");
    await new Promise(resolve => setTimeout(resolve, 30000)); // 30 секунд

    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: wethWrapperAddress,
            constructorArguments: [WETH_ADDRESS],
        });
        console.log("Contract verified successfully");
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Contract is already verified!");
        } else {
            console.log("Verification failed:", e);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });