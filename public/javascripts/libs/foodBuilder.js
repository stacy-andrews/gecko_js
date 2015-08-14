"use strict";

var moment = require("moment");

function getCurrentTime() {
  var now = moment();

  return now.format("HH:mm");
}

function generateKey() {
  return Math.random().toString(36).substring(7);
}

module.exports = {

  build: function(foodSettings) {
    return {
      key: generateKey(),
      time: getCurrentTime(),
      description: foodSettings.description,
      unitEnergy: foodSettings.unitEnergy,
      quantity: foodSettings.quantity,
      section: foodSettings.section
    };
  }

};
