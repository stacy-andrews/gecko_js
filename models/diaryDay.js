var mongoose = require('mongoose');

var diaryDaySchema = new mongoose.Schema({
  date: Date,
  note: String,
  updated_at: { type: Date, default: Date.now },
  exercises: [ {
    time: String,
    energy: Number,
    duration: Number,
    description: String
    }
  ],
  foods: [ {
    time: String,
    unitEnergy: Number,
    quantity: Number,
    carbohydrate: Number,
    fat: Number,
    protein: Number,
    description: String,
    section: String
  }
  ],
  measurements: [
    {
      chest: Number,
      stomach: Number,
      thigh: Number
    }
  ]
});

module.exports = mongoose.model('DiaryDay', diaryDaySchema);