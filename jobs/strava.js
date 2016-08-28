var strava = require('strava-v3');

function getExercises() {
  return new Promise(function(resolve, reject) {
    strava.athlete.listActivities({ },function(err, payload) {
      if(!err) {
        resolve(payload);
      }
      else {
        console.log(err);
        reject(err);
      }
    });
  });
}

module.exports = {
  getExercises: getExercises
};