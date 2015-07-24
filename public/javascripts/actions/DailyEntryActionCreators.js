"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var DailyEntryActionCreators = {
  save: function() {
    AppDispatcher.dispatch({
      actionType: "save"
    });
  },

  load: function() {
    AppDispatcher.dispatch({
      actionType: "load"
    });
  }

};

module.exports = DailyEntryActionCreators;
