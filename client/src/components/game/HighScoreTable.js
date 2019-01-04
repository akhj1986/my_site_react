import React, { Component } from "react";
import TableEntry from "./TableEntry";
import { Link } from "react-router-dom";

const axios = require("axios");

class HighScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/scores").then(res => {
      this.setState({
        scores: res.data
      });
    });
  }

  handleClick() {
    window.close();
  }

  render() {
    const highScores = this.state.scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((info, i) => {
        let classID = "";
        i % 2 === 0
          ? (classID = "even table-entry")
          : (classID = "odd table-entry");
        console.log(classID);
        return (
          <TableEntry
            key={info._id}
            elementClass={classID}
            name={info.name}
            score={info.score}
          />
        );
      });
    return (
      <div className="score-table">
        <h1>High Scores</h1>
        <ul>{highScores}</ul>
        <br />
        <button onClick={this.handleClick}>Close window</button>
      </div>
    );
  }
}

export default HighScoreTable;
