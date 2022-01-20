import { useContractFunction, useEthers } from "@usedapp/core";
import React from "react";
import { IsellItem } from "../types";



const SellItem = ({ data }: { data: IsellItem }) => {
  const { account } = useEthers();
  return (
    <div className="bg-purple-200 m-2">
      <img
        className="w-[200px] h-[200px] border-2"
        src={`https://gateway.pinata.cloud/ipfs/${data.uri}`}
      />
      <div className="flex justify-around">
        <span>{data.price} WEI</span>
        {account == data.creator ? (
          <span>Your Product</span>
        ) : (
          <button className="bg-green-600 text-white p-0.5 pl-1 pr-1 rounded hover:bg-green-800 transition-colors">
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default SellItem;
