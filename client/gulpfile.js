const gulp = require("gulp");
const browserify = require("browserify");  // Bundles JS.
const reactify = require("reactify");
const source = require("vinyl-source-stream");
const eslint = require("gulp-eslint");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const babel = require("babelify");

const options = {
  files: [
    "./src/**/*.js",
    "./spec/**/*.spec.js",
  ]
};

gulp.task("js", function() {
  browserify(["./src/app.js"],
            {
              paths: ["./src/"],
              debug: true
            })
    .transform(babel)
    .transform(reactify)
    .bundle()
    .on("error", function(err){ console.log(err.message); })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("../public/javascripts"));
});

gulp.task("lint", function() {
  return gulp.src(options.files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// gulp.task("test", function() {
//   return gulp.src("./spec/**/*.spec.js")
//         .pipe(mocha()); 
// });

gulp.task("prod", function() {
  browserify(["./src/app.js"],
    {
      paths: ["./src/"],
      fullPaths: true
    })
    .transform(babel)
    .transform(reactify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("../public/javascripts"));
});

gulp.task("watch", function() {
  gulp.watch(options.files, ["js", "lint"]);
});

gulp.task("default", ["watch", "js", "lint"]);
