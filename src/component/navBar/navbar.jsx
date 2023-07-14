import React from "react";
import "./navbar.css";

function NavBar(props) {
  return (
    <div className="navBar">
      <div className="navBarText">NFTx</div>
      <div className="navBarText">Hello {props.wallet}!</div>
    </div>
  );
}

export default NavBar;
