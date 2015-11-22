"use strict";

var _ = require("lodash");

function getFoodEnergy(foods) {
  var energy = _.map(foods, function(f) {
    return f.unitEnergy * f.quantity;
  });

  var totalEnergy = _.reduce(energy, function(total, e) {
    return total + e;
  });

  if(!totalEnergy) {
    return 0;
  }

  return totalEnergy;
}

function getExerciseEnergy(exercises) {
  return exercises[0].energy +
         exercises[1].energy;
}

function getDayEnergyRequirements() {
  return 2500 + 8125;
}

function getStatus(diff) {
  if (diff < -2000) {
    return "good";
  }

  if (diff >= -2000 && diff <= 2000) {
    return "neutral";
  }

  return "bad";
}

function getEnergy(entry) {
  var requirements = getDayEnergyRequirements();
  var food = getFoodEnergy(entry.foods);
  var diff = food -
          (requirements +
          getExerciseEnergy(entry.exercises));
  var status = getStatus(diff);

  return {
    diff: diff,
    requirements: requirements,
    food: food,
    status: status
  };
}

module.exports = {
  calculate: getEnergy,
  calculateFoods: getFoodEnergy
};
