import React from "react";
import { IsellItem } from "../types";
import SellItem from "./SellItem";


const SellItems = ({ sellItems }: { sellItems: IsellItem[] }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {sellItems.length > 0 ? (
        sellItems.map((item, index) => <SellItem key={index} data={item} />)
      ) : (
        <h1>No items to display</h1>
      )}
    </div>
  );
};

export default SellItems;
