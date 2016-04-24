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
	paths: {
		style: './sass/*.scss',
		scss: './sass/**/*.scss',
		php: './**/*.php'
	},
};

gulp.task('setup', function(){
    gulp.src(['./sass/style.scss'])
        .pipe(replace('Boilerplate Theme', config.textDomain));

    gulp.src(['./**/**', '!./node_modules/**', '!./gulpfile.js'])
        .pipe(replace('boilerplate', config.textDomain))
        .pipe(gulp.dest('./'));
});

gulp.task('styles', function(){
	return gulp.src(config.paths.style)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError(function(error){
					return "Error: " + error.message;
				})
		))
		.pipe(autoprefixer({ browsers: ['last 2 versions'], flexbox: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'))
		.pipe(browsersync.reload({stream: true}))
		.pipe(notify({ message: 'Styles tasks complete', onLast: true }));
});

gulp.task('serve', ['styles'], function() {

    browsersync.init({
        proxy: config.proxy
    });

    gulp.watch(config.paths.scss, ['styles']);
    gulp.watch(config.paths.php).on('change', browsersync.reload);
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
gulp.task('clean', function(){
	return del([
		'./' + config.textDomain
	]);
});

gulp.task('buildZip', function() {
    return gulp.src(config.textDomain + '/**/')
        .pipe(zip(config.textDomain + '.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('buildFiles', ['styles', 'clean'], function() {
    return  gulp.src(buildInclude)
        .pipe(gulp.dest('./' + config.textDomain))
        .pipe(notify({ message: 'Build task complete', onLast: true }));
});

gulp.task('build', function(){
	runSequence('buildFiles', 'buildZip', 'clean');
    return notify({ message: 'Build Succeed', onLast: true });
});


gulp.task('default', ['serve']);
