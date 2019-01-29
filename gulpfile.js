const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const eslint = require("gulp-eslint");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const prettyError = require("gulp-prettyerror");

// Task to compile and minifying Sass

gulp.task("sass", function() {
  return gulp
    .src("sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("build/css"))
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("build/css"));
});
gulp.task("lint", function() {
  return (
    gulp
      .src(["js/*.js"])
      // Also need to use it here...
      .pipe(prettyError())
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  );
});

gulp.task(
  "scripts",
  gulp.series("lint", function() {
    return gulp
      .src("js/*.js")
      .pipe(terser())
      .pipe(
        rename({
          extname: ".min.js"
        })
      )
      .pipe(gulp.dest("build/js"));
  })
);
// Task to watch for changes to CSS files
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("scripts"));
  done();
});

// Load browsersync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on("change", browserSync.reload);

  done();
});

// Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));
