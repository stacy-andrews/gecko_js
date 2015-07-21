var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Calculator = require('../models/optionsCalculator.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = Calculator.getOptions(req.query.weight, req.query.activity);

  res.json(options);
});


module.exports = router;
