const gulp = require('gulp');
const removeCode = require('gulp-remove-code');

gulp.task('index-remove-pro', () => {
  return gulp.src('./src/index.js')
    .pipe(removeCode({ free: true }))
    .pipe(gulp.dest('./src'))
});

gulp.task('router-remove-pro', () => {
  return gulp.src('./src/router/index.js')
    .pipe(removeCode({ free: true }))
    .pipe(gulp.dest('./src/router'))
});