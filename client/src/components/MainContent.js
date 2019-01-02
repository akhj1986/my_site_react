import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./mainComponents/Home";
import Portfolio from "./mainComponents/Portfolio";
import Skills from "./mainComponents/Skills";
import Contact from "./mainComponents/Contact";

const MainContent = () => {
  return (
    <div className="section body-content">
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/Portfolio" component={Portfolio} />
        <Route path="/Skills" component={Skills} />
        <Route path="/Contact" component={Contact} />
      </div>
    </div>
  );
};

export default MainContent;
