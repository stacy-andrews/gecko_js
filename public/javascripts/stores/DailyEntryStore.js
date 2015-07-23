"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
// var request = require("superagent");

var isLoading = false;

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
        isLoading: isLoading
    };
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case "save":
      isLoading = true;
      YPetVetStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = YPetVetStore;
