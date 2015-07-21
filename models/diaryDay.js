var mongoose = require('mongoose');

var diaryDaySchema = new mongoose.Schema({
  date: Date,
  note: String,
  updated_at: { type: Date, default: Date.now },
  exercises: [ {
    time: Date,
    energy: Number,
    duration: Number,
    description: String
    }
  ],
  foods: [ {
    start_time: Date,
    unit_energy: Number,
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