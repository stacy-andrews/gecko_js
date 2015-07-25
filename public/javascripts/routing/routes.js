var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var Redirect = Router.Redirect;

var DailyEntry = require("components/DailyEntry.react");
var App = require("components/App.react");

var routes = (
  <Route path="/" handler={App}>
    <Route name="dailyEntry" path="entry/" handler={DailyEntry} />

    <Redirect from="*" to="dailyEntry" />
  </Route>
  );

module.exports = routes;
