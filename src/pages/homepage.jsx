import React from "react";
import Wallet from "../component/walletConnect/wallet"; 
import "./homepage.css";

function Homepage() {
  return (
    <div>
      <h1 className="Heading">Welcome to NFTx.</h1>
      <h3 className="HeadingText">Connect your wallet to get started.</h3>
      <Wallet />
    </div>
  );
}

export default Homepage;
