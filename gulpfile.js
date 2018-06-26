// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
	  argv    = require('yargs').argv,
	  del     = require('del'),
	  runSeq  = require('run-sequence'),
	  browserSync = require('browser-sync'),
	  validTags = ['major', 'minor', 'patch'],
	  config  = {
	  		flags: {
				isDist: argv.prod ? true : false,
				docs: argv.docs ? true : false,
				highlight: argv.highlight ? true : false,
                rebuildShowcase: argv.rebuildShowcase ? true : false,
				minify: argv.nomin ? false : true,
				buildAll: argv.buildall ? true : false,
				version: validTags.includes(argv.updateType) ? argv.updateType : false
	  		},
			src: {
				html: 'src/**/*.html',
				sass: 'src/scss/all.scss',
				nunjucks_templates: 'src/**/*.+(html|njk)',
				sass_docs: 'src/scss/docs/all.scss',
                js_docs: 'src/docs/**/*.js',
                showcase_screenshots_dir: 'src/screenshots/',
                showcase_screenshots: 'src/screenshots/*.jpg'
			},
			dist: {
				html: 'dist',
				css: 'dist',
				js: 'dist',
				min_css: 'boba.min.css',
				min_css_lite: 'boba-lite.min.css',
				min_css_extended: 'boba-extended.min.css',
				min_css_docs: 'documentation.min.css',
                min_js_docs: 'documentation.min.js',
                showcase_screenshots: 'dist/showcase'
			},
			watch: {
			  sass: 'src/scss/**/*.scss', 
              showcase_data_file: 'showcaseData.js'
			},
			data: {
				showcase: require('./showcaseData').getWebsiteList(),
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
gulp.task('showcase', getTask('showcase'));

// Wait for nunjucks to finish before reloading browser
gulp.task('nunjucks-reload', ['nunjucks'], done => {
	browserSync.reload();
    done();
});

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
	gulp.watch(config.watch.showcase_data_file, ['showcase']);
	gulp.watch(config.src.nunjucks_templates, ['nunjucks-reload']);
	gulp.watch(config.src.js_docs, ['scripts']);
});

// --------------------------------------------------------------------
// Task Runner: Build (Use --prod for production build)
// --------------------------------------------------------------------

gulp.task('build', function(callback) {
	runSeq('clean', ['sass', 'nunjucks', 'scripts', 'showcase'], callback);
});

// --------------------------------------------------------------------
// Task Runner: Default
// --------------------------------------------------------------------

gulp.task('default', function(callback) {
	runSeq('clean', ['sass', 'nunjucks-reload', 'scripts', 'showcase'], 'watch', callback);
});
