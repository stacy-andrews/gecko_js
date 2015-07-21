"use strict";

var React = require("react");

var Food = require("./Food.react");

var FoodsTable = React.createClass({

  getInitialState: function() {
    return {
      foods: [1, 2, 3]
    };
  },

  render: function() {
    var rows = [];

    for (var i = 0; i < this.state.foods.length; i++) {
      rows.push(<Food />);
    }

    return (
      <div>
        <div className="row">
          <label className="control-label col-sm-2">
            Time
          </label>
          <label className="control-label col-sm-2">
            Food
          </label>
          <label className="control-label col-sm-2">
            Energy
          </label>
          <label className="control-label col-sm-2">
            Quantity
          </label>
          <label className="control-label col-sm-2">
            &nbsp;
          </label>
          <label className="control-label col-sm-2">
            &nbsp;
          </label>
        </div>
        {rows}
      </div>
    );
  }

});

module.exports = FoodsTable;
