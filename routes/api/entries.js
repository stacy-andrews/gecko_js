var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Order = require("../../models/diaryDay.js");
var _ = require("lodash");

var moment = require("moment");

function buildSelectedOptions(availableOptions, selectedProteins) {
  return _.filter(availableOptions, function(o) { 
    return _.includes(selectedProteins, o.protein);
  });
}

router.get("/:date", function(req, res, next) {
  var today = moment(req.params.date);

  if(!today.isValid()) {
    var err = new Error("Invalid date");
    err.status = 400;

    return next(err);
  }

  res.json({today: today});
});

// router.post("/today", function(req, res, next) {
//   var options;

//   var order = new Order(req.body);

//   order.user = req.user.email;
//   order.practice = req.user.customData.practiceId;

//   order.status = "Pending";

//   options = Calculator.getOptions(order.pet.weight, order.pet.activityLevel, order.course);
//   order.selectedOptions = buildSelectedOptions(options, req.body.selectedProteins);
  
//   order.save(function (err, order) {
//     if (err) {
//       return res.send(err);
//     }

//     res.send({ id: order.id });
//   });
  
// });

// router.put("/:id", function(req, res, next) {
//   return Order.findById(req.params.id, function (err, order) {

//     if (!err) {
//       order.status = req.body.status;

//       order.save(function (err, order) {
//         if (err) {
//           return res.send(err);
//         }

//         mailer.send(order);
        
//         res.send({ id: order.id });
//       });
//     } else {
//       return res.json(err);
//     }
//   });
// });



module.exports = router;
