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

var Gecko = React.createClass({

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
        <Header isLoading={this.state.isLoading} />
        <div className="row">
          <div className="col-sm-6">
            <Exercise />
          </div>
          <div className="col-sm-6">
            <Exercise />
          </div>
        </div>
        <FoodsTable />
      </div>

    );
  },

  onClickProceed: function() {
    YPetVetActions.proceed();
  }

});

module.exports = Gecko;
