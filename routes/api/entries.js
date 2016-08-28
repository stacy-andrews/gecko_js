var express = require("express");
var router = express.Router();

var Entry = require("../../models/diaryDay.js");
var entriesService = require("../../models/entriesService")
var moment = require("moment");

function build(message, status) {
  var err = new Error(message);
  err.status = status;
}

router.get("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    return next(build("Invalid date", 400));
  }

  entriesService.get(today)
    .then(function(entry) {
      if (!entry) {
        return next(build("Not known", 404));
      }

      return res.json(entry);
    })
    .catch(function(err) {
      return next(err);
    });
});

router.post("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    return next(build("Invalid date", 400));
  }

  var entry = new Entry(req.body);

  entry.date = today;

  entry.save(function (err, createdEntry) {
    if (err) {
      return next(err);
    }

    return res.json(createdEntry);
  });
});

router.put("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    return next(build("Invalid date", 400));
  }

  entriesService.get(today)
    .then(function(entry) {
      if (!entry) {
        return next(build("Not known", 404));
      }

      entriesService.update(entry, {
        exercises: req.body.exercises,
        foods: req.body.foods,
        measurements: req.body.measurements
      })
      .then(function(savedEntry) {
        return res.json(savedEntry);
      });
    })
    .catch(function(err) {
      return next(err);
    });
});

module.exports = router;
