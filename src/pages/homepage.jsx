import React from "react";
import Wallet from "../component/walletConnect/wallet"; 

function Homepage() {
  return (
    <div>
      <h1>Welcome to NFTx.</h1>
      <h3>Connect your wallet to get started.</h3>
      <Wallet />
    </div>
  );
}

export default Homepage;
