import _ from "lodash";
import { round } from "./decimals";

function getNutrition(foods) {
  var summary = _.reduce(foods, function(total, e) {
    return {
      fat: total.fat + e.nutrition.fat * e.quantity,
      carbohydrate: total.carbohydrate + e.nutrition.carbohydrate * e.quantity,
      protein: total.protein + e.nutrition.protein * e.quantity
    };
  }, { fat: 0, carbohydrate: 0, protein: 0 });

  return {
    fat: round(summary.fat, -1),
    carbohydrate: round(summary.carbohydrate, -1),
    protein: round(summary.protein, -1)
  };
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
