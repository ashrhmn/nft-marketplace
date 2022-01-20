/* eslint-disable @next/next/no-img-element */
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { IsellItem } from "../types";

const MyNftItem = ({ data }: { data: IsellItem }) => {
  return (
    <div className="bg-purple-200 m-2">
      <img
        className="w-[200px] h-[200px] border-2"
        src={`https://gateway.pinata.cloud/ipfs/${data.uri}`}
        alt=""
      />
      <div className="flex justify-around">
        <span>{formatEther(data.price.toString())} ETH</span>
      </div>
    </div>
  );
};

export default MyNftItem;
