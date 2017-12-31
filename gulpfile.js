// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
	  argv    = require('yargs').argv,
	  del     = require('del'),
	  runSeq  = require("run-sequence"),
	  browserSync = require('browser-sync'),
	  config  = {
	  		flags: {
				isDist: argv.prod ? true : false,
				docs: argv.docs ? true : false,
				highlight: argv.highlight ? true : false,
				minify: argv.nomin ? false : true,
				buildAll: argv.buildall ? true : false
	  		},
			src: {
				html: 'src/**/*.html',
				sass: 'src/scss/all.scss',
				nunjucks_templates: 'src/**/*.+(html|njk)',
				sass_docs: 'src/scss/docs/all.scss',
				js_docs: 'src/docs/**/*.js'
			},
			dist: {
				html: 'dist',
				css: 'dist',
				js: 'dist',
				min_css: 'boba.min.css',
				min_css_core: 'boba-core.min.css',
				min_css_lite: 'boba-lite.min.css',
				min_css_docs: 'documentation.min.css',
				min_js_docs: 'documentation.min.js'
			},
			watch: {
			  sass: 'src/scss/**/*.scss', 
			}
		};

// --------------------------------------------------------------------
// Loader Function
// --------------------------------------------------------------------

function getTask(task) {
	return require('./gulp_tasks/' + task)(gulp, config);
}

// --------------------------------------------------------------------
// Define Tasks
// --------------------------------------------------------------------

gulp.task('sass', getTask('sass'));
gulp.task('nunjucks', getTask('nunjucks'));
gulp.task('scripts', getTask('scripts'));

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
	gulp.watch(config.src.nunjucks_templates, ['nunjucks']).on('change', browserSync.reload);
	gulp.watch(config.src.js_docs, ['scripts']);
});

// --------------------------------------------------------------------
// Task Runner: Build (Use --prod for production build)
// --------------------------------------------------------------------

gulp.task('build', function(callback) {
	runSeq('clean', ['sass', 'nunjucks', 'scripts'], callback);
});

// --------------------------------------------------------------------
// Task Runner: Default
// --------------------------------------------------------------------

gulp.task('default', function(callback) {
	runSeq('clean', ['sass', 'nunjucks', 'scripts'], 'watch', callback);
});
