import React from "react";
import Logo from "./headerComponents/Logo";
import NavBar from "./headerComponents/NavBar";

const Header = () => {
  return (
    <div className="section head">
      <Logo />
      <NavBar />
    </div>
  );
};

export default Header;
