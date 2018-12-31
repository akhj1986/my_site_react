import React from "react";
import Logo from "./headerSubs/Logo";
import NavBar from "./headerSubs/NavBar";

function Header() {
  return (
    <div className="section head">
      <Logo />
      <NavBar />
    </div>
  );
}

export default Header;
