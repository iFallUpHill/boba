// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
      argv    = require('yargs').argv,
      del     = require('del'),
      runSeq  = require("run-sequence"),
      browserSync = require('browser-sync'),
      isDist  = argv.prod ? true : false,
      config  = {
            src: {
                html: 'src/**/*.html',
                sass: 'src/scss/all.scss',
            },
            dist: {
                html: 'build',
                css: 'dist',
                min_css: 'boba.min.css',
            },
            watch: {
              sass: 'src/scss/**/*.scss',
            }
        };

// --------------------------------------------------------------------
// Loader Function
// --------------------------------------------------------------------

function getTask(task) {
    return require('./gulp_tasks/' + task)(gulp, config, isDist);
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
        server: './build'
    });
    gulp.watch(config.watch.sass, ['sass']);
    gulp.watch(config.src.html, ['sass']);
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
