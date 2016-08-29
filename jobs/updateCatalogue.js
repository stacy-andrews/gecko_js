var Entry = require("../models/diaryDay.js");
var CatalogueFood = require("../models/catalogueFood.js");
var mongoInitialiser = require("../initialisers/mongo");
var q = require('q');

function clearCatalogue() {
  var deferred = q.defer();

  CatalogueFood.remove({}, function(err) {
    if(err) {
      console.log(err);
      deferred.reject(new Error(err));
    } else {
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function saveFood(food) {
  var deferred = q.defer();

  var catalogueFood = new CatalogueFood(food);

  var upsertData = catalogueFood.toObject();
  delete upsertData._id;  // no-underscore-dangle

  CatalogueFood
    .update({ description: upsertData.description },
            upsertData,
            { upsert: true })
    .exec(function(err, cf) {
      if(err) {
        console.log("Error - ");
        console.log(err);
        deferred.reject(new Error(err));
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
}

function populateCatalogue() {
  var deferred = q.defer();

  Entry
    .find({
            foods: {
              $elemMatch: { unitEnergy: { $ne: null }, nutrition: { $ne: null } }
            }
          })
    .exec(function(err, entries) {
      if(err) {
        console.log(err);
        deferred.reject(new Error(err));
      }

      var items = [];

      entries.forEach(function(e) {
        e.foods.forEach(function(f) {
          items.push(saveFood(f));
        });
      });

      q.allSettled(items)
        .then(function() {
          deferred.resolve();
        });

    });

    return deferred.promise;
}

module.exports = function(done) {
  clearCatalogue()
    .then(populateCatalogue)
    .then(function() {
      done();
    });
}

