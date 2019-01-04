import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import IsSubmitting from "./IsSubmitting";

const axios = require("axios");

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerScore: this.props.score,
      toTable: false,
      isSubmitting: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loading = this.loading.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  loading() {
    this.setState({
      isSubmitting: true
    });
  }

  handleSubmit(event) {
    this.loading();
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/scores", {
        name: this.state.playerName,
        score: this.props.score
      })
      .then(res => {
        console.log(res);
      })
      .then(err => {
        if (err) {
          throw err;
        }
      })
      .then(() => {
        this.setState({
          toTable: true
        });
      });
  }

  render() {
    if (this.state.toTable === true) {
      return <Redirect exact to="/game/scores" />;
    }
    return (
      <div className="player-form">
        <h1>
          Please input your details to log your score! {this.state.playerScore}
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="playerName"
            value={this.state.playerName}
            onChange={this.handleChange}
            placeholder="Please enter your name"
          />
          <h2>{this.state.playerName}</h2>
          <button className="submit-button">Submit</button>
        </form>
        <IsSubmitting submitting={this.state.isSubmitting} />
      </div>
    );
  }
}

export default PlayerInput;
