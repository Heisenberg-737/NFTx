import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./mintOptions.css";

function MintOptions() {
  const location = useLocation();
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState(location.state.wallet);

  function mintFromURL() {
    navigate("/urlnft", {
      state: {
        wallet: walletAddress,
      },
    });
  }

  function mintFromAI() {
    navigate("/ainft", {
      state: {
        wallet: walletAddress,
      },
    });
  }

  return (
    <div>
      <div className="navBar">
        <div className="navBarText">NFTx</div>
        <div className="navBarText">Hello {walletAddress}!</div>
      </div>
      <h1 className="Heading">How do you want to generate NFT Image?</h1>
      <h3 className="HeadingText">Choose an option to mint an NFT.</h3>
      <div className="optionButton">
        <button onClick={mintFromURL}>Mint an NFT from URL</button>
        <button onClick={mintFromAI}>Mint an NFT using Generative AI</button>
      </div>
    </div>
  );
}

export default MintOptions;
