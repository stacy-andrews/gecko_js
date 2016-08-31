import request from "superagent";

import dailyEntryServerActionCreators from "../actions/dailyEntryServerActionCreators";

export function get(date) {
  request("api/diaryEntries/" + date.format("YYYY-MM-DD"))
    .end(function(err, res) {
      if(err) { dailyEntryServerActionCreators.receiveNotFoundEntry(date); }

      if (res.ok) {
        dailyEntryServerActionCreators.receiveEntry(res.body);
      } else {
        dailyEntryServerActionCreators.receiveNotFoundEntry(date);
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
        dailyEntryServerActionCreators.receiveCreatedEntry(res.body);
      } else {
        // console.log("Oh no! error " + res.text);
      }
   });
}
