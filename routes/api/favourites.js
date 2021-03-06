"use strict";

var express = require("express");
var router = express.Router();

var favourties = {
  breakfast: [
    {
      description: "weet bix",
      unitEnergy: 474,
      quantity: 3,
      section: "breakfast",
      nutrition: {
        carbohydrate: 20.9,
        fat: 1.1,
        protein: 3.7
      }
    },
    {
      description: "almond milk",
      unitEnergy: 318,
      quantity: 1,
      section: "breakfast",
      nutrition: {
        carbohydrate: 7,
        fat: 4.5,
        protein: 1.8
      }
    },
    {
      description: "coffee (almond milk)",
      unitEnergy: 318,
      quantity: 1,
      section: "breakfast",
      nutrition: {
        carbohydrate: 7,
        fat: 4.5,
        protein: 1.8
      }
    }
  ],
  lunch: [
    {
      description: "carrot",
      unitEnergy: 125.52,
      quantity: 2,
      section: "lunch"
    },
    {
      description: "cherry tomato (punnet)",
      unitEnergy: 188,
      quantity: 1,
      section: "lunch"
    },
    {
      description: "bread (gluten free)",
      unitEnergy: 840,
      quantity: 2,
      section: "lunch"
    }
  ],
  dinner: [
    {
      description: "carrot",
      unitEnergy: 125.52,
      quantity: 2,
      section: "dinner"
    },
    {
      description: "cherry tomato (punnet)",
      unitEnergy: 188,
      quantity: 1,
      section: "dinner"
    },
    {
      description: "mini bites",
      unitEnergy: 351,
      quantity: 4,
      section: "dinner"
    },
    {
      description: "ham (100g)",
      unitEnergy: 677,
      quantity: 2,
      section: "dinner"
    },
    {
      description: "roast beef (100g)",
      unitEnergy: 677,
      quantity: 2,
      section: "dinner"
    }
  ]
};

router.get("/:id", function(req, res, next) {
  return res.json(favourties[req.params.id]);
});

module.exports = router;
