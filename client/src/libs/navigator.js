"use strict";

var moment = require("moment");

var navigator = function(settings) {
  var currentDate = moment();
  currentDate.startOf("day");

  if(settings.year) {
    currentDate = moment({
      year: settings.year,
      month: settings.month - 1,
      day: settings.day
    });
  }

  function buildUrl(date) {
    if(!date) {
      return "#/entry/";
    }

    return "#/entry/" + date.format("YYYY/MM/DD");
  }

  function isToday(otherDate) {
    var today = moment();
    today.startOf("day");

    return otherDate.diff(today, "days");
  }

  return {
    previousUrl: function() {
      var yesterday = currentDate.clone();
      yesterday.add(-1, "days");

      return buildUrl(yesterday);
    },
    nextUrl: function() {
      var tomorrow = currentDate.clone();
      tomorrow.add(1, "days");

      if (isToday(tomorrow) >= 0) {
        return buildUrl();
      }

      return buildUrl(tomorrow);
    }
  };
};

module.exports = navigator;
