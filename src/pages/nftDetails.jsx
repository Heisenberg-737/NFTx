import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NFTStorage, File } from "nft.storage";
import NavBar from "../component/navBar/navbar";
import "./nftDetails.css";

const API_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;

function NFTDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);
  const [img, setImg] = useState(location.state.img);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chain, setChain] = useState("");
  const [metadataURL, setMetadataURL] = useState("");
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
      console.log(
        "Metadata stored on Filecoin and IPFS with URL:",
        metadata.url
      );
      setMetadataURL(metadata.url);
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
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Binance Smart Chain">Binance Smart Chain</option>
            <option value="Solana">Solana</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Fantom">Fantom</option>
            <option value="Harmony">Harmony</option>
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
