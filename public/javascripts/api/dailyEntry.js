"use strict";

var request = require("superagent");
var moment = require("moment");

var DailyEntryServerActionCreators = require("../actions/DailyEntryServerActionCreators");

function fetch() {
  var today = moment();

  request("api/diaryEntries/" + today.format("YYYY-MM-DD"))
    .end(function(err, res) {
      if (res.ok) {
        DailyEntryServerActionCreators.receiveEntry(res.body);
      } else {
        console.log("Oh no! error " + res.text);
      }
    });
}

function build(id) {
  var today = moment();

  if (id !== "") {
    return request
      .put("api/diaryEntries/" + today.format("YYYY-MM-DD"));
  }

  return request
          .post("api/diaryEntries/" + today.format("YYYY-MM-DD"));
}

function save(entry) {
  build(entry.id)
    .send(entry)
    .set("Accept", "application/json")
    .end(function(err, res){
      if (res.ok) {
        //OrderServerActionCreators.receiveCreatedOrder(res.body);
      } else {
        console.log("Oh no! error " + res.text);
      }
   });
}


var Options = {
  get: fetch,
  save: save
};

module.exports = Options;
