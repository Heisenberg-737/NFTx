import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NFTStorage, File } from "nft.storage";
import NavBar from "../component/navBar/navbar";
import "./nftDetails.css";

const API_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
const VERBWIRE_API_KEY = process.env.REACT_APP_VERBWIRE_API_KEY;

function NFTDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);
  const [img, setImg] = useState(location.state.img);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chain, setChain] = useState("");
  const [metadataURL, setMetadataURL] = useState("");
  const [nftData, setNFTData] = useState(null);
  const client = new NFTStorage({ token: API_KEY });

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleChangeChain(event) {
    setChain(event.target.value);
  }

  async function generateMetadata() {
    console.log("Generating metadata...");
    if (img !== null) {
      const metadata = await client.store({
        name: name,
        description: description,
        image: await fetch(img)
          .then((r) => r.blob())
          .then(
            (blobFile) => new File([blobFile], name, { type: "image/png" })
          ),
      });
      setMetadataURL(metadata.url);
    }
  }

  async function mintNFT() {
    console.log("Minting NFT...");
    console.log(metadataURL);

    // Data for Verbwire API
    const form = new FormData();
    form.append("allowPlatformToOperateToken", "true");
    form.append("recipientAddress", walletAddress);
    form.append("chain", chain);
    form.append("metadataUrl", metadataURL);

    // Config for Verbwire API
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "X-API-Key": VERBWIRE_API_KEY,
      },
      body: form,
    };

    try {
      const response = await fetch(
        "https://api.verbwire.com/v1/nft/mint/quickMintFromMetadataUrl",
        options
      )
        .then((response) => response.json())
        .then((response) => setNFTData(response));
    } catch (e) {
      console.log(e);
    }
  }

  async function submitNFT() {
    if (name === "" || name === null) {
      window.alert("Please provide a name for the NFT.");
      return;
    }

    if (description === "" || description === null) {
      window.alert("Please provide a description for the NFT.");
      return;
    }

    if (chain === "" || chain === null) {
      window.alert("Please provide a chain for the NFT.");
      return;
    }

    await generateMetadata();
    console.log(metadataURL);
    await mintNFT();
    console.log(nftData);



  }

  return (
    <div>
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">Few More Questions</h1>
      <h3 className="HeadingText">
        Enter the details about your NFT's Name, Description and Chain.
      </h3>
      <div className="detailInput">
        <div className="nameInput">
          <h5>Enter NFT Name</h5>
          <input
            onChange={handleChangeName}
            type="text"
            placeholder="Enter NFT Name here"
            value={name}
          />
        </div>
        <div className="descriptionInput">
          <h5>Enter NFT Description</h5>
          <input
            onChange={handleChangeDescription}
            type="text"
            placeholder="Enter NFT Description here"
            value={description}
          />
        </div>
        {/* <input onChange={handleChangeChain} type="text" placeholder="Enter NFT Chain here" value={chain} /> */}
        <div className="chainInput">
          <h5>You want to mint your NFT on</h5>
          <select onChange={handleChangeChain} value={chain}>
            <option value="goerli">Goerli Ethereum</option>
            <option value="mumbai">Polygon Mumbai</option>
            <option value="solana-testnet">Solana Testnet</option>
            <option value="bsc-testnet">Bsc Testnet</option>
            <option value="fuji">Fuji</option>
            <option value="arbitrum-goerli">Abritrum Goerli</option>
            <option value="optimism-goerli">Optimism Goerli</option>
            <option value="fantom-testnet">Fantom Testnet</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
            <option value="bsc">Binance Smart Chain (Bsc)</option>
            <option value="avalanche">Avalanche</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
            <option value="fantom">Fantom</option>
          </select>
        </div>
        <button className="submitNFT" onClick={submitNFT}>
          Submit NFT
        </button>
      </div>
    </div>
  );
}

export default NFTDetails;
