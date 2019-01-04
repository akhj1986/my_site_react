import React from "react";
import logo from "../../img/logo2.png";
import KnownScripts from "./KnownScripts";

const Logo = () => {
  return (
    <div className="title">
      <div className="logo-title">
        <img src={logo} className="logo" alt="AH" />
        <div className="heading">
          <h2>Web Developer</h2>
          <KnownScripts />
        </div>
      </div>
    </div>
  );
};

export default Logo;
