"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;

var Food = React.createClass({

  propTypes: {
    onRemove: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.object.isRequired,
    onChange: ReactPropTypes.func.isRequired
  },

  render: function() {
    var food = this.props.value;

    return (
      <div className="row">
        <div className="form-group col-sm-2">
          {food.time} <input className="form-control" type="time" ref="time" value={food.time} onChange={this.timeChanged} />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="food" ref="food" value={food.food} onChange={this.foodChanged} />
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
          {food.row}
        </div>
        <div className="form-group col-sm-1">
          <button type="button" className="btn btn-danger form-control" onClick={this.removeClicked}><span className="glyphicon glyphicon-remove"></span></button>
        </div>
        <div className="form-group col-sm-1">
          <button type="button" className="btn btn-info form-control"><span className="glyphicon glyphicon-list-alt"></span></button>
        </div>
      </div>
    );
  },


  timeChanged: function(event) {
    this.processChange(function(a) {
      a.time = event.target.value;
    });
  },

  foodChanged: function(event) {
    this.processChange(function(a) {
      a.food = event.target.value;
    });
  },

  getChangeValue: function(override) {
    var value = {
      row: this.props.value.row,
      time: this.refs.time.props.value,
      food: this.refs.food.props.value
    };

    override(value);

    return value;
  },

  processChange: function(override) {
    var value = this.getChangeValue(override);

    this.props.onChange(value);
  },

  removeClicked: function() {
    this.props.onRemove(this.props.value);
  }
});

module.exports = Food;
