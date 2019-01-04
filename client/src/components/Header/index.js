import React from "react";
import Logo from "./components/Logo";
import NavBar from "./components/NavBar";

const Header = () => {
  return (
    <div className="section head">
      <Logo />
      <NavBar />
    </div>
  );
};

export default Header;
