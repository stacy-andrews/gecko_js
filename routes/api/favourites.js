"use strict";

var express = require("express");
var router = express.Router();

var favourties = {
  breakfast: [
    {
      description: "coco pops",
      unitEnergy: 480,
      quantity: 4
    },
    {
      description: "rice milk",
      unitEnergy: 522,
      quantity: 1
    },
    {
      description: "coffee (rice milk)",
      unitEnergy: 522,
      quantity: 1
    }
  ],
  lunch: [
    {
      description: "carrot",
      unitEnergy: 125.52,
      quantity: 2
    },
    {
      description: "cherry tomato (punnet)",
      unitEnergy: 188,
      quantity: 1
    },
    {
      description: "bread (gluten free)",
      unitEnergy: 840,
      quantity: 2
    }
  ],
  dinner: [
    {
      description: "carrot",
      unitEnergy: 125.52,
      quantity: 2
    },
    {
      description: "cherry tomato (punnet)",
      unitEnergy: 188,
      quantity: 1
    },
    {
      description: "mini bites",
      unitEnergy: 271,
      quantity: 4
    },
    {
      description: "ham (100g)",
      unitEnergy: 677,
      quantity: 2
    },
    {
      description: "roast beef (100g)",
      unitEnergy: 677,
      quantity: 2
    }
  ]
};

router.get("/:id", function(req, res, next) {
  return res.json(favourties[req.params.id]);
});

module.exports = router;
