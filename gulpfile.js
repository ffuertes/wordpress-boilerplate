'use strict';

var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps   = require('gulp-sourcemaps'),
	notify       = require('gulp-notify'),
	del          = require('del'),
	zip          = require('gulp-zip'),
    replace      = require('gulp-replace'),
	runSequence  = require('gulp-run-sequence'),
	browsersync  = require('browser-sync').create();

var config = {
	name: 'Boilerplate Theme',
    textDomain: 'boilerplate',
    proxy: 'boilerplate.dev',
	paths: {
		style: 'sass/*.scss',
		scss: 'sass/**/*.scss',
		php: '**/*.php'
	},
};

gulp.task('setup', function(){
    gulp.src(['./sass/style.scss'])
        .pipe(replace('Boilerplate Theme', config.textDomain));

    gulp.src(['./**/**', '!./node_modules/**', '!./gulpfile.js'])
        .pipe(replace('boilerplate', config.textDomain))
        .pipe(gulp.dest('./'));
});

gulp.task('build:styles', function(){
	return gulp.src(config.paths.style)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError(function(error){
					return "Error: " + error.message;
				})
		))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], flexbox: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'))
		.pipe(browsersync.stream({match: '**/*.css'}))
		.pipe(notify({ message: 'Styles tasks complete', onLast: true }));
});

gulp.task('serve', ['build:styles'], function() {

    browsersync.init({
        proxy: config.proxy
    });

    gulp.watch(config.paths.scss, ['build:styles']);
    gulp.watch([config.paths.php, '!./node_modules/**']).on('change', browsersync.reload);
});

var buildInclude    = [
    // include common file types
    './**/*.php',
    './**/*.html',
    './**/*.css',
    './**/*.js',
    './**/*.jpg',
    './**/*.png',
    './**/*.gif',
    './**/*.svg',
    './**/*.ttf',
    './**/*.otf',
    './**/*.eot',
    './**/*.woff',
    './**/*.woff2',

    // exclude files and folders
    '!./**/*.map',
    '!./sass/**',
    '!./node_modules/**',
    '!./readme.md',
    '!./**/readme.txt'
];

//Delete the build folder in case it exist
gulp.task('build:clean', function(){
	return del([
		'./build/' 
	]);
});

gulp.task('build:zip', function() {
    return gulp.src('./build/**/')
        .pipe(zip(config.textDomain + '.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('build:files', ['build:styles', 'build:clean'], function() {
    return  gulp.src(buildInclude)
        .pipe(gulp.dest('./build/' + config.textDomain))
        .pipe(notify({ message: 'Build task complete', onLast: true }));
});

gulp.task('build', function(){
	runSequence('build:files', 'build:zip', 'build:clean');
    return notify({ message: 'Build Succeed', onLast: true });
});


gulp.task('default', ['serve']);
