var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var imageminpPNGquant = require('imagemin-pngquant');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var paths = {
  style: {
    src: 'src/styles/main.scss',
    dest: 'assets/style/',
    watch: 'src/styles/**/*.scss'
  },
  script: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/script/'
  },
  image: {
    src: 'src/images/**/*.{gif,png,jpg,svg}',
    dest: 'assets/image/'
  }
};

gulp.task('clean', function() {
  return del(['assets']);
});

gulp.task('browser-sync', () => {
  browserSync.init({
        server: "./"
    });
});

gulp.task('style', function () {
  return gulp.src(paths.style.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.style.dest))
    .pipe(browserSync.stream());
});

gulp.task('script', function() {
  return gulp.src(paths.script.src)
  .pipe(uglify())
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest(paths.script.dest))
  .pipe(browserSync.stream());
});

gulp.task('image', function () {
  return gulp.src(paths.image.src)
  .pipe(imagemin([
        imageminpPNGquant({
          speed: 1,
          quality: [0.95, 1]
        }),
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 70, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
        })
      ]))
      .pipe(gulp.dest(paths.image.dest))
      .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch(paths.style.watch, gulp.series('style'));
  gulp.watch(paths.script.src, gulp.series('script'));
  gulp.watch(paths.image.src, gulp.series('image'));
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('clean', gulp.parallel('style', 'script', 'image', 'browser-sync', 'watch')));

