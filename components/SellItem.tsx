/* eslint-disable @next/next/no-img-element */
import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "ethers";
import { Interface, parseUnits } from "ethers/lib/utils";
import React from "react";
import { IsellItem } from "../types";

import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";

const SellItem = ({ data }: { data: IsellItem }) => {
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;

  const { account, library } = useEthers();

  const { send: buyNft, state: buyNftState } = useContractFunction(
    new Contract(
      contractAddress,
      new Interface(contractJson.abi),
      library?.getSigner(account ?? "")
    ),
    "buy"
  );

  const buy = async (id: number, price: number) => {
    buyNft(id, { value: price }).then(() => alert(buyNftState.status));
  };
  return (
    <div className="bg-purple-200 m-2">
      <img
        className="w-[200px] h-[200px] border-2"
        src={`https://gateway.pinata.cloud/ipfs/${data.uri}`}
        alt=""
      />
      <div className="flex justify-around">
        <span>{data.price} WEI</span>
        <span>{parseUnits(("0.000000000000000001")).toString()} WEI</span>
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
