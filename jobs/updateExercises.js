var _ = require("lodash");
var moment = require("moment");

var getExercises = require("./strava").getExercises;
var mongoInitialiser = require("../initialisers/mongo");
var Entry = require("../models/diaryDay");
var entriesService = require("../models/entriesService");

function updateDailyEntry(exercise) {
  return new Promise(function(resolve, reject) {
    var d = moment(moment(exercise.start_date).format("YYYY-MM-DD"));

    entriesService.get(d)
      .then(function(entry) {
        console.log(entry);
        resolve();
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

mongoInitialiser();

getExercises()
  .then(function(items) {
    var updates = items.map(updateDailyEntry);
    Promise.all(updates)
        .then(function() {
          process.exit();
        });
  });