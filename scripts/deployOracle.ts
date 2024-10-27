import { ethers } from "hardhat";

async function main() {
    const WETH = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
    const YOUR_TOKEN = "0x6f651b94322952716632De9b63c252a7dE4D9658";
    const FACTORY = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";

    const factory = await ethers.getContractAt("IUniswapV2Factory", FACTORY);

    const pairAddress = await factory.getPair(YOUR_TOKEN, WETH);

    if (pairAddress === "0x0000000000000000000000000000000000000000") {
        console.log("Pair doesn't exist. Creating pair...");
        await factory.createPair(YOUR_TOKEN, WETH);
        console.log("Pair created. Please add liquidity before deploying oracle.");
        return;
    }

    console.log("Pair address:", pairAddress);

    const PriceOracle = await ethers.getContractFactory("PriceOracle");
    const oracle = await PriceOracle.deploy(pairAddress);
    await oracle.waitForDeployment();

    const oracleAddress = await oracle.getAddress();
    console.log("Oracle deployed to:", oracleAddress);

    try {
        const [reserve0, reserve1] = await oracle.getReserves();
        console.log("Reserves:", {
            token0: ethers.formatEther(reserve0),
            token1: ethers.formatEther(reserve1)
        });

        const price0 = await oracle.getPrice0();
        const price1 = await oracle.getPrice1();
        console.log("Price0:", ethers.formatEther(price0));
        console.log("Price1:", ethers.formatEther(price1));
    } catch (error) {
        console.log("Error getting prices. Make sure there is liquidity in the pair.");
        console.error(error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });