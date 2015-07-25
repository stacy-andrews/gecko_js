"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var EntryApi = require("../api/dailyEntry");

var DailyEntryActionCreators = {
  save: function(entry) {
    AppDispatcher.dispatch({
      actionType: "dailyEntry_save_started",
      entry: entry
    });

    EntryApi.save(entry);
  },

  load: function() {
    AppDispatcher.dispatch({
      actionType: "dailyEntry_get_started"
    });

    EntryApi.get();
  }

};

module.exports = DailyEntryActionCreators;
