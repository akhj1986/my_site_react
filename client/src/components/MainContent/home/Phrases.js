import React, { Component } from "react";
import data from "./textArray.json";

class Phrases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArray: data.texts,
      displayText: "Web development using the latest technologies...",
      index: 0,
      displayClass: "small-text"
    };
    this.textRotation = this.textRotation.bind(this);
  }

  componentDidMount() {
    setInterval(this.textRotation, 4000);
  }

  textRotation() {
    let i = this.state.index;
    const t = this.state.textArray;
    if (i < t.length - 1) {
      i++;
    } else {
      i = 0;
    }
    const display = t[i];
    this.setState({
      index: i,
      displayClass: display.className,
      displayText: display.text
    });
  }

  render() {
    return (
      <div className="phrases">
        <h1 className={this.state.displayClass}>{`${
          this.state.displayText
        }`}</h1>
      </div>
    );
  }
}

export default Phrases;
