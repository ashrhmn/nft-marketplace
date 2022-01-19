import { useContractCall, useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import Head from "next/head";

import { Interface } from "ethers/lib/utils";

import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import { useEffect, useState } from "react";
import { Contract } from "@usedapp/core/node_modules/ethers";

interface IsellItem {
  id: number;
  uri: string;
  creator: string;
  price: number;
}

const Home: NextPage = () => {
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;
  const { account, library } = useEthers();
  const [sellItems, setSellItems] = useState<IsellItem[]>([]);

  const contract = new Contract(
    contractAddress,
    new Interface(contractJson.abi),
    library?.getSigner(account ?? "")
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

  useEffect(() => {
    if (!account) return;
    (async () => setSellItems((await getSellItems()) as IsellItem[]))();
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
        {sellItems.length > 0 ? (
          sellItems.map((item, index) => <div key={index}>{item.uri}</div>)
        ) : (
          <h1>No items to display</h1>
        )}
      </main>
    </div>
  );
};

export default Home;
