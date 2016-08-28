import request from "superagent";

import DailyEntryServerActionCreators from "../actions/DailyEntryServerActionCreators";

export function get(date) {
  request("api/diaryEntries/" + date.format("YYYY-MM-DD"))
    .end(function(err, res) {
      if(err) { DailyEntryServerActionCreators.receiveNotFoundEntry(date); }

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

export function save(entry, date) {
  build(entry.id, date)
    .send(entry)
    .set("Accept", "application/json")
    .end(function(err, res){
      if(err) { //console.log("Oh no! error " + res.text); 
      }

      if (res.ok) {
        DailyEntryServerActionCreators.receiveCreatedEntry(res.body);
      } else {
        // console.log("Oh no! error " + res.text);
      }
   });
}
