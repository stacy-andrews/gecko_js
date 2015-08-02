"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var DailyEntryActionCreators = {

  receiveEntry: function(entry) {
    AppDispatcher.dispatch({
      actionType: "dailyEntry_get_completed",
      entry: entry
    });
  },

  receiveNotFoundEntry: function(date) {
    AppDispatcher.dispatch({
      actionType: "dailyEntry_get_notfound",
      date: date
    });
  }

};

module.exports = DailyEntryActionCreators;
