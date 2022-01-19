import { useContractFunction, useEthers } from "@usedapp/core";
import { useState } from "react";

import { Contract } from "@usedapp/core/node_modules/ethers";
import { Interface } from "@usedapp/core/node_modules/ethers/lib/utils";
import contractJson from "../artifacts/hardhat/contracts/Market.sol/Market.json";
import axios from "axios";

const CreateNft = () => {
  const { library, account } = useEthers();
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS as string;

  const [tokenFile, setTokenFile] = useState<FormData>();
  const [tokenPrice, setTokenPrice] = useState("");

  const [status, setStatus] = useState("");

  const { send: createNftItem, state: createNftItemState } =
    useContractFunction(
      new Contract(
        contractAddress,
        new Interface(contractJson.abi),
        library?.getSigner(account ?? "")
      ),
      "createItem"
    );

  const handleFile = (event: any) => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      setTokenFile(formdata);
    }
  };

  const handleUpload = async () => {
    if (!account) return;
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
      console.log(response);
      if (response.status == 200) {
        const ipfsHash = response.data.IpfsHash;
        createNftItem(ipfsHash, tokenPrice, { value: 100 })
          .then(() => {
            console.log("Uploaded");
            alert("Successfully created");
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
    <div>
      <input
        value={tokenPrice}
        onChange={(e) => setTokenPrice(e.target.value)}
        type="text"
        placeholder="Price"
      />
      <input onChange={handleFile} type="file" placeholder="URI" />
      <button onClick={handleUpload}>Create Item</button>
      <p>Status {createNftItemState.status}</p>
    </div>
  );
};

export default CreateNft;
