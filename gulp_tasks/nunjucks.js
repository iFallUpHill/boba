const gulp 			= require('gulp'),
	  nunjucks 		= require('gulp-nunjucks'),
      browserSync   = require('browser-sync');

module.exports = (gulp, config, isDist, minify, buildAll) => {
    return () => {
        return gulp.src(config.src.html, { base : './src' })
        	.pipe(nunjucks.compile())
        	.on('error', function(err) { 
        		console.log(err)}
    		)
            .pipe(gulp.dest(config.dist.html))
            .pipe(browserSync.reload({stream: true}))
    };
};