"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;
var _ = require("lodash");

var energyCalculator = require("../libs/energyCalculator");
var Food = require("./Food.react");
var foodBuilder = require("../libs/foodBuilder");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");

var FoodsTable = React.createClass({

  propTypes: {
    value: ReactPropTypes.array.isRequired,
    onChange: ReactPropTypes.func.isRequired,
    name: ReactPropTypes.string.isRequired
  },

  componentWillReceiveProps: function(newProps) {
    for (var i = newProps.length - 1; i >= 0; i--) {
      newProps[i].key = newProps[i]._id;
    }
  },

  render: function() {
    var that = this;

    var foods = _.filter(this.props.value, function(f) { return f.section === that.props.name.toLowerCase(); });

    var rows = _.map(foods, function(f) {
      if (f._id) {
        f.key = f._id;
      }

      return (
        <Food key={f.key} value={f} onRemove={that.removeFood} onChange={that.changeFood} />
      );
    });

    var sectionName = this.props.name;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {sectionName} ({energyCalculator.calculateFoods(foods)})
        </div>
        <div className="panel-body">
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
          <div className="btn-toolbar">
            <button className="btn btn-info" onClick={this.newFood}><span className="glyphicon glyphicon-plus"></span></button>
            <button className="btn btn-default" onClick={this.favouriteClicked}>{sectionName}</button>
          </div>
        </div>
      </div>
    );
  },

  favouriteClicked: function() {
    DailyEntryActionCreators.favourites(this.props.name.toLowerCase());
  },

  newFood: function() {
    var foods = this.props.value;

    foods.push(foodBuilder.build({
      section: this.props.name.toLowerCase()
    }));

    this.props.onChange(foods);
  },

  removeFood: function(food) {
    var foods = this.props.value;

    _.remove(foods, function(f) {
      return f.key === food.key;
    });

    this.props.onChange(foods);
  },

  changeFood: function(food) {
    var foods = this.props.value;

    var index = _.indexOf(foods, _.find(foods, {key: food.key}));

    foods.splice(index, 1, food);

    this.props.onChange(foods);
  }

});

module.exports = FoodsTable;
