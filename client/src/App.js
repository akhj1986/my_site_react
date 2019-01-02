import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
