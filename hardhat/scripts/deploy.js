const { appendFileSync } = require("fs");
const hre = require("hardhat");

async function main() {
    const Market = await hre.ethers.getContractFactory("Market");
    const market = await Market.deploy();

    await market.deployed();

    console.log("NFTMarket deployed to:", market.address);

    appendFileSync(".env", `NEXT_PUBLIC_ADDRESS=${market.address}\n`)

}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});