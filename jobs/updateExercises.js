var _ = require("lodash");
var moment = require("moment");

var getExercises = require("./strava").getExercises;
var mongoInitialiser = require("../initialisers/mongo");
var Entry = require("../models/diaryDay");
var entriesService = require("../models/entriesService");

function updateDailyEntry(exercise) {
  var startDate = moment(exercise.start_date);

  // entriesService.get(moment()).then(function(entry) {

  // });

  console.log(startDate);
}

mongoInitialiser();

getExercises()
  .then(function(items) {
    items.forEach(function(exercise) {
      updateDailyEntry(exercise);
    });

    process.exit();
  });