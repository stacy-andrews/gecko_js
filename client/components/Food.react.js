"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;
var FoodTypeAhead = require("./FoodTypeahead.react");
var FoodMenu = require("./FoodMenu.react");
var NutritionInformation = require("./NutritionInformation.react");

var Food = React.createClass({
  propTypes: {
    onRemove: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.object.isRequired,
    onChange: ReactPropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      show: false
    };
  },

  render: function() {
    var food = this.props.value;

    return (
      <div className="row">
        <div className="form-group col-sm-3">
          <input className="form-control" type="time" ref="time" value={food.time} onChange={this.timeChanged} />
        </div>
        <div className="form-group col-sm-3">
           <FoodTypeAhead value={food.description} onChange={this.foodChanged} ref="description" onOptionSelected={this.foodTypeAheadOptionSelected} />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="energy" ref="unitEnergy" value={food.unitEnergy} onChange={this.energyChanged} />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="quantity" ref="quantity" value={food.quantity} onChange={this.quantityChanged} />
        </div>
        <div className="col-sm-1">
          <FoodMenu onAttributesSelected={this.attributesSelected} onRemove={this.removeClicked} />
          <NutritionInformation
            show={this.state.show}
            value={food.nutrition}
            onChange={this.nutritionInformationChanged}
            onClose={this.closeAttributes} />
        </div>
      </div>
    );
  },

  attributesSelected: function() {
    this.setState({show: true});
  },

  closeAttributes: function() {
    this.setState({show: false});
  },

  nutritionInformationChanged: function(newValue) {
    this.processChange(function(a) {
      a.nutrition = newValue;
    });
  },

  foodTypeAheadOptionSelected: function(food) {
    this.processChange(function(a) {
      a.unitEnergy = food.unitEnergy;
      a.description = food.description;
      a.nutrition = food.nutrition ? food.nutrition: { carbohydrate: 0, protein: 0, fat:0 };
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
      key: this.props.value.key,
      time: this.refs["time"].value,
      description: this.refs["description"].props.value,
      unitEnergy: this.refs["unitEnergy"].value,
      quantity: this.refs["quantity"].value,
      nutrition: this.props.value.nutrition,
      section: this.props.value.section
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
