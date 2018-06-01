"use strict"; // I like to begin any JS file by adding this to the top

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

var config = {
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/build/toastr.min.css',
			'src/css/*.css'
		],
		jslib: [
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
			'node_modules/toastr/build/toastr.min.js'
		],
		dist: './dist',
		mainJs: './src/main.js',
		appServer: 'app-server.js'
	}
	// We define path using globs, which look like Regex
}

// Runs node server
gulp.task('run', function (cb) {
	nodemon({
        script  : './app-server.js',
        watch   : [config.paths.js, config.paths.appServer]
    });
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
		// we are saying: go get any html files, put them in the dest path, reload using connect
});

gulp.task('jslib', function() {
	gulp.src(config.paths.jslib)
	.pipe(gulp.dest(config.paths.dist + '/scripts'))
	.pipe(connect.reload());

});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
	.transform(reactify)
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + '/scripts'))
	.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist folder
gulp.task('images', function() {
	gulp.src(config.paths.images)
	.pipe(gulp.dest(config.paths.dist + '/images'))
	.pipe(connect.reload());

	// publish favicon
	gulp.src('./src/favicon.ico')
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
	.pipe(lint({config: 'eslint.config.json'}))
	.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.css, ['css']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'jslib', 'js', 'css', 'images', 'lint', 'run', 'watch']);