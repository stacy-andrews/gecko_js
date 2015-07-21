var numeral = require('numeral');
var energyPerDay = require('./energyPerDay.js');
var foodUnits = require('./products.js');

var calculate = function(unit, weight, activity) {
  var unitsRequired = (energyPerDay[weight][activity] * 7) / unit.energy;

  var roundedWholeUnits = Math.ceil(unitsRequired);

  var cost = roundedWholeUnits * unit.cost;

  return {
    unitsRequired: roundedWholeUnits,
    cost: numeral(cost).format('$0,0.00'),
    description: unit.type
  }
};

var calculator = {
  getOptions: function(weight, activity) {
    var options = foodUnits.map(function(unit) {
      return calculate(unit, weight, activity);
    });

    return options;
  }
}

module.exports = calculator;