"use strict";

var React = require("react");
var GeckoJSActions = require("../actions/YPetVetActions");

var Header = React.createClass({

  render: function() {
    return (
      <div>
        <div style={{float: "left"}}>
          <a className="btn btn-info">
            <span className="glyphicon glyphicon-chevron-left"></span>
          </a>
          <a className="btn btn-info">
            <span className="glyphicon glyphicon-chevron-right"></span>
          </a>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.onClickSave}>
          <span><img src="/images/loading-cylon.svg" /></span>
          <span>Save</span>
        </button>
        <button type="button" className="btn btn-danger" style={{float: "right"}}>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      </div>
    );
  },

  onClickSave: function() {
    GeckoJSActions.save();
  }

});

module.exports = Header;
