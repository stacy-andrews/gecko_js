"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;
var TypeAhead = require("./FoodTypeahead.react");

var Food = React.createClass({

  propTypes: {
    onRemove: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.object.isRequired,
    onChange: ReactPropTypes.func.isRequired
  },

  render: function() {
    var food = this.props.value;
    var bloodhoundConfig = {
      local: states
    };

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California'];//.... 
 // <input className="form-control" type="text" placeholder="food" ref="description" value={food.description} onChange={this.foodChanged} />
    return (
      <div className="row">
        <div className="form-group col-sm-3">
          <input className="form-control" type="time" ref="time" value={food.time} onChange={this.timeChanged} />
        </div>
        <div className="form-group col-sm-3">
           <TypeAhead value={food.description} onChange={this.foodChanged} ref="description" onOptionSelected={this.foodTypeAheadOptionSelected} />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="energy" ref="unitEnergy" value={food.unitEnergy} onChange={this.energyChanged} />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="quantity" ref="quantity" value={food.quantity} onChange={this.quantityChanged} />
        </div>
        <div className="col-sm-1">
          <div className="btn-group">
            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
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

  searchRequested: function() {

  },

  itemSelected: function() {

  },

  foodTypeAheadOptionSelected: function(food) {
    this.processChange(function(a) {
      a.unitEnergy = food.unitEnergy;
      a.description = food.description;
    });
  },

  convertClicked: function() {
    var energy = this.refs.unitEnergy.props.value;

    this.processChange(function(a) {
      a.unitEnergy = energy * 4.184;
    });
  },

  timeChanged: function(event) {
    this.processChange(function(a) {
      a.time = event.target.value;
    });
  },

  foodChanged: function(event) {
    this.processChange(function(a) {
      a.description = event.target.value;
    });
  },

  energyChanged: function(event) {
    this.processChange(function(a) {
      a.unitEnergy = event.target.value;
    });
  },

  quantityChanged: function(event) {
    this.processChange(function(a) {
      a.quantity = event.target.value;
    });
  },

  getValue: function(refName) {
    return this.refs[refName].props.value;
  },

  getChangeValue: function(override) {
    var value = {
      row: this.props.value.row,
      time: this.getValue("time"),
      description: this.getValue("description"),
      unitEnergy: this.getValue("unitEnergy"),
      quantity: this.getValue("quantity")
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
