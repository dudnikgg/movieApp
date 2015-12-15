'use strict';

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	bowerFiles = require('main-bower-files'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	es = require('event-stream'),
	del = require('del'),
	reload = browserSync.reload;

// path
var paths = {
	scripts: './app/**/*.js',
	styles: ['./app/**/*.css', './app/**/*.scss'],
	images: './app/img/**/*',
	index: './app/index.html',
	partials: ['./app/**/*.html', '!app/index.html'],
	distDev: './dist.dev',
	distProd: './dist.prod'
};

//pipe segments
var pipes = {};

pipes.orderedVendorsScripts = function() {
	return plugins.order(['jquery.js', 'angular.js']);
};
pipes.buildVendorsScriptsDev = function() {
	return gulp.src(bowerFiles())
		.pipe(gulp.dest(paths.distDev + '/bower_components'));
};
pipes.buildAppScriptsDev = function() {
	return gulp.src(paths.scripts)
		.pipe(plugins.concat('app.js'))
		.pipe(gulp.dest(paths.distDev));
};
pipes.buildProcessedImagesDev = function() {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.distDev + '/img'));
};
pipes.buildStyleDev = function() {
	return gulp.src(paths.styles)
		.pipe(sass('main.css').on('error', sass.logError))
		.pipe(gulp.dest(paths.distDev));
};
pipes.buildIndexDev = function() {
	var orderedVendorsScripts = pipes.buildVendorsScriptsDev()
		.pipe(pipes.orderedVendorsScripts());

	var orderedAppScripts = pipes.buildAppScriptsDev();

	var appStyles = pipes.buildStyleDev();
	return gulp.src(paths.index)
		.pipe(gulp.dest(paths.distDev))
		.pipe(plugins.inject(orderedVendorsScripts, {relative: true, name: 'bower'}))
		.pipe(plugins.inject(orderedAppScripts, {relative: true}))
		.pipe(plugins.inject(appStyles, {relative: true}))
		.pipe(gulp.dest(paths.distDev));
};
pipes.buildPartialsFilesDev = function() {
	return gulp.src(paths.partials)
		.pipe(gulp.dest(paths.distDev));
};
pipes.buildAppDev = function() {
	return es.merge(pipes.buildIndexDev(), pipes.buildPartialsFilesDev(), pipes.buildProcessedImagesDev(), pipes.buildStyleDev());
};

//tasks
gulp.task('clean-dev', function() {
	return del(paths.distDev);
});
gulp.task('build-app-scripts-dev', pipes.buildAppScriptsDev);
gulp.task('build-partials-dev', pipes.buildPartialsFilesDev);
gulp.task('build-index-dev', pipes.buildIndexDev);
gulp.task('build-app-dev', pipes.buildAppDev);
gulp.task('build-style-dev', pipes.buildStyleDev);
gulp.task('clean-app-dev', ['clean-dev'], pipes.buildAppDev);

gulp.task('watch-dev', ['clean-app-dev'], function() {
	browserSync({
		port: 8000,
		server: {
			baseDir: paths.distDev
		}
	});

	gulp.watch(paths.index, function() {
		return pipes.buildIndexDev()
			.pipe(reload({stream: true}));
	});
	gulp.watch(paths.scripts, function() {
		return pipes.buildAppScriptsDev()
			.pipe(reload({stream: true}));
	});
	gulp.watch(paths.partials, function() {
		return pipes.buildPartialsFilesDev()
			.pipe(reload({stream: true}));
	});
	gulp.watch(paths.styles, function() {
		return pipes.buildStyleDev()
			.pipe(reload({stream: true}));
	});
	gulp.watch(paths.images, function() {
		return pipes.buildProcessedImagesDev()
			.pipe(reload({stream: true}));
	});
});

gulp.task('default', ['watch-dev']);