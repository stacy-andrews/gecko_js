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

var NutritionSummary = React.createClass({

  propTypes: {
    nutrition: ReactPropTypes.object.isRequired
  },

  render: function() {
    var energy = this.props.nutrition;

    return (
      <button type="button" className={getClassNames('neutral')}>
        F {energy.fat} | P {energy.protein} | C {energy.carbohydrate}
      </button>
    );
  }

});

module.exports = NutritionSummary;
