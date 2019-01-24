const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

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
