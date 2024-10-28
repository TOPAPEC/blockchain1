import { ethers } from "hardhat";

async function main() {
    const PRICE_FEED_ADDRESS = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

    console.log("Deploying ETHWETHOracle...");

    const Oracle = await ethers.getContractFactory("ETHWETHOracle");
    const oracle = await Oracle.deploy(PRICE_FEED_ADDRESS);

    await oracle.waitForDeployment();

    const address = await oracle.getAddress();
    console.log(`ETHWETHOracle deployed to: ${address}`);

    console.log("Waiting for a few blocks...");
    await new Promise(resolve => setTimeout(resolve, 30000));

    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: address,
            constructorArguments: [PRICE_FEED_ADDRESS],
        });
        console.log("Contract verified successfully");
    } catch (e) {
        console.log("Verification failed:", e);
    }

    console.log("\nTesting deployed contract:");

    const [price, timestamp] = await oracle.getLatestPriceView();
    console.log("Current ETH/USD price:", price.toString());
    console.log("Timestamp:", new Date(Number(timestamp) * 1000).toLocaleString());

    const decimals = await oracle.getDecimals();
    console.log("Decimals:", decimals);

    const description = await oracle.getDescription();
    console.log("Description:", description);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });