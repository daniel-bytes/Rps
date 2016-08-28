'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify'); 
var babelify = require('babelify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var fs = require("fs");

// see https://gist.github.com/wesbos/52b8fe7e972356e85b43
function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    
    this.emit('end'); // Keep gulp from hanging on this task
}

function bundleJs(watch) {
    const root = "./frontend/js/app.js";
    const output = "./public/app.js";
    
    if (watch) {
        browserify = browserify({
            entries: [root],
            cache: {},
            packageCache: {},
            plugin: [watchify]
        });
    }
    else {
        browserify = browserify(root); 
    }
  
	browserify
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(fs.createWriteStream(output));
}

function bundleCss() {
      gulp.src('./frontend/css/*.css')
          .pipe(concat('app.css'))
          .pipe(gulp.dest('public/'));
}

gulp.task('js', function() {
    return bundleJs(false);
});

gulp.task('js-watch', function() {
    return bundleJs(true);
});

gulp.task('css', function () {
  bundleCss();
});

gulp.task('css-watch', function () {
  gulp.watch('./frontend/css/*.css', bundleCss);
  bundleCss();
});

gulp.task('default', ['js', 'css']);
gulp.task('watch', ['js-watch', 'css-watch']);
