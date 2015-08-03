"use strict";

var gulp = require("gulp");
var browserify = require("browserify");  // Bundles JS.
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var eslint = require("gulp-eslint");

var options = {
  files: ["./public/javascripts/**/*.js", "!./public/javascripts/bundle.js"]
};

gulp.task("js", function() {
  browserify(["./public/javascripts/app.js"],
            {
              paths: ["./public/javascripts/"],
              debug: true
            })
    .transform(reactify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public/javascripts"));
});

gulp.task("lint", function() {
  return gulp.src(options.files)
        .pipe(eslint({
            "globals": {
              "require": true
            }
          }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("release-js", function() {
  browserify(["./public/javascripts/app.js"],
            {
              paths: ["./public/javascripts/"]
            })
    .transform(reactify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public/javascripts"));
});

gulp.task("watch", function() {
  gulp.watch(options.files, ["js", "lint"]);
});

gulp.task("default", ["watch", "js", "lint"]);
