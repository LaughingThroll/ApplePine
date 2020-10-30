/* global G*/ 
module.exports = () => {
  G.gulp.task('styleLibs', function () {
    return G.gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/ion-rangeslider/css/ion.rangeSlider.css'
  
    ])
      .pipe(G.concat('libs.min.css'))
      .pipe(G.cssmin())
      .pipe(G.gulp.dest('dist/css'))
  });
}