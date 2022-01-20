/* eslint-disable @next/next/no-img-element */
import {
  TransactionState,
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { Contract } from "ethers";
import { formatEther, Interface } from "ethers/lib/utils";
import React, { useEffect } from "react";
import { IsellItem } from "../types";
import { useRecoilState } from "recoil";

import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import { buyNftStateRecoilState } from "../store";

const SellItem = ({ data }: { data: IsellItem }) => {
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;
  const { account, library } = useEthers();

  const buy = async (id: number, price: number) => {
    buyNft(id, { value: price }).then(() => {
      if (!["None"].includes(buyNftState.status)) alert(buyNftState.status);
    });
  };

  const { send: buyNft, state: buyNftState } = useContractFunction(
    new Contract(
      contractAddress,
      new Interface(contractJson.abi),
      library?.getSigner(account ?? "")
    ),
    "buy"
  );

  const [, setBuyNftStateRecoil] = useRecoilState(buyNftStateRecoilState);

  useEffect(() => {
    setBuyNftStateRecoil(buyNftState as unknown as TransactionState);
  });

  return (
    <div className="bg-purple-200 m-2 rounded">
      <img
        className="w-[200px] h-[200px] border-2 mx-auto p-1"
        src={`https://gateway.pinata.cloud/ipfs/${data.uri}`}
        alt=""
      />
      <div className="flex flex-col p-3 justify-around">
        <span>{formatEther(data.price.toString())} ETH</span>
        {account == data.creator ? (
          <span>Your Product</span>
        ) : (
          <button
            onClick={() => buy(data.id, data.price)}
            className="bg-green-600 text-white p-0.5 pl-1 pr-1 rounded hover:bg-green-800 transition-colors"
          >
            Buy{" "}
            {["None", "Success"].includes(buyNftState.status)
              ? ""
              : `- ${buyNftState.status}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default SellItem;
