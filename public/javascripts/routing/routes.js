var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var Redirect = Router.Redirect;
var RouterEx = Router.Router;
var browserHistory = Router.hashHistory;
var IndexRoute = Router.IndexRoute;

var DailyEntry = require("components/DailyEntry.react");
var App = require("components/App.react");

var routes = (
  <RouterEx history={browserHistory}>
    <Route path="/" component={App}>
      <Route name="dailyEntry" path="entry/:year/:month/:day" component={DailyEntry} />
      <Route name="dailyEntryRoot" path="entry/" component={DailyEntry} />
    </Route>
  </RouterEx>
  );

module.exports = routes;
