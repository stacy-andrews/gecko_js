
var routes = require("../routes/index");

var diaryDays = require("../routes/api/entries");
var foods = require("../routes/api/foods");
var favourites = require("../routes/api/favourites");

function initialise(app) {
  app.use("/", routes);
  app.use("/api/diaryEntries/", diaryDays);
  app.use("/api/foods/", foods);
  app.use("/api/favourites/", favourites);
}

module.exports = initialise;