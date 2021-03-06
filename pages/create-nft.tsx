import { useContractFunction, useEthers } from "@usedapp/core";
import { useState } from "react";

import { Contract } from "@usedapp/core/node_modules/ethers";
import {
  Interface,
  parseEther,
} from "@usedapp/core/node_modules/ethers/lib/utils";
import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import axios from "axios";

const CreateNft = () => {
  const { library, account } = useEthers();
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;

  const [tokenFile, setTokenFile] = useState<FormData>();
  const [tokenPrice, setTokenPrice] = useState("");

  const { send: createNftItem, state: createNftItemState } =
    useContractFunction(
      new Contract(
        contractAddress,
        new Interface(contractJson.abi),
        library
      ),
      "createItem"
    );

  const handleFile = (event: any) => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      setTokenFile(formdata);
    } else {
      setTokenFile(new FormData());
    }
  };

  const handleUpload = async () => {
    if (!account) {
      alert("You are not logged in, use connect on the top right");
      return;
    }
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    try {
      const response = await axios.post(url, tokenFile, {
        headers: {
          "Content-Type": `multipart/form-data;`,
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API as string,
          pinata_secret_api_key: process.env
            .NEXT_PUBLIC_PINATA_SECRET as string,
        },
      });
      // console.log(response);
      if (response.status == 200) {
        const ipfsHash = response.data.IpfsHash;
        createNftItem(ipfsHash, parseEther(tokenPrice.toString()), {
          value: 100,
        })
          .then(() => {
            if (!["None", "Success"].includes(createNftItemState.status))
              alert(createNftItemState.status);
          })
          .catch((error) => console.log(error));
      } else {
        alert("Uploading file error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-emerald-500 gap-4 p-8 max-w-min mx-auto rounded-lg">
      <input
        className="w-60 border-2 rounded"
        value={tokenPrice}
        onChange={(e) => {
          setTokenPrice(e.target.value);
          console.log(tokenFile);
        }}
        type="number"
        placeholder="Price (ETH)"
      />
      <input
        className="w-60 border-2 rounded"
        onChange={handleFile}
        type="file"
        accept=".jpg,.png,.jpeg"
        placeholder="URI"
      />
      <button
        disabled={tokenPrice == "" || tokenFile == undefined || account == null}
        className="w-60 bg-blue-600 text-white p-1 rounded hover:bg-blue-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800"
        onClick={handleUpload}
      >
        Create Item
        {createNftItemState.status == "None"
          ? ""
          : ` - ${createNftItemState.status}`}
      </button>
    </div>
  );
};

export default CreateNft;
