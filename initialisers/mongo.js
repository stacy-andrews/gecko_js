"use strict";

var mongoose = require("mongoose");

function supplant(item, o) {
    return item.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}

function initialise() {
  var connection = supplant("mongodb://{user}:{password}@{server}/{name}",
                      {
                        user: process.env.MONGODB_USER || "gecko",
                        password: process.env.MONGODB_PASSWORD || "6CWLV8PQCB5vZgP6XAnDnuQNPJ7p",
                        server: process.env.MONGODB_SERVER || "ds033307.mongolab.com:33307",
                        name: process.env.MONGODB_NAME || "gecko_dev"
                      });

  // var connection = supplant("mongodb://192.168.59.103/{name}",
  //                     {
  //                       user: process.env.MONGODB_USER || "gecko",
  //                       password: process.env.MONGODB_PASSWORD || "6CWLV8PQCB5vZgP6XAnDnuQNPJ7p",
  //                       server: process.env.MONGODB_SERVER || "ds033307.mongolab.com:33307",
  //                       name: process.env.MONGODB_NAME || "gecko_dev"
  //                     });

  console.log("CONNECTION - " + connection);

  mongoose.connect(connection);
}

var Mongo = {
  initialise: function() {
    initialise();
  }
};

module.exports = Mongo;