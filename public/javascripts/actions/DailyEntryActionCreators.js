"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var EntryApi = require("../api/dailyEntry");

var DailyEntryActionCreators = {
  save: function(entry, date) {
    AppDispatcher.dispatch({
      actionType: "dailyEntry_save_started",
      entry: entry
    });

    EntryApi.save(entry, date);
  },

  load: function(date) {

    AppDispatcher.dispatch({
      actionType: "dailyEntry_get_started"
    });

    EntryApi.get(date);
  }

};

module.exports = DailyEntryActionCreators;
