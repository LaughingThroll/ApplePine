/*global G */
const optionsResponsive = {
  withoutEnlargement: false,
  progressive: !G.development,
  withMetadata: false,
  quality: 60,
  compressionLevel: G.development ? 0 : 8,
  errorOnUnusedConfig: false

}

function responsiveSizes(format) {
  let build = {
    [`**/*.${format}`]: [
      {
        width: 100 * 1 + '%'
      },
      {
        width: 100 * 1.25 + '%',
        rename: { suffix: '@2x' }
      },
      {
        width: 100 * 1.5 + '%',
        rename: { suffix: '@3x' }
      }
    ]
  }

  let dev = {
    [`**/*.${format}`]: [
      {
        width: 100 * 1 + '%'
      },
      {
        width: 100 * 1 + '%',
        rename: { suffix: '@2x' }
      },
      {
        width: 100 * 1 + '%',
        rename: { suffix: '@3x' }
      }
    ]
  }
  return G.development ? dev : build
}

function responsive(format) {
  return G.responsive(responsiveSizes(format), optionsResponsive)
}

module.exports = () => {
  // This rebuild because match .{jpeg, jpg, png, webp} bad worked
  const jpegPath = 'app/static/images/content/**/*.jpeg'
  const jpgPath = 'app/static/images/content/**/*.jpg'
  const pngPath = 'app/static/images/content/**/*.png'
  const webpPath = 'app/static/images/content/**/*.webp'
  const svgPath = 'app/static/images/content/**/*.svg'
  // const allFormat = 'app/static/images/content/**/*.{webp, jpeg, jpg, png, webp}'

  const paths = [pngPath, jpgPath, jpegPath, webpPath]

  const destPath = 'dist/images/content'

  G.gulp.task('jpeg', function () {
    return G.gulp.src(jpegPath)
      .pipe(responsive('jpeg'))
      .pipe(G.if(!G.isDevelopment, G.imagemin([
        G.imageminMozjpeg({
          quality: 60, progressive: true, tune: "ms-ssim"
        })
      ])))
      .pipe(G.gulp.dest(destPath))
  })

  G.gulp.task('jpg', function () {
    return G.gulp.src(jpgPath)
      .pipe(responsive('jpg'))
      .pipe(G.if(!G.isDevelopment, G.imagemin([
        G.imageminMozjpeg({
          quality: 60, progressive: true, tune: "ms-ssim"
        })
      ])))

      .pipe(G.gulp.dest(destPath))
  })


  G.gulp.task('png', function () {
    return G.gulp.src(pngPath)
      .pipe(responsive('png'))
      .pipe(G.if(!G.isDevelopment, G.imagemin([
        G.imageminPngquant({
          quality: [0.5, 0.6], speed: 5
        })
      ])))

      .pipe(G.gulp.dest(destPath))
  })



  G.gulp.task('svg', function () {
    return G.gulp.src(svgPath)
      .pipe(G.if(!G.isDevelopment, G.svgMin()))
      .pipe(G.gulp.dest(destPath))
  })

  G.gulp.task('webp', function () {
    return G.gulp.src(paths)
      .pipe(G.webp({
        quality: 90,
        method: G.isDevelopment ? 0 : 6
      }))
      .pipe(responsive('webp'))
      .pipe(G.gulp.dest(destPath))
  })

  G.gulp.task('content', G.gulp.series('jpeg', 'png', 'jpg', 'webp', 'svg'))
}    
