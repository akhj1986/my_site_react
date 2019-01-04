import React, { Component } from "react";
import data from "./data.json";

class KnownScripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      codeLang: data.codeLang,
      displayClass: data.codeLang[0]
    };
    this.changeLang = this.changeLang.bind(this);
  }

  changeLang() {
    const l = this.state.codeLang;
    let i = this.state.index;
    if (i < l.length - 1) {
      i++;
    } else {
      i = 0;
    }
    const selectL = l[i];
    this.setState({
      index: i,
      displayClass: selectL
    });
  }

  componentDidMount() {
    setInterval(this.changeLang, 2000);
  }

  render() {
    return <i id="code-lang-skills" className={this.state.displayClass} />;
  }
}

export default KnownScripts;
