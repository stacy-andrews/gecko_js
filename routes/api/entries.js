var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Entry = require("../../models/diaryDay.js");
var _ = require("lodash");

var moment = require("moment");

router.get("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    var err = new Error("Invalid date");
    err.status = 400;

    return next(err);
  }

  var query = Entry.findOne({ "date": { "$eq": today } });

  query.exec(function (err, entry) {
    if (err) {
      var err = new Error("Not known");
      err.status = 404;

      return next(err);
    }

    if (!entry) {
      var err = new Error("Not known");
      err.status = 404;

      return next(err);
    }

    return res.json(entry);
  });

});

router.post("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    var err = new Error("Invalid date");
    err.status = 400;

    return next(err);
  }

  var entry = new Entry(req.body);

  entry.date = today;

  entry.save(function (err, entry) {
    if (err) {
      var error = new Error("Error");
      error.status = 500;
      return next(error);
    }

    return res.json(entry);
  });
});

router.put("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    var err = new Error("Invalid date");
    err.status = 400;

    return next(err);
  }

  var query = Entry.findOne({ "date": { "$eq": today } });

  query.exec(function (err, entry) {
    if (err) {
      var err = new Error("Not known");
      err.status = 404;

      return next(err);
    }

    //todo - update fields here
    entry.exercises = req.body.exercises;
    entry.foods = req.body.foods;

    entry.save(function (err, entry) {
      if (err) {
        var error = new Error("Error");
        error.status = 500;
        error.err = err;
        return next(error);
      }

      return res.json(entry);
    });
  });
});



module.exports = router;
