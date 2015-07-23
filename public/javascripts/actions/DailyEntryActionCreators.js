"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var DailyEntryActionCreators = {
  save: function() {
    AppDispatcher.dispatch({
      actionType: "save"
    });
  }
};

module.exports = DailyEntryActionCreators;
