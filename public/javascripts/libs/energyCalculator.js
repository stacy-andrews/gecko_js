"use strict";

var _ = require("lodash");

function getFooodEnergy(foods) {
  var energy = _.map(foods, function(f) {
    return f.unitEnergy * f.quantity;
  });

  return _.reduce(energy, function(total, e) {
    return total + e;
  });
}

function getExerciseEnergy(exercises) {
  return exercises[0].energy +
         exercises[1].energy;
}

function getEnergy(entry) {
  return getFooodEnergy(entry.foods) -
          (2500 + 8125 +
          getExerciseEnergy(entry.exercises));
}

module.exports = {
  calculate: getEnergy,
  calculateFoods: getFooodEnergy
};
