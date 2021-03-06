"use strict";

var mongoose = require("mongoose");

var diaryDaySchema = new mongoose.Schema({
  date: Date,
  note: String,
  updatedAt: { type: Date, default: Date.now },
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
    nutrition: {
      carbohydrate: Number,
      fat: Number,
      protein: Number
    },
    description: String,
    section: String
  }
  ],
  measurements:
    {
      chest: Number,
      stomach: Number,
      thigh: Number
    }
});

diaryDaySchema.virtual("id").get(function(){
    return this._id.toHexString();
});

diaryDaySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("DiaryDay", diaryDaySchema);
