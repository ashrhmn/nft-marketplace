import { useContractCall, useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import Head from "next/head";

import { Interface } from "ethers/lib/utils";

import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import { useEffect, useState } from "react";
import { Contract } from "@usedapp/core/node_modules/ethers";
import SellItems from "../components/SellItems";
import { IsellItem } from "../types";

const Home: NextPage = () => {
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;
  const { account, library } = useEthers();
  const [sellItems, setSellItems] = useState<IsellItem[]>([]);

  const contract = new Contract(
    contractAddress,
    new Interface(contractJson.abi),
    library?.getSigner(account ?? "0xB576a7d48f237960B3D85a9fE1EC6F113F3bd0c1")
  );

  const getSellItems = async () => {
    try {
      const res = await contract.functions["fetchItemsOnSell"]();
      return await Promise.all(
        res[0].map(async (item: any) => {
          return {
            id: item[0].toString(),
            uri: await getTokenUri(parseInt(item[0].toString())),
            creator: item[2].toString(),
            price: item[1].toString(),
            tokenOwner: await getTokenOwner(parseInt(item[0].toString())),
          };
        })
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getTokenUri = async (id: number) => {
    try {
      const res = await contract.functions["getTokenUri"](id);
      return res[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getTokenOwner = async (id: number) => {
    try {
      const res = await contract.functions["ownerOf"](id);
      return res[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (!account) return;
    (async () => setSellItems((await getSellItems()) as IsellItem[]))();
    (async () => console.log(await library?.getNetwork()))();
  }, [account, library]);

  return (
    <div>
      <Head>
        <title>CloseSea</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello</h1>
        <SellItems sellItems={sellItems} />
      </main>
    </div>
  );
};

export default Home;
