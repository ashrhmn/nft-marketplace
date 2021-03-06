import { useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import Head from "next/head";

import { Interface } from "ethers/lib/utils";
import { useRecoilState } from "recoil";

import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import { useEffect, useState } from "react";
import { Contract } from "@usedapp/core/node_modules/ethers";
import SellItems from "../components/SellItems";
import { IsellItem } from "../types";
import { buyNftStateRecoilState } from "../store";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;
  const { account, library } = useEthers();
  const [sellItems, setSellItems] = useState<IsellItem[]>([]);

  const [buyNftStateRecoil] = useRecoilState(buyNftStateRecoilState);

  const contract = new Contract(
    contractAddress,
    new Interface(contractJson.abi),
    ethers.getDefaultProvider(
      `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
    )
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
    console.log(library);
    // if (!library) return;
    (async () => setSellItems((await getSellItems()) as IsellItem[]))();
    // (async () => console.log(await library?.getNetwork()))();
  }, [account, library, buyNftStateRecoil]);

  return (
    <div>
      <Head>
        <title>CloseSea</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SellItems sellItems={sellItems} />
      </main>
    </div>
  );
};

export default Home;
