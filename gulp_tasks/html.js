const gulp 			= require('gulp'),
      browserSync   = require('browser-sync');

module.exports = (gulp, config , isDist) => {
    return () => {
        return gulp.src(config.src.html, { base : './src' })
            .pipe(gulp.dest(config.dist.html))
            .pipe(browserSync.reload({stream: true}))
    };
};