"use strict";



var React = require("react");
var GeckoJS = require("./components/GeckoJS.react");

window.React = React;

React.render(
    <GeckoJS />,
    document.getElementById("container")
  );

