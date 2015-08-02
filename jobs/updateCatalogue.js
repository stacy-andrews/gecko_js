"use strict";

var Entry = require("../models/diaryDay.js");
var CatalogueFood = require("../models/catalogueFood.js");
var initialiser = require("../initialisers/mongo");

initialiser.initialise();

CatalogueFood.remove({}, function(err) {
  if(err) {
    console.log(err);
  }
});

Entry.find({ foods: {$elemMatch: { unitEnergy: { $ne: null } } } })
  .exec(function(err, entries) {
    console.log(entries);
    entries.forEach(function(e) {
      e.foods.forEach(function(food) {
      var catalogueFood = new CatalogueFood(food);

      catalogueFood.save(function(err, createdFood) {
        console.log(createdFood);
      });
    });

    });
  });
