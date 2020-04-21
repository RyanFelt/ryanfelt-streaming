import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/lib/Header';
import { Home } from './components/pages/Home';
import { FourOFour } from './components/pages/FourOFour';
import { Series } from './components/pages/Series';
import { WatchSeries } from './components/pages/WatchSeries';
import { Watch } from './components/pages/Watch';
import { Search } from './components/pages/Search';

export function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/404" component={FourOFour} />
        <Route exact path="/series/:series" component={Series} />
        <Route exact path="/series/:series/watch" component={WatchSeries} />
        <Route exact path="/watch" component={Watch} />
        <Route exact path="/search" component={Search} />
        <Route component={FourOFour} />
      </Switch>
    </Router>
  );
}
