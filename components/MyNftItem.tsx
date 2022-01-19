/* eslint-disable @next/next/no-img-element */
import { useEthers } from "@usedapp/core";
import React from "react";
import { IsellItem } from "../types";

const MyNftItem = ({ data }: { data: IsellItem }) => {
  const { account } = useEthers();
  return (
    <div className="bg-purple-200 m-2">
      <img
        className="w-[200px] h-[200px] border-2"
        src={`https://gateway.pinata.cloud/ipfs/${data.uri}`}
        alt=""
      />
      <div className="flex justify-around">
        <span>{data.price} WEI</span>
      </div>
    </div>
  );
};

export default MyNftItem;
