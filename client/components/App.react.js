import React, { PropTypes } from "react";

var App = React.createClass({
  propTypes: {
    children: PropTypes.object.isRequired
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
