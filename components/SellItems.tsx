import React from "react";
import NftItem from "./NftItem";

interface IsellItem {
  id: number;
  uri: string;
  creator: string;
  price: number;
}

const SellItems = ({ sellItems }: { sellItems: IsellItem[] }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {sellItems.length > 0 ? (
        sellItems.map((item, index) => <NftItem key={index} data={item} />)
      ) : (
        <h1>No items to display</h1>
      )}
    </div>
  );
};

export default SellItems;
