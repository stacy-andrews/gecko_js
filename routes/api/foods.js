"use strict";

var express = require("express");
var router = express.Router();

var CatalogueFood = require("../../models/catalogueFood.js");

router.get("", function(req, res, next) {
  var regexp = new RegExp(req.query.q, "gi");

  CatalogueFood
    .find({ description: regexp })
    .exec(function(err, foods) {
      if(err) {
        return next(err);
      }

      return res.json(foods);
    });
});

module.exports = router;
