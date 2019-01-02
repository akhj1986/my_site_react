import React, { Component } from "react";
import NavLink from "./NavLink";
import routes from "./myRoutes.json";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: routes.routes
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    this.setState(prevState => {
      const updatedState = prevState.routes.map(route => {
        if (route.routeName === name) {
          route.active = true;
        }
        if (route.routeName !== name) {
          route.active = false;
        }
        return route;
      });
      return {
        routes: updatedState
      };
    });
  }

  render() {
    const routes = this.state.routes.map(route => (
      <NavLink
        key={route.routeName}
        name={route.routeName}
        path={route.path}
        exact={route.exact}
        text={route.text}
        style={route.active ? "nav-item current" : "nav-item"}
        id={route.id}
        handleClick={this.handleClick}
      />
    ));

    return (
      <div className="nav-bar">
        <ul id="navigation" className="nav-list">
          {routes}
        </ul>
      </div>
    );
  }
}

export default NavBar;
