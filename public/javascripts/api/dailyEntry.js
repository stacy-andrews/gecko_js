"use strict";

var request = require("superagent");
var moment = require("moment");

var DailyEntryServerActionCreators = require("../actions/DailyEntryServerActionCreators");

function fetch(date) {
  request("api/diaryEntries/" + date.format("YYYY-MM-DD"))
    .end(function(err, res) {
      if (res.ok) {
        DailyEntryServerActionCreators.receiveEntry(res.body);
      } else {
        DailyEntryServerActionCreators.receiveNotFoundEntry(date);
      }
    });
}

function build(id, date) {
  if (id) {
    return request
      .put("api/diaryEntries/" + date.format("YYYY-MM-DD"));
  }

  return request
          .post("api/diaryEntries/" + date.format("YYYY-MM-DD"));
}

function save(entry, date) {
  build(entry.id, date)
    .send(entry)
    .set("Accept", "application/json")
    .end(function(err, res){
      if(err) {
        
      }

      if (res.ok) {
        DailyEntryServerActionCreators.receiveCreatedEntry(res.body);
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
