import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SpaceInvaders from "./SpaceInvaders";
import HighScoreTable from "./HighScoreTable";
import PlayerInput from "./PlayerInput";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerScore: 0
    };
    this.updatePlayerScore = this.updatePlayerScore.bind(this);
  }

  updatePlayerScore(score) {
    this.setState({
      playerScore: score
    });
  }

  render() {
    const myGame = () => {
      return (
        <SpaceInvaders updateScore={this.updatePlayerScore} gameState={false} />
      );
    };
    const inputScreen = () => {
      return <PlayerInput score={this.state.playerScore} />;
    };
    return (
      <div id="game-page">
        <Route exact path="/game" render={myGame} />
        <Route path="/game/scores" component={HighScoreTable} />
        <Route path="/game/input" render={inputScreen} />
      </div>
    );
  }
}

export default Game;
