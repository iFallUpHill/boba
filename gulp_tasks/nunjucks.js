const gulp 				= require('gulp'),
	  nunjucks 		  	= require('gulp-nunjucks'),
	  plumber         	= require('gulp-plumber'),
	  prism    			= require('gulp-prism'),
	  gulpif            = require('gulp-if'),
	  browserSync       = require('browser-sync');

module.exports = (gulp, config) => {

	const isDist = config.flags.isDist;
	const docs =  isDist ? true : config.flags.docs;

	return () => {
		if (docs) {
			const version = config.flags.version;
			const highlight =  isDist ? true : config.flags.highlight;
			let versionNumber = require('../package.json').version;

			if (version) {
				let versionDigits = versionNumber.split('.');

				switch (version) {
					case "major":
						versionDigits[0] = (parseInt(versionDigits[0]) + 1).toString();
						break;
					case "minor":
						versionDigits[1] = (parseInt(versionDigits[1]) + 1).toString();
						break;
					case "patch":
						versionDigits[2] = (parseInt(versionDigits[2]) + 1).toString();
						break;
					default:
						break;
				}

				versionNumber = versionDigits.join('.');		
			}

			if (isDist) {
				console.log(" ");
				console.log("******************************");
				console.log("* Production Build Detected! *");
				console.log("* Did you version correctly? *");				
				console.log("******************************");
				console.log(" ");
				console.log("Building docs for version", versionNumber);
				console.log(" ");
			}

			return gulp.src(config.src.html, { base : './src' })
						.pipe(plumber({
							errorHandler: err => {
								console.error(err);
							}
						}))
						.pipe(nunjucks.compile({versionNumber: versionNumber}))
						.pipe(gulpif(highlight, prism()))
						.pipe(gulp.dest(config.dist.html))
		}
	};
};