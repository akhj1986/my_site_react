import React, { Component } from "react";
import Paragraph from "./components/Paragraph";

class Portfolio extends Component {
  componentDidMount() {
    document.getElementById("contact-link").className = "nav-item";
    document.getElementById("home-link").className = "nav-item";
    document.getElementById("portfolio-link").className = "nav-item current";
    document.getElementById("skills-link").className = "nav-item";
  }
  render() {
    return (
      <div id="portfolio">
        <div className="container">
          <div className="portfolio-content">
            <Paragraph />
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
