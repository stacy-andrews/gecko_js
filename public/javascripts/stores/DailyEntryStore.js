import appDispatcher from "../dispatcher/dispatcher";
import  { EventEmitter } from "events";
var assign = require("object-assign");
var energyCalculator = require("../libs/energyCalculator");
import nutritionCalculator from "../libs/nutritionCalculator";
var foodBuilder = require("../libs/foodBuilder");

var isLoading = false;

function getEmptyExercise() {
  return { energy: "", time: "", duration: "" };
}

function getEmptyMeasurements() {
  return { chest: "", stomach: "", thigh: "" };
}

function clone() {
  return {
    exercises: [
      getEmptyExercise(),
      getEmptyExercise()
    ],
    foods: [],
    measurements: getEmptyMeasurements()
  };
}

var entry = clone();

var CHANGE_EVENT = "change";

function applyFavourites(favourites) {
  for (var i = 0; i < favourites.length; i++) {
    entry.foods.push(foodBuilder.build(favourites[i]));
  }
}

var dailyEntryStore = assign({}, EventEmitter.prototype, {
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
        nutrition: nutritionCalculator.getNutritionTotals(entry),
        measurements: entry.measurements
    };
  }
});

function getExercise(exercise) {
  return {
    energy: exercise.energy || "",
    time: exercise.time || "",
    duration: exercise.duration || ""
  };
}

function normalise(exercises) {
  if(exercises.length === 0) {
    return [
      getEmptyExercise(),
      getEmptyExercise()
    ]
  }

  return [
    getExercise(exercises[0]),
    getExercise(exercises[1])
  ];
}

function build(entryFromApi) {
  return {
    id: entryFromApi.id,
    exercises: normalise(entryFromApi.exercises),
    foods: entryFromApi.foods,
    measurements: entryFromApi.measurements
  }
}

appDispatcher.register(function(action) {

  switch(action.actionType) {
    case "dailyEntry_save_started":
      isLoading = true;

      dailyEntryStore.emitChange();
      break;
    case "dailyEntry_get_started":
      isLoading = true;

      dailyEntryStore.emitChange();
      break;
    case "dailyEntry_get_notfound":
      isLoading = false;
      entry = clone();

      dailyEntryStore.emitChange();
      break;
    case "dailyEntry_get_completed":
      isLoading = false;
      entry = build(action.entry);

      dailyEntryStore.emitChange();
      break;
    case "dailyEntry_save_completed":
      isLoading = false;
      entry = build(action.entry);

      dailyEntryStore.emitChange();
      break;
    case "favourites_get_completed":
      applyFavourites(action.favourites);

      dailyEntryStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = dailyEntryStore;
