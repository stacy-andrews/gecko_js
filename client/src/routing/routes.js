import React from "react";

import { hashHistory, Router, Route, IndexRoute, Link, withRouter, IndexRedirect } from 'react-router'

import DailyEntry from "../components/DailyEntry.react";
import App from "../components/App.react";

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="entry/" />
      <Route name="dailyEntryRoot" path="entry/" component={DailyEntry} />
      <Route name="dailyEntry" path="entry/:year/:month/:day" component={DailyEntry} />
    </Route>
  </Router>
  );

module.exports = routes;
