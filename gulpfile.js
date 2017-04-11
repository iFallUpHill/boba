// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
      argv    = require('yargs').argv,
      del     = require('del'),
      runSeq  = require("run-sequence"),
      isDist  = argv.prod ? true : false,
      config  = {
            src: {
                sass: 'src/scss/all.scss',
            },
            dist: {
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
    gulp.watch(config.watch.sass, ['sass']);
});

// --------------------------------------------------------------------
// Task Runner: Build (Use --prod for production build)
// --------------------------------------------------------------------

gulp.task('build', function(callback) {
    runSeq('clean', ['sass'], callback);
});

// --------------------------------------------------------------------
// Task Runner: Default
// --------------------------------------------------------------------

gulp.task('default', function(callback) {
    runSeq('clean', ['sass'], 'watch', callback);
});
