const gulp = require('gulp')
const scss = require('gulp-sass')
const scssFileDir = './src/style/*.scss'
gulp.task('scss', () => {
  return gulp.src(scssFileDir)
         .pipe(scss())
         .pipe(gulp.dest('./dist'))
})
gulp.task('default', () => {
  gulp.watch(scssFileDir, ['scss'])
})
