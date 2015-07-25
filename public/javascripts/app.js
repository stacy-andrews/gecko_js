"use strict";

var React = require("react");
var router = require("routing/router");

router.run(function (Handler, state) {
  React.render(React.createElement(Handler, { params: state.params }), document.getElementById("container"));
});

window.React = React;
