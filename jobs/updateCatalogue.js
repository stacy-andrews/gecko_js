"use strict";

var Entry = require("../models/diaryDay.js");
var CatalogueFood = require("../models/catalogueFood.js");
var initialiser = require("../initialisers/mongo");

initialiser.initialise();

function clearCatalogue() {
  CatalogueFood.remove({}, function(err) {
    if(err) {
      console.log(err);
    }
  });
}

function saveFood(food) {
  var catalogueFood = new CatalogueFood(food);

  var upsertData = catalogueFood.toObject();
  delete upsertData._id;

  CatalogueFood
    .update({ description: upsertData.description },
            upsertData,
            { upsert: true })
    .exec(function(err, cf) {
      if(err) {
        console.log("Error - ");
        console.log(err);
      }

      console.log(cf);
    });
}

function populateCatalogue() {
  Entry
    .find({
            foods: {
              $elemMatch: { unitEnergy: { $ne: null } }
            }
          })
    .exec(function(err, entries) {
      if(err) { console.log(err); }

      entries.forEach(function(e) {
        e.foods.forEach(saveFood);
      });
    });
}

clearCatalogue();
populateCatalogue();
