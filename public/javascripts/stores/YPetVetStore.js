"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var request = require("superagent");

var CHANGE_EVENT = "change";
var options = [];
var currentPet = {
  weight: "5",
  activityLevel: "normal"
};

var selectedOptions = [];
var hasFinished = false;

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
        weight: currentPet.weight,
        activityLevel: currentPet.activityLevel,
        options: options,
        canOrder: selectedOptions.length >= 1,
        hasFinished: hasFinished
    };
  }
});

function fetchCosts(pet) {
  request("/api/options?weight=" + pet.weight + "&activity=" + pet.activityLevel)
    .end(function(err, res) {
      options = res.body;
      YPetVetStore.emitChange();
    });
}

function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
      if (a[i] === obj) {
          return true;
      }
  }
  return false;
}

function remove(a, obj) {
  for (var i = 0; i < a.length; i++) {
      if (a[i] === obj) {
        a.splice(i, 1);
      }
  }
}

function reset() {
  currentPet = {
    weight: "5",
    activityLevel: "normal"
  };

  options = [];

  selectedOptions = [];

  hasFinished = false;
}

function toggle(orderOption) {
  if(!contains(selectedOptions, orderOption)) {
    selectedOptions.push(orderOption);
  } else {
    remove(selectedOptions, orderOption);
  }
  YPetVetStore.emitChange();
}

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case "save":
      console.log("save");
      YPetVetStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = YPetVetStore;
