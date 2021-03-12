// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function(cb) {
  gulp
    .src('assets/css/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css'));
  cb();
});


gulp.task(
  'default',
  gulp.series('sass', function(cb) {
    gulp.watch('assets/css/main.scss', gulp.series('sass'));
    cb();
  })
);