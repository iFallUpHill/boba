const gulp 			      = require('gulp'),
	  nunjucks 		      = require('gulp-nunjucks'),
      highlightCode     = require('gulp-highlight-code'),
      gulpif            = require('gulp-if'),
      browserSync       = require('browser-sync');

module.exports = (gulp, config) => {

    const isDist = config.flags.isDist;
    const docs =  isDist ? true : config.flags.docs;
    const highlight =  isDist ? true : config.flags.highlight;

    return () => {
        if (docs) {
            return gulp.src(config.src.html, { base : './src' })
                    .pipe(nunjucks.compile())
                    .on('error', function(err) { 
                        console.log(err)}
                    )
                    .pipe(gulpif(highlight, highlightCode()))
                    .pipe(gulp.dest(config.dist.html))
                    .pipe(browserSync.reload({stream: true}))
        }
    };
};