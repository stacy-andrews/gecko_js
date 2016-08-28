var Entry = require("./diaryDay.js");

function getEntry(today) {
  return new Promise(function(resolve, reject) {
    var query = Entry.findOne({ "date": { "$eq": today } });

    query.exec(function (err, entry) {
      if (err) {
        reject(err);
      }

      resolve(entry);
    });
  });
}

function updateEntry(entry, entryChanges) {
  entry.exercises = entryChanges.exercises;
  entry.foods = entryChanges.foods;
  entry.measurements = entryChanges.measurements;

  return new Promise(function(resolve, reject) {
    entry.save(function(saveErr, savedEntry) {
      if (saveErr) {
        return reject(saveErr);
      }

      return resolve(savedEntry);
    });
  });
}

module.exports = {
  get: getEntry,
  update: updateEntry
};