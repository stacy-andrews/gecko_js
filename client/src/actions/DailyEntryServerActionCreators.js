import AppDispatcher from "../dispatcher/dispatcher";

export default {

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
  },

  receiveCreatedEntry: function(entry) {
    AppDispatcher.dispatch({
      actionType: "dailyEntry_save_completed",
      entry: entry
    });
  }

};
