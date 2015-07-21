"use strict";

var AppDispatcher = require("../dispatcher/YPetVetDispatcher");

var YPetVetActions = {
  save: function() {
    AppDispatcher.dispatch({
      actionType: "save"
    });
  }
};

module.exports = YPetVetActions;
