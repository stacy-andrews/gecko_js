"use strict";

var express = require("express");
var router = express.Router();

var favourties = {
  breakfast: [
    {
      description: "coco pops",
      quantity: 4
    },
    {
      description: "rice milk",
      quantity: 1
    },
    {
      description: "coffee (rice milk)",
      quantity: 1
    }
  ]
};

router.get("/:id", function(req, res, next) {
  return res.json(favourties[req.params.id]);
});

module.exports = router;
