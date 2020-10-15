/* global G */
module.exports = () => {

  const pngFilter = G.filter('**/*.png', { restore: true })

  G.gulp.task('favicon', function () {
    return G.gulp.src('app/static/images/favicon/**/*.*')
      .pipe(pngFilter)
      .pipe(G.if(!G.isDevelopment, G.responsive({
        '**/favicon*.png': [
          {
            width: 100 + '%',
            rename: 'favicon.png'
          },
          {
            width: 16,
            rename: 'favicon-16x16.png'
          },
          {
            width: 32,
            rename: 'favicon-32x32.png'
          },
          {
            width: 96,
            rename: 'favicon-96x96.png'
          },
          {
            width: 57,
            rename: 'apple-icon-57x57.png'
          },
          {
            width: 60,
            rename: 'apple-icon-60x60.png'
          },
          {
            width: 72,
            rename: 'apple-icon-72x72.png'
          },
          {
            width: 76,
            rename: 'apple-icon-76x76.png'
          },
          {
            width: 114,
            rename: 'apple-icon-114x114.png'
          },
          {
            width: 120,
            rename: 'apple-icon-120x120.png'
          },
          {
            width: 144,
            rename: 'apple-icon-144x144.png'
          },
          {
            width: 144,
            rename: 'ms-icon-144x144.png'
          },
          {
            width: 152,
            rename: 'apple-icon-152x152.png'
          },
          {
            width: 180,
            rename: 'apple-icon-180x180.png'
          },
          {
            width: 192,
            rename: 'apple-icon-192x192.png'
          },
        ]
      },
        {
          withoutEnlargement: false,
          progressive: true,
          withMetadata: false,
          compressionLevel: 8,
errorOnUnusedConfig: false
        })))


      .pipe(G.if(!G.isDevelopment, G.imagemin([
        G.imageminPngquant({
          quality: [0.5, 0.6], speed: 5
        })
      ])))
      .pipe(pngFilter.restore)

      .pipe(G.gulp.dest('dist/images/favicon'))
  })

}
