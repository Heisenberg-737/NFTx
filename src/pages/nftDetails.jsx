import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NFTStorage, File } from "nft.storage";
import NavBar from "../component/navBar/navbar";

function NFTDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);
  const [url, setURL] = useState(location.state.url);
  const [img, setImg] = useState(location.state.img);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chain, setChain] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleChangeChain(event) {
    setChain(event.target.value);
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

    // const metadata = await client.store({
    //   name: "ExampleNFT",
    //   description: "My ExampleNFT is an awesome artwork!",
    //   image: await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], "example.png", { type: "image/png" })),
    // });
    // console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
  }

  return (
    <div>
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">Mint an NFT from URL</h1>
      <h3 className="HeadingText">
        Enter the URL of the image you want to mint as an NFT.
      </h3>
    </div>
  );
}
