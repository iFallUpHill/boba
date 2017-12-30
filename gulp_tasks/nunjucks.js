const gulp 			= require('gulp'),
	  nunjucks 		= require('gulp-nunjucks'),
      browserSync   = require('browser-sync');

module.exports = (gulp, config) => {

    const docs = config.flags.isDist ? true : config.flags.docs;

    return () => {
        if (docs) {
            return gulp.src(config.src.html, { base : './src' })
                    .pipe(nunjucks.compile())
                    .on('error', function(err) { 
                        console.log(err)}
                    )
                    .pipe(gulp.dest(config.dist.html))
                    .pipe(browserSync.reload({stream: true}))
        }
    };
};