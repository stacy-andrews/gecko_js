"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var EntryApi = require("../api/dailyEntry");
var FavouritesApi = require("../api/favourites");

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
  },

  favourites: function(name) {
    AppDispatcher.dispatch({
      actionType: "favourites_get_started",
      name: name
    });

    FavouritesApi.get(name);
  }

};

module.exports = DailyEntryActionCreators;
