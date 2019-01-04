import React from "react";
import FooterLink from "./components/Link";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-item">&copy; Alex Harris 2018</li>
        <FooterLink />
      </ul>
    </div>
  );
};

export default Footer;
