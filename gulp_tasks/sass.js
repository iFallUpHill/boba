const gulp            = require('gulp'),
	  rename          = require('gulp-rename'),
	  plumber         = require('gulp-plumber'),
	  minifyCSS       = require('gulp-cssnano'),
	  sass            = require('gulp-sass'),
	  autoprefixer    = require('gulp-autoprefixer'),
	  uglify          = require('gulp-uglify'),
	  sourcemaps      = require('gulp-sourcemaps'),
	  gulpif          = require('gulp-if'),
	  replace         = require('gulp-replace'),
	  browserSync     = require('browser-sync');


module.exports = (gulp, config) => {

	const isDist = config.flags.isDist;
	const docs =  isDist ? true : config.flags.docs;
	const minify =  isDist ? true : config.flags.minify;
	const buildAll = isDist ? true : config.flags.buildAll;

	return () => {
		// boba-extended.min.css
		// Color helpers, Extended color helpers, Components have color variations
		gulp.src(config.src.sass)
			.pipe(gulpif(!isDist, sourcemaps.init()))
			.pipe(plumber({
				errorHandler: err => {
					console.error(err);
				}
			}))
			.pipe(sass())
			.pipe(rename(config.dist.min_css_extended))
			.pipe(autoprefixer( {
					remove: false,
					browsers: [
						'last 2 versions',
						'> 5%'
					]
				}
			))
			.pipe(gulpif(minify, minifyCSS()))
			.pipe(gulpif(!isDist, sourcemaps.write()))
			.pipe(gulp.dest(config.dist.css))
			.pipe(browserSync.reload({stream: true}))

		// Builds the documentation; for development purposes
		if (docs) {
			gulp.src(config.src.sass_docs)
				.pipe(gulpif(!isDist, sourcemaps.init()))
				.pipe(plumber({
				errorHandler: err => {
						console.error(err);
					}
				}))
				.pipe(sass())
				.pipe(rename(config.dist.min_css_docs))
				.pipe(autoprefixer( {
					remove: false,
					browsers: [
						'last 2 versions',
						'> 5%'
					]
				}
				))
				.pipe(gulpif(minify, minifyCSS()))
				.pipe(gulpif(!isDist, sourcemaps.write()))
				.pipe(gulp.dest(config.dist.css))
				.pipe(browserSync.reload({stream: true}))
		}

		if (buildAll) {
			// boba-lite.min.css
			// No color helpers, No extended-color helpers, components have no color variations
			gulp.src(config.src.sass)
				.pipe(replace('$include-color-palette: true', '$include-color-palette: false'))
				.pipe(replace('$include-color-helpers: true', '$include-color-helpers: false'))
				.pipe(replace('$include-color-helpers-extended: true', '$include-color-helpers-extended: false'))
				.pipe(gulpif(!isDist, sourcemaps.init()))
				.pipe(plumber({
					errorHandler: err => {
						console.error(err);
					}
				}))
				.pipe(sass())
				.pipe(rename(config.dist.min_css_lite))
				.pipe(autoprefixer( {
					remove: false,
					browsers: [
						'last 2 versions',
						'> 5%'
					]
				}
				))
				.pipe(gulpif(minify, minifyCSS()))
				.pipe(gulpif(!isDist, sourcemaps.write()))
				.pipe(gulp.dest(config.dist.css))
				.pipe(browserSync.reload({stream: true}))

			// boba.min.css
			// Color helpers, Components have color variations, But no extended color helpers
			gulp.src(config.src.sass)
				.pipe(replace('$include-color-helpers-extended: true', '$include-color-helpers-extended: false'))
				.pipe(gulpif(!isDist, sourcemaps.init()))
				.pipe(plumber({
					errorHandler: err => {
						console.error(err);
					}
				}))
				.pipe(sass())
				.pipe(rename(config.dist.min_css))
				.pipe(autoprefixer( {
					remove: false,
					browsers: [
						'last 2 versions',
						'> 5%'
					]
				}
				))
				.pipe(gulpif(minify, minifyCSS()))
				.pipe(gulpif(!isDist, sourcemaps.write()))
				.pipe(gulp.dest(config.dist.css))
				.pipe(browserSync.reload({stream: true}))
		}  
	};
};
