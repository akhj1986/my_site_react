import React from "react";
import { Link } from "react-router-dom";

const Paragraph = () => {
  return (
    <div>
      <h1>Portfolio</h1>
      <p className="paragraph">
        As a new developer who has only put serious time and effort into
        programming since October 2018, a portfolio is very much still in the
        work.
      </p>
      <p className="paragraph">
        But please play this little game I built! ----{" "}
        <Link to="/game" target="_blank" className="game-link">
          The Great Space Shoot-Up!
        </Link>
      </p>
      <p className="paragraph">
        Also feel free to check out my GitHub repositories, though keep in mind
        it is full of practice material! You will find the repository for the
        site as well :-) <br />
        ----{" "}
        <a
          href="https://github.com/akhj1986?tab=repositories"
          rel="noopener noreferrer"
          target="_blank"
        >
          My repositories!
        </a>
      </p>
    </div>
  );
};

export default Paragraph;
