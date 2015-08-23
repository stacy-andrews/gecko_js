"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var energyCalculator = require("../libs/energyCalculator");
var foodBuilder = require("../libs/foodBuilder");

var isLoading = false;

var basicEntry = {
  exercises: [
    { energy: "", time: "", duration: "" },
    { energy: "", time: "", duration: "" }
  ],
  foods: [],
  measurements: {
    chest: 0,
    stomach: 0,
    thigh: 0
  }
};

function clone() {
  return JSON.parse(JSON.stringify(basicEntry));
}

var entry = clone();

var CHANGE_EVENT = "change";

function applyFavourites(favourites) {
  for (var i = 0; i < favourites.length; i++) {
    entry.foods.push(foodBuilder.build(favourites[i]));
  }
}

var YPetVetStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrent: function() {
    return {
        isLoading: isLoading,
        morningExercise: entry.exercises[0],
        eveningExercise: entry.exercises[1],
        entry: entry,
        foods: entry.foods,
        id: entry.id,
        energy: energyCalculator.calculate(entry),
        measurements: entry.measurements
    };
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case "dailyEntry_save_started":
      isLoading = true;
      YPetVetStore.emitChange();
      break;
    case "dailyEntry_get_started":
      isLoading = true;
      YPetVetStore.emitChange();
      break;
    case "dailyEntry_get_notfound":
      isLoading = false;
      entry = clone();
      YPetVetStore.emitChange();
      break;
    case "dailyEntry_get_completed":
      isLoading = false;
      entry = action.entry;

      if(entry.exercises.length === 0) {
        entry.exercises.push({ energy: "", time: "", duration: "" });
        entry.exercises.push({ energy: "", time: "", duration: "" });
      }

      YPetVetStore.emitChange();

      break;
    case "dailyEntry_save_completed":
      isLoading = false;
      entry = action.entry;

      if(entry.exercises.length === 0) {
        entry.exercises.push({ energy: "", time: "", duration: "" });
        entry.exercises.push({ energy: "", time: "", duration: "" });
      }

      YPetVetStore.emitChange();

      break;
    case "favourites_get_completed":
      applyFavourites(action.favourites);

      YPetVetStore.emitChange();

      break;
    default:
      // no op
  }
});

module.exports = YPetVetStore;
