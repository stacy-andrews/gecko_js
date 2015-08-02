"use strict";

var express = require("express");
var router = express.Router();

var Entry = require("../../models/diaryDay.js");

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

  var query = Entry.findOne({ "date": { "$eq": today } });

  query.exec(function (err, entry) {
    if (err) {
      return next(err);
    }

    if (!entry) {
      return next(build("Not known", 404));
    }

    return res.json(entry);
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

  var query = Entry.findOne({ "date": { "$eq": today } });

  query.exec(function (err, entry) {
    if (err) {
      return next(build("Not known", 404));
    }

    if (!entry) {
      return next(build("Not known", 404));
    }

    entry.exercises = req.body.exercises;
    entry.foods = req.body.foods;

    entry.save(function (saveErr, savedEntry) {
      if (saveErr) {
        return next(saveErr);
      }

      return res.json(savedEntry);
    });
  });
});

module.exports = router;
