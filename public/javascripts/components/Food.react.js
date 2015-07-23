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
        <div className="form-group col-sm-3">
          <input className="form-control" type="text" placeholder="energy" ref="energy" value={food.energy} onChange={this.energyChanged} />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="quantity" />
        </div>
        <div className="col-sm-1">
          <div className="btn-group">
            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></button>
            <ul className="dropdown-menu">
              <li>
                <a className="glyphicon glyphicon-fire" onClick={this.convertClicked} />
              </li>
              <li>
                <a className="glyphicon glyphicon-list-alt" />
              </li>
              <li role="separator" className="divider"></li>
              <li onClick={this.removeClicked}>
                <a className="glyphicon glyphicon-remove" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },

  convertClicked: function() {
    var energy = this.refs.energy.props.value;

    this.processChange(function(a) {
      a.energy = energy * 4.184;
    });
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

  energyChanged: function(event) {
    this.processChange(function(a) {
      a.energy = event.target.value;
    });
  },

  getValue: function(refName) {
    return this.refs[refName].props.value;
  },

  getChangeValue: function(override) {
    var value = {
      row: this.props.value.row,
      time: this.getValue("time"),
      food: this.getValue("food"),
      energy: this.getValue("energy")
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
