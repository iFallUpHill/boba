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
      browserSync     = require('browser-sync'),
      onError         = require('./helpers/onError.js');

module.exports = (gulp, config , isDist, minify, buildAll) => {

    minify = isDist ? true : minify;
    buildAll = isDist ? true : buildAll;

    return () => {
        // boba.min.css
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
            .pipe(gulpif(minify, minifyCSS()))
            .pipe(gulpif(!isDist, sourcemaps.write()))
            .pipe(gulp.dest(config.dist.css))
            .pipe(browserSync.reload({stream: true}))

        if (buildAll) {
          // boba-core.min.css
          // Besides the replace, this task should be identical to the one above it
          gulp.src(config.src.sass)
              .pipe(replace('$include-color-palette: true', '$include-color-palette: false'))
              .pipe(replace('$include-color-helpers: true', '$include-color-helpers: false'))
              .pipe(replace('$include-color-shades: true', '$include-color-shades: false'))
              .pipe(gulpif(!isDist, sourcemaps.init()))
              .pipe(plumber({
                  errorHandler: onError
              }))
              .pipe(sass())
              .pipe(rename(config.dist.min_css_core))
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

          // boba-colors.min.css
          // Only includes the color helpers (e.g. bg-*, text-*, etc.)
          gulp.src(config.src.color_helpers)
              .pipe(gulpif(!isDist, sourcemaps.init()))
              .pipe(plumber({
                  errorHandler: onError
              }))
              .pipe(sass())
              .pipe(rename(config.dist.min_css_color_helpers))
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