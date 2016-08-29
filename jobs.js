var Agenda                = require('agenda'),
    mongoConnectionString = require("./config/mongo");
    mongooseInitialise    = require("./initialisers/mongo");
    updatedCatalogueJob   = require("./jobs/updateCatalogue");
    updatedExercisesJob   = require("./jobs/updateExercises");

var agenda = new Agenda({db: {address: mongoConnectionString(), collection: 'tasks'}});

agenda.define('update food catalogue', function(job, done) {
  updatedCatalogueJob(done);
});

agenda.define('update exercises', function(job, done) {
  updatedExercisesJob(done);
});

agenda.on('start', function(job) {
  console.log("Job '%s' starting", job.attrs.name);
});

agenda.on('complete', function(job) {
  console.log("Job '%s' finished", job.attrs.name);
});

agenda.on('ready', function() {
  mongooseInitialise();

  agenda.every('3 minutes', 'update food catalogue');
  agenda.every('3 minutes', 'update exercises');

  agenda.start();
});

// Handles graceful stopping of jobs
function graceful() {
  agenda.stop(function() {
    process.exit(0);
  });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);
