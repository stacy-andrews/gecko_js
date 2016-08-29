var _ = require("lodash");
var moment = require("moment");

var getExercises = require("./strava").getExercises;
var getActivity = require("./strava").getActivity;
var mongoInitialiser = require("../initialisers/mongo");
var Entry = require("../models/diaryDay");
var entriesService = require("../models/entriesService");

function buildExercises(exercises, activity) {
  let sd = moment(activity.start_date);

  if (exercises[0].time === '') {
    exercises[0] = {
      energy: activity.calories * 4.184,
      time: sd.format("HH:mm"),
      duration: activity.elapsed_time/60
    }
  }
}

function updateDailyEntry(exercise) {
  return new Promise(function(resolve, reject) {
    var d = moment(moment(exercise.start_date).format("YYYY-MM-DD"));
    getActivity(exercise.id)
      .then(function(activity) {
        entriesService.get(d)
          .then(function(entry) {
            if (entry) {
              let exercises = buildExercises(entry.exercises, activity);

              entriesService.update(entry, { exercises: exercises })
                .then(function() {
                  resolve();
                });
            } else {
              resolve();
            }
          })
          .catch(function(err) {
            reject(err);
          });
      });
  });
}

module.exports = function(done) {
  getExercises()
    .then(function(items) {
      var updates = items.map(updateDailyEntry);
      Promise.all(updates)
          .then(function() {
            done();
          })
          .catch(function(err) {
            console.log(err);
            done();
          });
    });
}
