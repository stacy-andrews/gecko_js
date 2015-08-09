"use strict";

var request = require("superagent");

var FavouritesServerActionCreators = require("../actions/FavouritesServerActionCreators");

function fetch(name) {
  request("api/favourites/" + name)
    .end(function(err, res) {
      if(err) {
        FavouritesServerActionCreators.receiveNotFountFavourites(name);
      }

      if (res.ok) {
        FavouritesServerActionCreators.receiveFavourites(res.body);
      } else {
        FavouritesServerActionCreators.receiveNotFountFavourites(name);
      }
    });
}

var Options = {
  get: fetch
};

module.exports = Options;
