import { ethers } from "hardhat";

async function main() {
    const WETHWrapper = await ethers.getContractFactory("WETHWrapper");
    const wethWrapper = await WETHWrapper.deploy("0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9");
    await wethWrapper.waitForDeployment();

    const wethWrapperAddress = await wethWrapper.getAddress();
    console.log("WETHWrapper deployed to:", wethWrapperAddress);

    const wethContract = await ethers.getContractAt(
        "IWETH",
        "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"
    );

    console.log("Wrapping 0.001 ETH...");
    const wrapTx = await wethWrapper.wrapETH({
        value: ethers.parseEther("0.001")
    });
    await wrapTx.wait();
    console.log("Wrapped ETH successfully");

    const [signer] = await ethers.getSigners();
    const wethBalance = await wethContract.balanceOf(signer.address);
    console.log("WETH Balance:", ethers.formatEther(wethBalance));

    console.log("Approving WETH");
    const approveTx = await wethContract.approve(
        wethWrapperAddress,
        ethers.parseEther("0.001")
    );
    await approveTx.wait();
    console.log("Approved WETH successfully");

    console.log("Unwrapping 0.0005 WETH");
    const unwrapTx = await wethWrapper.unwrapWETH(ethers.parseEther("0.0005"));
    await unwrapTx.wait();
    console.log("Unwrapped WETH successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });