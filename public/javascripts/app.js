"use strict";

var React = require("react");
var router = require("routing/routes");
var ReactDOM = require("react-dom");
// router.run(function (Handler, state) {
  ReactDOM.render(router, document.getElementById("container"));
// });

window.React = React;
