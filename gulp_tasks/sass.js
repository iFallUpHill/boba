const gulp            = require('gulp'),
      rename          = require('gulp-rename'),
      plumber         = require('gulp-plumber'),
      minifyCSS       = require('gulp-cssnano'),
      sass            = require('gulp-sass'),
      autoprefixer    = require('gulp-autoprefixer'),
      uglify          = require('gulp-uglify'),
      sourcemaps      = require('gulp-sourcemaps'),
      gulpif          = require('gulp-if'),
      browserSync     = require('browser-sync'),
      onError         = require('./helpers/onError.js');

module.exports = (gulp, config , isDist) => {
    return () => {
        gulp.src(config.src.sass)
            .pipe(gulpif(!isDist, sourcemaps.init()))
            .pipe(plumber({
                errorHandler: onError
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
            .pipe(minifyCSS())
            .pipe(gulpif(!isDist, sourcemaps.write()))
            .pipe(gulp.dest(config.dist.css))
            .pipe(browserSync.reload({stream: true}))
    };
};