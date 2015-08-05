"use strict";

var React = require("react");

var ReactPropTypes = React.PropTypes;

var Exercise = React.createClass({

  propTypes: {
    value: ReactPropTypes.object.isRequired,
    onChange: ReactPropTypes.func.isRequired
  },

  render: function() {
    var exercise = this.props.value;

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-2">Energy</label>
          <div className="col-sm-10">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="energy" ref="energy" value={exercise.energy} onChange={this.energyChanged} />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.convert}><span className="glyphicon glyphicon-fire" /></button>
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Start</label>
          <div className="col-sm-10">
            <input type="time" className="form-control" placeholder="HH:mm" ref="time" value={exercise.time} onChange={this.timeChanged} />
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Duration</label>
          <div className="col-sm-10">
            <input className="form-control" type="text" placeholder="duration" ref="duration" value={exercise.duration} onChange={this.durationChanged} />
          </div>
        </div>
      </div>
    );
  },

  convert: function() {
    var value = this.props.value.energy * 4.184;

    this.processChange(function(a) {
      a.energy = value;
    });
  },

  energyChanged: function(event) {
    this.processChange(function(a) {
      a.energy = event.target.value;
    });
  },

  timeChanged: function(event) {
    this.processChange(function(a) {
      a.time = event.target.value;
    });
  },

  durationChanged: function(event) {
    this.processChange(function(a) {
      a.duration = event.target.value;
    });
  },

  getValue: function(refName) {
    return this.refs[refName].props.value;
  },

  getChangeValue: function(override) {
    var value = {
      energy: this.getValue("energy"),
      time: this.getValue("time"),
      duration: this.getValue("duration")
    };

    override(value);

    return value;
  },

  processChange: function(override) {
    var value = this.getChangeValue(override);

    this.props.onChange(value);
  }

});

module.exports = Exercise;
