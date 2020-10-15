/*global G */
module.exports = () => {
	G.gulp.task('build:sprite', function () {

		const pngFilter = G.filter('**/*.png', { restore: true })
		const svgFilter = G.filter('**/*.svg', { restore: true })

		return G.gulp.src('app/static/images/icons/*.*')
			.pipe(svgFilter)
			.pipe(G.if(!G.isDevelopment, G.svgMin()))
			.pipe(G.spriteSvg({
				mode: {
					stack: {
						sprite: "../sprite.svg"
					}
				},
			}
			))
			.pipe(svgFilter.restore)
			
			.pipe(pngFilter)
			.pipe(G.spriteSmith({
				imgName: 'sprite.png',
				cssName: '../../../app/static/scss/utils/_sprite.scss'
			}))
			.pipe(pngFilter.restore)
			.pipe(G.gulp.dest('dist/images/icons'))
	})
	
	G.gulp.task('sprite:webp', function() {
		return G.gulp.src('dist/images/icons/*.png')
			.pipe(G.webp())
			.pipe(G.gulp.dest('dist/images/icons'))
	})

	G.gulp.task('icon', G.gulp.series('build:sprite', 'sprite:webp'))
}