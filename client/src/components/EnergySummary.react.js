"use strict";

var React = require("react");

var ReactPropTypes = React.PropTypes;

function getClassNames(status) {
  var transform = {
    good: "btn btn-success",
    bad: "btn btn-danger",
    neutral: "btn btn-warning"
  };

  return transform[status];
}

var EnergySummary = React.createClass({

  propTypes: {
    energy: ReactPropTypes.object.isRequired
  },

  render: function() {
    var energy = this.props.energy;

    return (
      <button type="button" className={getClassNames(energy.status)}>
        {energy.requirements} | {energy.food} | {energy.diff}
      </button>
    );
  }

});

module.exports = EnergySummary;
