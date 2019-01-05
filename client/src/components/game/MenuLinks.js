import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuLinks extends Component {
  handleExit() {
    window.close();
  }

  render() {
    return (
      <div className="game-menu-links">
        <Link to="/game/play">
          <button>Play</button>
        </Link>
        <Link to="/game/scores">
          <button>High Score Table</button>
        </Link>
        <button onClick={this.handleExit}>Exit Game (Closes Tab)</button>
      </div>
    );
  }
}

export default MenuLinks;
