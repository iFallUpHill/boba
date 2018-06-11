const gulp            = require('gulp'),
	  concat          = require('gulp-concat'),
	  plumber         = require('gulp-plumber'),
	  uglify          = require('gulp-uglify'),
	  sourcemaps      = require('gulp-sourcemaps'),
	  eslint          = require('gulp-eslint'),
	  babel           = require('gulp-babel'),
	  gulpif          = require('gulp-if'),
	  stripDebug      = require('gulp-strip-debug'),
	  browserSync     = require('browser-sync');

module.exports = (gulp, config) => {

	const isDist = config.flags.isDist;
	const docs =  isDist ? true : config.flags.docs;

	return () => {
		if (docs) {
			gulp.src(config.src.js_docs)
				.pipe(gulpif(!isDist, sourcemaps.init()))
				.pipe(plumber({
					errorHandler: err => {
						console.error(err);
					}
				}))
				.pipe(gulpif(isDist, stripDebug()))
				.pipe(eslint())
				.pipe(eslint.format())
				.pipe(babel({presets: ['env']}))
				.pipe(gulpif(isDist, uglify()))
				.pipe(concat(config.dist.min_js_docs))
				.pipe(gulpif(!isDist, sourcemaps.write()))
				.pipe(gulp.dest(config.dist.js))
				.pipe(browserSync.reload({stream: true}));
		}
	};
};
