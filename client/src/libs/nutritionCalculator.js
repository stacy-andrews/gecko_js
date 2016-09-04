import _ from "lodash";
import { round } from "./decimals";

function getItem(item, element) {
  if (!item.nutrition) {
    return 0;
  }

  return item.nutrition[element] * item.quantity;
}

function getNutrition(foods) {
  var summary = _.reduce(foods, function(total, e) {
    return {
      fat: total.fat + getItem(e, "fat"),
      carbohydrate: total.carbohydrate + getItem(e, "carbohydrate"),
      protein: total.protein + getItem(e, "protein")
    };
  }, { fat: 0, carbohydrate: 0, protein: 0 });

  return {
    fat: round(summary.fat, -1),
    carbohydrate: round(summary.carbohydrate, -1),
    protein: round(summary.protein, -1)
  };
}

function getEnergy(entry) {
  return getNutrition(entry.foods);
}

module.exports = {
  getNutritionTotals: getEnergy,
};
