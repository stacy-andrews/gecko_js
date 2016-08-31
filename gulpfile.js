var gulp = require("gulp");
var browserify = require("browserify");  // Bundles JS.
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");
var buffer = require("vinyl-buffer");
var babel = require("babelify");

var options = {
  files: [
    "./client/**/*.js",
    "!./public/javascripts/bundle.js",
    "!./public/javascripts/vendor/*.js"
  ]
};

gulp.task("js", function() {
  browserify(["./client/app.js"],
            {
              paths: ["./client/"],
              debug: true
            })
    .transform(babel)
    .transform(reactify)
    .bundle()
    .on("error", function(err){ console.log(err.message); })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public/javascripts"));
});

gulp.task("lint", function() {
  return gulp.src(options.files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("prod", function() {
  browserify(["./client/app.js"],
    {
      paths: ["./client/"],
      fullPaths: true
    })
    .transform(babel)
    .transform(reactify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./public/javascripts"));
});


gulp.task("watch", function() {
  gulp.watch(options.files, ["js", "lint"]);
});

gulp.task("default", ["watch", "js", "lint"]);
