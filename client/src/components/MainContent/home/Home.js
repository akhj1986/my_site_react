import React, { Component } from "react";
import MediaQuery from "react-responsive";

import Photo from "./Photo";
import Phrases from "./Phrases";
import LearnMore from "./LearnMore";
import PhotoNav from "./PhotoNav";

class Home extends Component {
  componentDidMount() {
    document.getElementById("contact-link").className = "nav-item";
    document.getElementById("home-link").className = "nav-item current";
    document.getElementById("portfolio-link").className = "nav-item";
    document.getElementById("skills-link").className = "nav-item";
  }
  render() {
    return (
      <div className="container home-container">
        <Phrases />
        <MediaQuery maxWidth={899}>
          {matches => {
            if (matches) {
              return <Photo />;
            } else {
              return <PhotoNav />;
            }
          }}
        </MediaQuery>

        <LearnMore />
      </div>
    );
  }
}

export default Home;
