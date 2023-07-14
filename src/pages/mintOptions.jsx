import React from "react";
import { useLocation } from "react-router-dom";
// import { walletAddress } from "../component/walletConnect/wallet";

function MintOptions(props) {
  const location = useLocation();

  return (
    <div>
      <h1>{location.state.wallet}</h1>
    </div>
  );
}

export default MintOptions;
