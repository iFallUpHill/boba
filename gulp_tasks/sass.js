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

module.exports = (gulp, config , isDist, docs, minify, buildAll) => {

    docs = isDist ? true : docs;
    minify = isDist ? true : minify;
    buildAll = isDist ? true : buildAll;

    return () => {
        // boba.min.css
        // Color helpers, Extended color helpers, Components have color variations
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

        if (docs) {
          gulp.src(config.src.sass_docs)
            .pipe(gulpif(!isDist, sourcemaps.init()))
            .pipe(plumber({
                errorHandler: onError
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
          // boba-core.min.css
          // No color helpers, No extended-color helpers, components have no color variations
          gulp.src(config.src.sass)
              .pipe(replace('$include-color-palette: true', '$include-color-palette: false'))
              .pipe(replace('$include-color-helpers: true', '$include-color-helpers: false'))
              .pipe(replace('$include-color-helpers-extended: true', '$include-color-helpers-extended: false'))
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

          // boba-lite.min.css
          // Color helpers, Components have color variations, But no extended color helpers
          gulp.src(config.src.sass)
              .pipe(replace('$include-color-helpers-extended: true', '$include-color-helpers-extended: false'))
              .pipe(gulpif(!isDist, sourcemaps.init()))
              .pipe(plumber({
                  errorHandler: onError
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
        }  
    };
};