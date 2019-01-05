import React from "react";
import Photo from "./Photo";
import Phrases from "./Phrases";
import LearnMore from "./LearnMore";

const Home = () => {
  return (
    <div className="container home-container">
      <Phrases />
      <Photo />
      <LearnMore />
    </div>
  );
};

export default Home;
