const gulp = require('gulp'),
    terser = require('gulp-terser'),
    rename = require('gulp-rename');
gulp.task('scripts', function(){
  return gulp.src('./js/*.js')
    .pipe(terser())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
});
gulp.task('say_hello', function(done) {
    console.log('Hello!');
  done();
});
gulp.task('default', gulp.parallel('say_hello', 'scripts');
