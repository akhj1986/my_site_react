import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Game from "./components/game/Game";
import Wrapper from "./components";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/" component={Wrapper} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
