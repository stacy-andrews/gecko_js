var mongoose = require("mongoose");

var workoutSchema = new mongoose.Schema({
  updatedAt: { type: Date, default: Date.now },
  unitEnergy: Number,
  nutrition: {
    carbohydrate: Number,
    fat: Number,
    protein: Number
  },
  description: String
});

module.exports = mongoose.model("Workout", workoutSchema);
