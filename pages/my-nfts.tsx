import { useEthers } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";
import { Contract } from "ethers";
import React, { useEffect, useState } from "react";

import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import { IsellItem } from "../types";
import MyNftItem from "../components/MyNftItem";

const MyNfts = () => {
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;
  const { account, library } = useEthers();
  const [myNfts, setMyNfts] = useState<IsellItem[]>([]);

  const contract = new Contract(
    contractAddress,
    new Interface(contractJson.abi),
    library?.getSigner(account ?? "")
  );

  const getMyNfts = async () => {
    try {
      const res = await contract.functions["fetchItemsBought"]();
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
    (async () => setMyNfts((await getMyNfts()) as IsellItem[]))();
  }, [account, library]);
  return (
    <div className="flex flex-wrap justify-center">
      {myNfts.length > 0 ? (
        myNfts.map((item, index) => <MyNftItem key={index} data={item} />)
      ) : (
        <h1>No items to display</h1>
      )}
    </div>
  );
};

export default MyNfts;
