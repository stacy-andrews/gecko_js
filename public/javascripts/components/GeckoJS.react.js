"use strict";

var React = require("react");
var YPetVetActions = require("../actions/YPetVetActions");
var YPetVetStore = require("../stores/YPetVetStore");
var Header = require("./Header.react.js");
var Exercise = require("./Exercise.react.js");
var FoodsTable = require("./FoodsTable.react.js");

function getYPetVetState() {
  return YPetVetStore.getCurrent();
}

var Gecko = React.createClass({

  getInitialState: function() {
    return getYPetVetState();
  },

  componentDidMount: function() {
    YPetVetStore.addChangeListener(this.onDataChange);
  },

  componentWillUnmount: function() {
    YPetVetStore.removeChangeListener(this.onDataChange);
  },

  onDataChange: function() {
    this.setState(getYPetVetState());
  },

  render: function() {
    return (
      <div>
        <Header />
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
