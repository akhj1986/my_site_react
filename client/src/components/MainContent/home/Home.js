import React from "react";
import RowContent from "./RowContent";
import ParagraphContent from "./ParagraphContent";
import MobilePhoto from "./MobilePhoto";

const Home = () => {
  return (
    <div className="container">
      <RowContent />
      <ParagraphContent />
      <MobilePhoto />
    </div>
  );
};

export default Home;
