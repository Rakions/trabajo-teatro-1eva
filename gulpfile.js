const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const watch = require("gulp-watch");
const cssFiles = "./web/src/styles/*.scss";
const jsFiles = "./web/src/services/*.js";

gulp.task("compiler-sass", function (done) {
  gulp
    .src(cssFiles)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./web/src/styles/main/"));
  done();
});

gulp.task("scripts", function (done) {
  gulp
    .src("./web/src/services/*.js")
    .pipe(concat("main-min.js"))
    .pipe(minify())
    .pipe(gulp.dest("./web/src/services/main/"));
  done();
});

gulp.task("watch", function () {
  watch(cssFiles, gulp.series("compiler-sass"));
  watch(jsFiles, gulp.series("scripts"));
});
