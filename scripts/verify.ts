import { run } from "hardhat";

async function main() {
    const contractAddress = "0xf73E7f53D6534747E052086051D48e8A26B76e93";

    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: [],
        });
        console.log("Contract verified successfully");
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