import { run } from "hardhat";

async function main() {
    const FACTORY_ADDRESS = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";
    const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
    const YOUR_TOKEN_ADDRESS = "0x6f651b94322952716632De9b63c252a7dE4D9658";
    const ORACLE_ADDRESS = "YOUR_DEPLOYED_ORACLE_ADDRESS";

    console.log("Verifying");
    try {
        await run("verify:verify", {
            address: ORACLE_ADDRESS,
            constructorArguments: [
                FACTORY_ADDRESS,
                WETH_ADDRESS,
                YOUR_TOKEN_ADDRESS
            ]
        });
        console.log("Oracle verified successfully");
    } catch (error) {
        console.error("Error verifying contract:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
