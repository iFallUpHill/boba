const gulp 				= require('gulp'),
	  nunjucks 		  	= require('gulp-nunjucks'),
	  plumber         	= require('gulp-plumber'),
	  prism    			= require('gulp-prism'),
	  gulpif            = require('gulp-if'),
	  browserSync       = require('browser-sync');
	  onError         	= require('./helpers/onError.js');

const versionNumber   	= require('../package.json').version;

module.exports = (gulp, config) => {

	const isDist = config.flags.isDist;
	const docs =  isDist ? true : config.flags.docs;
	const highlight =  isDist ? true : config.flags.highlight;

	return () => {
		if (docs) {
			return gulp.src(config.src.html, { base : './src' })
					.pipe(plumber({
						errorHandler: onError
					}))
					.pipe(nunjucks.compile({versionNumber: versionNumber}))
					.pipe(gulpif(highlight, prism()))
					.pipe(gulp.dest(config.dist.html))
					.pipe(browserSync.reload({stream: true}))
		}
	};
};