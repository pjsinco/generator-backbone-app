'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

function onError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('compileSass', function() {

    gulp.src(['./src/sass/style.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(notify({ message: 'Sassed!' }))
        .pipe(browserSync.stream());
    
});

gulp.task('lint', function() {

    return gulp.src(['./src/scripts/**/*.js'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))

});

gulp.task('scripts', function() {

    var b = browserify({
        entries: './src/scripts/main.js',
        debug: true,
    });


    b.bundle()
        .on('error', notify.onError(function(error) {
            return error.message;
        }))
        .pipe(source('main.js'))
        .pipe(rename('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(notify({ message: 'Browserified!' }))
        .pipe(browserSync.stream());
        
});

gulp.task('default', ['compileSass', 'scripts', 'lint'], function() {

    browserSync.init({
        server: './',
    });

    gulp.watch('./src/sass/**/*.scss', ['compileSass']);
    gulp.watch('./src/scripts/**/*.js', ['scripts', 'lint']);
    gulp.watch('./*.html', browserSync.reload);
    
});
