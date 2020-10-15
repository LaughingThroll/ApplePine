/* global G*/
module.exports = () => {
  G.gulp.task('fonts', function () {
    return G.gulp.src('app/static/fonts/**/*.*')
      .pipe(G.gulp.dest('dist/fonts'))
  })
  G.gulp.task('manifest', function () {
    return G.gulp.src('app/*.json')
      .pipe(G.gulp.dest('dist/'))
  })
  G.gulp.task('export', G.gulp.parallel('manifest', 'fonts'))

}