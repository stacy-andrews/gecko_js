var mongoose = require("mongoose");
var mongoConnectionString = require("../config/mongo");

function initialise() {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoConnectionString());
}

module.exports = initialise;