"use strict";

var request = require("superagent");
// var OptionsServerActionCreators = require("../actions/OptionsServerActionCreators");

function fetch() {
  request("/api/diaryDays/today")
    .end(function(err, res) {
      if (res.ok) {
        //OptionsServerActionCreators.receiveOptions(res.body);
      } else {
        console.log("Oh no! error " + res.text);
      }
    });
}


var Options = {
  get: fetchCosts,
};

module.exports = Options;