"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;

var _ = require("lodash");

var Food = require("./Food.react");

var FoodsTable = React.createClass({

  propTypes: {
    value: ReactPropTypes.array.isRequired,
    onChange: ReactPropTypes.func.isRequired,
    onEnergyChange: ReactPropTypes.func.isRequired
  },

  componentWillReceiveProps: function(newProps) {
    for (var i = newProps.length - 1; i >= 0; i--) {
      newProps[i].key = newProps[i]._id;
    }
  },

  render: function() {
    var rows = [];
    var foods = this.props.value;

    for (var i = 0; i < foods.length; i++) {
      if(foods[i]._id) {
        foods[i].key = foods[i]._id;
      }

      rows.push(<Food key={foods[i].key} value={foods[i]} onRemove={this.removeFood} onChange={this.changeFood} />);
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
      <div>
        <div className="row">
          <label className="control-label col-sm-3">
            Time
          </label>
          <label className="control-label col-sm-3">
            Food
          </label>
          <label className="control-label col-sm-2">
            Energy
          </label>
          <label className="control-label col-sm-2">
            Quantity
          </label>
        </div>
        {rows}
        <div>
          <a className="btn btn-info" onClick={this.newFood}><span className="glyphicon glyphicon-plus"></span></a>
          {this.getEnergy(foods)}
        </div>
      </div>
      </div>
      </div>
    );
  },

  newFood: function() {
    var foods = this.props.value;

    foods.push({
      key: Math.random().toString(36).substring(7),
      time: "",
      food: "",
      energy: "",
      quantity: ""
    });

    this.props.onChange(foods);
  },

  removeFood: function(food) {
    var foods = this.props.value;

    _.remove(foods, function(f) {
      return f.key === food.key;
    });

    this.props.onChange(foods);
  },

  getEnergy: function(foods) {
    var energy = _.map(foods, function(f) {
      return f.unitEnergy*f.quantity;
    });

    return _.reduce(energy, function(total, e) {
      return total + e;
    });
  },

  changeFood: function(food) {
    var foods = this.props.value;

    var index = _.indexOf(foods, _.find(foods, {key: food.key}));

    foods.splice(index, 1, food);

    this.props.onChange(foods);
    this.props.onEnergyChange(this.getEnergy(foods));
  }

});

module.exports = FoodsTable;
