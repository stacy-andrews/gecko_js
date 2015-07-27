"use strict";

var Entry = require("../models/diaryDay.js");
var CatalogueFood = require("../models/catalogueFood.js");
var initialiser = require("../initialisers/mongo");


initialiser.initialise();

console.log("hello world");

Entry.find()
  .exec(function(err, entries) {

    entries.forEach(function(e) {
      e.foods.forEach(function(food) {
      var catalogueFood = new CatalogueFood(food);

      catalogueFood.save(function(err, createdFood) {
        console.log(createdFood);
      });
    });

    });
  });
