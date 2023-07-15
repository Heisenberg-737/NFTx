import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/navBar/navbar";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);

  return (
    <div>
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">Your NFT Has Been Minted Successfully!</h1>
      <h3 className="HeadingText"> Details of your NFT are as follows:</h3>
    </div>
  );
}

export default Success;
