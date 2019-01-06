import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SpaceInvaders from "./SpaceInvaders";
import HighScoreTable from "./HighScoreTable";
import PlayerInput from "./PlayerInput";
import GameMenu from "./GameMenu";
import Controls from "./Controls";

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
        <Route exact path="/game" component={GameMenu} />
        <Route path="/game/play" render={myGame} />
        <Route path="/game/scores" component={HighScoreTable} />
        <Route path="/game/input" render={inputScreen} />
        <Route path="/game/controls" render={Controls} />
      </div>
    );
  }
}

export default Game;
