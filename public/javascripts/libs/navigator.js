"use strict";

var moment = require("moment");

var navigator = function(settings) {
  var date = moment();
  date.startOf('day');

  if(settings.year) {
    date = moment({
      year: settings.year,
      month: settings.month - 1,
      day: settings.day
    });
  }

  function buildUrl(date) {
    return "#/entry/" + date.format("YYYY/MM/DD");
  }

  function isToday(otherDate) {
    var date = moment();
    date.startOf('day');

    return otherDate.diff(date, 'days');
  }

  return {
    previousUrl: function() {
      var yesterday = date.clone();
      yesterday.add(-1, "days");

      return buildUrl(yesterday);
    },
    nextUrl: function() {
      var tomorrow = date.clone();
      tomorrow.add(1, "days");

      console.log(isToday(tomorrow));

      if (isToday(tomorrow) >= 0) {
        return "#/entry/";
      }

      return buildUrl(tomorrow);
    }
  };
};

module.exports = navigator;
