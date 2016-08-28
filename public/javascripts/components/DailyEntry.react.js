"use strict";

var React = require("react");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");
var DailyEntryStore = require("../stores/DailyEntryStore");
var Header = require("./Header.react.js");
var Exercise = require("./Exercise.react.js");
var FoodsTable = require("./FoodsTable.react.js");
var Measurements = require("./Measurements.react.js");

var ReactPropTypes = React.PropTypes;
var moment = require("moment");
var energyCalculator = require("../libs/energyCalculator");

function getDailyEntryState() {
  return DailyEntryStore.getCurrent();
}

var DailyEntry = React.createClass({

  propTypes: {
    params: ReactPropTypes.object.isRequired
  },

  componentWillReceiveProps: function(newProps) {
    this.load(newProps.params);
  },

  getInitialState: function() {
    return getDailyEntryState();
  },

  componentDidMount: function() {
    DailyEntryStore.addChangeListener(this.onDataChange);

    this.load(this.props.params);
  },

  load: function(params) {
    var date = moment();

    if(params.year) {
      date = moment({
        year: params.year,
        month: params.month - 1,
        day: params.day
      });
    }

    DailyEntryActionCreators.load(date);
  },

  componentWillUnmount: function() {
    DailyEntryStore.removeChangeListener(this.onDataChange);
  },

  onDataChange: function() {
    this.setState(getDailyEntryState());
  },

  render: function() {
    var energy = energyCalculator.calculate({
      exercises: [
        this.state.morningExercise,
        this.state.eveningExercise
      ],
      foods: this.state.foods
    });

    return (
      <div>
        <Header params={this.props.params} energy={energy} isLoading={this.state.isLoading} nutrition={this.state.nutrition} onSave={this.save} />
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-6">
                <Exercise value={this.state.morningExercise} onChange={this.morningExerciseChanged} />
              </div>
              <div className="col-sm-6">
                <Exercise value={this.state.eveningExercise} onChange={this.eveningExerciseChanged} />
              </div>
            </div>
          </div>
        </div>
        <FoodsTable name="Breakfast" value={this.state.foods} onChange={this.foodsChanged} onEnergyChange={this.foodEnergyChanged} />
        <FoodsTable name="Lunch" value={this.state.foods} onChange={this.foodsChanged} onEnergyChange={this.foodEnergyChanged} />
        <FoodsTable name="Dinner" value={this.state.foods} onChange={this.foodsChanged} onEnergyChange={this.foodEnergyChanged} />
        <Measurements value={this.state.measurements} onChange={this.measurementsChanged} />
      </div>
    );
  },

  foodsChanged: function(value) {
    this.setState({
      foods: value
    });
  },

  foodEnergyChanged: function(value) {
    this.setState({
      foodEnergy: value
    });
  },

  morningExerciseChanged: function(value) {
    this.setState({
      morningExercise: value
    });
  },

  eveningExerciseChanged: function(value) {
    this.setState({
      eveningExercise: value
    });
  },

  measurementsChanged: function(value) {
    this.setState({
      measurements: value
    });
  },

  getCurrentDate: function(params) {
    var date = moment();

    if(params.year) {
      date = moment({
        year: params.year,
        month: params.month - 1,
        day: params.day
      });
    }

    return date;
  },

  save: function() {
    DailyEntryActionCreators.save({
      id: this.state.id,
      exercises: [
        this.state.morningExercise,
        this.state.eveningExercise
      ],
      foods: this.state.foods,
      measurements: this.state.measurements
    },
    this.getCurrentDate(this.props.params));
  }

});

module.exports = DailyEntry;
