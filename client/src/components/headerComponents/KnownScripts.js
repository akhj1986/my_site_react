import React, { Component } from "react";
import data from "./data.json";

class KnownScripts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      codeLang: data.codeLang,
      displayClass: data.codeLang[0]
    };
    this.changeLang = this.changeLang.bind(this);
  }

  changeLang() {
    const l = this.state.codeLang;
    const selectL = l[this.state.i];
    this.state.i < l.length - 1
      ? this.setState(prevState => {
          return {
            i: prevState.i + 1
          };
        })
      : this.setState({ i: 0 });

    this.setState({
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
