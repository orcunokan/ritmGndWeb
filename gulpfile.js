var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  style: {
    src: 'src/styles/main.scss',
    dest: 'assets/style/'
  },
  script: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/script/'
  },
  image: {
    src: 'src/images/**/*',
    dest: 'assets/image/'
  }
};

gulp.task('clean', function() {
  return del(['assets']);
});

gulp.task('style', function () {
  return gulp.src(paths.style.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10, 
      includePaths: ['.']
    }))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.style.dest));
});

gulp.task('script', function() {
  return gulp.src(paths.script.src)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.script.dest));
});

gulp.task('image', function () {
  return gulp.src(paths.image.src)
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
        })
      ]))
      .pipe(gulp.dest(paths.image.dest));
});

gulp.task('default', gulp.series('clean', 'style', 'script', 'image'));