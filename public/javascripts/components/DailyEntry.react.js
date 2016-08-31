import React, { PropTypes } from "react";
import moment from "moment";

import dailyEntryActionCreators from "../actions/dailyEntryActionCreators";
import dailyEntryStore from "../stores/dailyEntryStore";

import Header from "./Header.react.js";
import Exercise from "./Exercise.react.js";
import FoodsTable from "./FoodsTable.react.js";
import Measurements from "./Measurements.react.js";

function getDailyEntryState() {
  return dailyEntryStore.getCurrent();
}

export default React.createClass({

  propTypes: {
    params: PropTypes.object.isRequired
  },

  componentWillReceiveProps: function(newProps) {
    this.load(newProps.params);
  },

  getInitialState: function() {
    return getDailyEntryState();
  },

  componentDidMount: function() {
    dailyEntryStore.addChangeListener(this.onDataChange);

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

    dailyEntryActionCreators.load(date);
  },

  componentWillUnmount: function() {
    dailyEntryStore.removeChangeListener(this.onDataChange);
  },

  onDataChange: function() {
    this.setState(getDailyEntryState());
  },

  render: function() {
    return (
      <div>
        <Header params={this.props.params} energy={this.state.energy} isLoading={this.state.isLoading} nutrition={this.state.nutrition} onSave={this.save} />
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
    dailyEntryActionCreators.save({
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
