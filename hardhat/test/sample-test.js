const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Testing", function() {
    it("Should do some tests", async function() {

        const [owner, add1, add2] = await ethers.getSigners();

        console.log(owner.address);
        console.log(add1.address);
        console.log(add2.address);

        console.log("\n\n");

        const Market = await ethers.getContractFactory("Market");
        const market = await Market.deploy();
        await market.deployed();

        console.log("Market deployed to ", market.address)


        let createItemTx = await market.connect(add1).createItem("item1", 1000, { value: 100 });
        await createItemTx.wait()

        createItemTx = await market.connect(add1).createItem("item2", 2000, { value: 100 });
        await createItemTx.wait()

        createItemTx = await market.connect(add1).createItem("item3", 3000, { value: 100 });
        await createItemTx.wait()

        createItemTx = await market.connect(add1).createItem("item4", 4000, { value: 100 });
        await createItemTx.wait()

        let ownerOfTx = await market.ownerOf(0)
        console.log("Owner before : ", ownerOfTx);

        let buyItemTx = await market.connect(add2).buy(1, { value: 2000 });
        await buyItemTx.wait()

        buyItemTx = await market.connect(add2).buy(2, { value: 3000 });
        await buyItemTx.wait()

        ownerOfTx = await market.ownerOf(0)
        console.log("Owner after : ", ownerOfTx);

        let itemsForSellTx = await market.fetchItemsOnSell()
        console.log(`Items for sell : ${itemsForSellTx.length} \n`);
        console.log(itemsForSellTx);

        let itemsBoughtTx = await market.connect(add2).fetchItemsBought()
        console.log(`Items bought : ${itemsBoughtTx.length}\n`);
        console.log(itemsBoughtTx);

        // expect(await greeter.greet()).to.equal("Hello, world!");

        // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        // // wait until the transaction is mined
        // await setGreetingTx.wait();

        // expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
});