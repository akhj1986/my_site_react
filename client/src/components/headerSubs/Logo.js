import React, { Component } from "react";
import logo from "../../img/logo2.png";
import KnownScripts from "./KnownScripts";

class Logo extends Component {
  render() {
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
  }
}

export default Logo;
