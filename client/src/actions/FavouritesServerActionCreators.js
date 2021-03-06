import AppDispatcher from "../dispatcher/dispatcher";

var FavouritesActionCreators = {

  receiveFavourites: function(favourites) {
    AppDispatcher.dispatch({
      actionType: "favourites_get_completed",
      favourites: favourites
    });
  },

  receiveNotFountFavourites: function(name) {
    AppDispatcher.dispatch({
      actionType: "favourites_get_notfound",
      name: name
    });
  }

};

module.exports = FavouritesActionCreators;
