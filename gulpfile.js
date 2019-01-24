const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");

// eslint

gulp.task("lint", () => {
  return gulp
    .src(["./js/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Terser

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

// Task to minify CSS
gulp.task("css", function() {
  return gulp
    .src("./css/*.css")
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});

// Task to watch for changes to CSS files
gulp.task("watch", function(done) {
  gulp.watch("css/*.css", gulp.series("css"));
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

  gulp.watch("build/css/*.css").on("change", browserSync.reload);

  done();
});

// Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));
