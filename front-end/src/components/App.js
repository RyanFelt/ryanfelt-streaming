import React from "react";
import "../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { FourOFour } from "./pages/FourOFour";
import { Film } from "./pages/Film";
import { Watch } from "./pages/Watch";
import { Header } from "./lib/Header";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/404" component={FourOFour} />
        <Route exact path="/film/:film" component={Film} />
        <Route exact path="/film/:film/watch" component={Watch} />
      </div>
    </Router>
  );
}
