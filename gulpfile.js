// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
      argv    = require('yargs').argv,
      del     = require('del'),
      runSeq  = require("run-sequence"),
      browserSync = require('browser-sync'),
      isDist  = argv.prod ? true : false,
      minify  = argv.nomin ? false : true,
      buildAll = argv.buildall ? true : false;
      config  = {
            src: {
                html: 'src/**/*.html',
                sass: 'src/scss/all.scss',
                color_helpers: 'src/scss/color_helpers.scss'
            },
            dist: {
                html: 'dist',
                css: 'dist',
                min_css: 'boba.min.css',
                min_css_core: 'boba-core.min.css',
                min_css_color_helpers: 'boba-color-helpers.min.css'
            },
            watch: {
              sass: 'src/scss/**/*.scss',
            }
        };

// --------------------------------------------------------------------
// Loader Function
// --------------------------------------------------------------------

function getTask(task) {
    return require('./gulp_tasks/' + task)(gulp, config, isDist, 
                                              minify, buildAll);
}

// --------------------------------------------------------------------
// Define Tasks
// --------------------------------------------------------------------

gulp.task('sass', getTask('sass'));
gulp.task('html', getTask('html'));

// --------------------------------------------------------------------
// Extra Task: Clean
// --------------------------------------------------------------------

gulp.task('clean', function() {
    del('dist');
});

// --------------------------------------------------------------------
// Extra Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function() {
    browserSync.init({
        server: './dist'
    });
    gulp.watch(config.watch.sass, ['sass']);
    gulp.watch(config.src.html, ['html']).on('change', browserSync.reload);

});

// --------------------------------------------------------------------
// Task Runner: Build (Use --prod for production build)
// --------------------------------------------------------------------

gulp.task('build', function(callback) {
    runSeq('clean', ['sass', 'html'], callback);
});

// --------------------------------------------------------------------
// Task Runner: Default
// --------------------------------------------------------------------

gulp.task('default', function(callback) {
    runSeq('clean', ['sass', 'html'], 'watch', callback);
});
