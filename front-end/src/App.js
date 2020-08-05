import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from 'components/lib/PrivateRoute';
import { Header } from 'components/lib/Header';
import { Home } from 'components/pages/Home';
import { FourOFour } from 'components/pages/FourOFour';
import { Series } from 'components/pages/Series';
import { WatchSeries } from 'components/pages/WatchSeries';
import { Watch } from 'components/pages/Watch';
import { Search } from 'components/pages/Search';
import { Admin } from 'components/pages/Admin';
import { NewTitle } from 'components/pages/NewTitle';
import { NewEpisodes } from 'components/pages/NewEpisodes';

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
        <PrivateRoute exact path="/admin" component={Admin} />
        <PrivateRoute exact path="/admin/new-title" component={NewTitle} />
        <PrivateRoute
          exact
          path="/admin/new-episodes"
          component={NewEpisodes}
        />

        <Route component={FourOFour} />
      </Switch>
    </Router>
  );
}
