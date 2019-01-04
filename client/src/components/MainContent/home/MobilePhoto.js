import React from "react";
import smallHeadShot from "../../img/cropped-headshot2.jpg";

const MobilePhoto = () => {
  return (
    <div className="head-shot" id="small-screen-headshot">
      <img src={smallHeadShot} alt="problem loading: headshot" />
    </div>
  );
};

export default MobilePhoto;
