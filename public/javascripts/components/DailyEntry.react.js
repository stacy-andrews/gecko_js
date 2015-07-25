"use strict";

var React = require("react");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");
var DailyEntryStore = require("../stores/DailyEntryStore");
var Header = require("./Header.react.js");
var Exercise = require("./Exercise.react.js");
var FoodsTable = require("./FoodsTable.react.js");

function getYPetVetState() {
  return DailyEntryStore.getCurrent();
}

var DailyEntry = React.createClass({

  getInitialState: function() {
    return getYPetVetState();
  },

  componentDidMount: function() {
    DailyEntryStore.addChangeListener(this.onDataChange);
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
        <Header isLoading={this.state.isLoading} onSave={this.save} />
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
        <FoodsTable value={this.state.foods} onChange={this.foodsChanged} />
      </div>
    );
  },

  foodsChanged: function(value) {
    this.setState({
      foods: value
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

  save: function() {
    DailyEntryActionCreators.save({
      id: this.state.id,
      exercises: [
        this.state.morningExercise,
        this.state.eveningExercise
      ],
      foods: this.state.foods
    });
  }

});

module.exports = DailyEntry;
