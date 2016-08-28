"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;

var App = React.createClass({
  propTypes: {
    children: ReactPropTypes.object.isRequired
  },
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
