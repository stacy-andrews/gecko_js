"use strict";

var React = require("react");

var Food = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="form-group col-sm-2">
          <input className="form-control" type="time" />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="food" />
        </div>
        <div className="form-group col-sm-2">
          <div className="form-group has-feedback">
            <input className="form-control" type="text" placeholder="energy" />
            <span className="glyphicon glyphicon-fire form-control-feedback"></span>
          </div>
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="quantity" />
        </div>
        <div className="form-group col-sm-1">
          0
        </div>
        <div className="form-group col-sm-1">
          <button type="button" className="btn btn-danger form-control"><span className="glyphicon glyphicon-remove"></span></button>
        </div>
        <div className="form-group col-sm-1">
          <button type="button" className="btn btn-info form-control"><span className="glyphicon glyphicon-list-alt"></span></button>
        </div>
      </div>
    );
  }
});

module.exports = Food;