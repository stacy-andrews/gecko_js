var mongoose = require("mongoose");

function supplant(item, o) {
    return item.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}

function getConnection() {
  let user = process.env.MONGODB_USER || "gecko";
  let password = process.env.MONGODB_PASSWORD || "6CWLV8PQCB5vZgP6XAnDnuQNPJ7p";
  let server = process.env.MONGODB_SERVER || "ds033307.mongolab.com:33307";
  let name = process.env.MONGODB_NAME || "gecko_dev";

  return `mongodb://${user}:${password}@${server}/${name}`;
}

function initialise() {
  mongoose.connect(getConnection());
}

module.exports = initialise;