"use strict";

var React = require("react");

var Exercise = React.createClass({

  render: function() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-2">Energy</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" placeholder="energy" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Start</label>
          <div className="col-sm-10">
            <input type="time" className="form-control" placeholder="HH:mm" />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Duration</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" placeholder="duration" />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Exercise;
