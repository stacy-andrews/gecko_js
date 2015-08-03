"use strict";

var React = require("react");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");
var DailyEntryStore = require("../stores/DailyEntryStore");
var Header = require("./Header.react.js");
var Exercise = require("./Exercise.react.js");
var FoodsTable = require("./FoodsTable.react.js");
var ReactPropTypes = React.PropTypes;
var moment = require("moment");

function getYPetVetState() {
  return DailyEntryStore.getCurrent();
}

var DailyEntry = React.createClass({

  propTypes: {
    params: ReactPropTypes.object.isRequired
  },

  componentWillReceiveProps: function(newProps) {
    if(!this.isMounted()) {
      return;
    }

    this.load(newProps.params);
  },

  getInitialState: function() {
    return getYPetVetState();
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
    this.setState(getYPetVetState());
  },

  render: function() {
    return (
      <div>
        <Header params={this.props.params} energy={this.state.foodEnergy} isLoading={this.state.isLoading} onSave={this.save} />
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
        <FoodsTable value={this.state.foods} onChange={this.foodsChanged} onEnergyChange={this.foodEnergyChanged} />
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
      foods: this.state.foods
    },
    this.getCurrentDate(this.props.params));
  }

});

module.exports = DailyEntry;
