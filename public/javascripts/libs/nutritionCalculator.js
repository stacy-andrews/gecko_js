"use strict";

var _ = require("lodash");

function getNutrition(foods) {
  return _.reduce(foods, function(total, e) {
    return {
      fat: total.fat + e.nutrition.fat * e.quantity,
      carbohydrate: total.carbohydrate + e.nutrition.carbohydrate * e.quantity,
      protein: total.protein + e.nutrition.protein * e.quantity
    };
  }, { fat: 0, carbohydrate: 0, protein: 0 });
}

function getStatus(diff) {
  // if (diff < -2000) {
  //   return "good";
  // }

  // if (diff >= -2000 && diff <= 2000) {
    return "neutral";
  // }

  // return "bad";
}

function getEnergy(entry) {
  return getNutrition(entry.foods);
}

module.exports = {
  getNutritionTotals: getEnergy,
};
