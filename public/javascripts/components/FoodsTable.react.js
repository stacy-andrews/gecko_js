"use strict";

var React = require("react");
var _ = require("lodash");

var Food = require("./Food.react");

var FoodsTable = React.createClass({

  getInitialState: function() {
    return {
      foods: []
    };
  },

  render: function() {
    var rows = [];

    for (var i = 0; i < this.state.foods.length; i++) {
      rows.push(<Food value={this.state.foods[i]} onRemove={this.removeFood} onChange={this.changeFood} />);
    }

    return (
      <div>
       <div>
          <a className="btn btn-info" onClick={this.newFood}><span className="glyphicon glyphicon-plus"></span></a>
        </div>
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
  },

  newFood: function() {
    var foods = this.state.foods;

    foods.push({
      row: Math.random().toString(36).substring(7),
      time: "",
      food: "",
      energy: "",
      quantity: ""
    });

    this.setState({
      foods: foods
    });
  },

  removeFood: function(food) {
    var foods = this.state.foods;

    _.remove(foods, function(f) {
      return f.row === food.row;
    });

    this.setState({
      foods: foods
    });
  },

  changeFood: function(food) {
    var foods = this.state.foods;

    var index = _.indexOf(foods, _.find(foods, {row: food.row}));

    foods.splice(index, 1, food);

    this.setState({
      foods: foods
    });
  }

});

module.exports = FoodsTable;
