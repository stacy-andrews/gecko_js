var mongoose = require("mongoose");

var catalogueFoodSchema = new mongoose.Schema({
  updatedAt: { type: Date, default: Date.now },
  unitEnergy: Number,
  carbohydrate: Number,
  fat: Number,
  protein: Number,
  description: String
});

module.exports = mongoose.model("CatalogueFood", catalogueFoodSchema);
