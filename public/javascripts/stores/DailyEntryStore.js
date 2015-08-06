"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var _ = require("lodash");

var isLoading = false;

var basicEntry = {
  exercises: [
    { energy: "", time: "", duration: "" },
    { energy: "", time: "", duration: "" }
  ],
  foods: []
};

function clone() {
  return JSON.parse(JSON.stringify(basicEntry));
}

function getEnergy(foods) {
  var energy = _.map(foods, function(f) {
    return f.unitEnergy * f.quantity;
  });

  return _.reduce(energy, function(total, e) {
    return total + e;
  });
}

function calcEnergy() {
  return getEnergy(entry.foods) -
          (2500 + 8125 +
          entry.exercises[0].energy +
          entry.exercises[1].energy);
}

var entry = clone();

var CHANGE_EVENT = "change";

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
        id: entry._id,
        energy: calcEnergy()
    };
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case "save":
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
    default:
      // no op
  }
});

module.exports = YPetVetStore;
