require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.11",
    defaultNetwork: "localhost",
    networks: {
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/6ab03f4af41d461092f50ca197a4d988",
            accounts: ["ec2ad011c478b610fc2721645449888d4cf84374e1ec8a33af0b62ebac8154de"]
        }
    },
    paths: {
        sources: "./hardhat/contracts",
        tests: "./hardhat/test",
        cache: "./hardhat/cache",
        artifacts: "./artifacts",
    },
};