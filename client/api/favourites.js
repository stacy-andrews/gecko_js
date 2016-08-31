import request from "superagent";

import favouritesServerActionCreators from "../actions/favouritesServerActionCreators";

function fetch(name) {
  request("api/favourites/" + name)
    .end(function(err, res) {
      if(err) {
       favouritesServerActionCreators.receiveNotFountFavourites(name);
      }

      if (res.ok) {
        favouritesServerActionCreators.receiveFavourites(res.body);
      } else {
        favouritesServerActionCreators.receiveNotFountFavourites(name);
      }
    });
}

export default {
  get: fetch
};
