'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify'); 
var babelify = require('babelify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var assign = require('lodash.assign');
var fs = require("fs");
var b = null;
const jsroot = "./frontend/js/app.js";
const jsoutput = "./public/app.js";
const cssroot = './frontend/css/*.css';

function initBrowserify(watch) {
    let options = {
        entries: [jsroot],
        cache: {},
        packageCache: {}
    };

    if (watch) {
        options.plugin = [watchify];
    }

    b = browserify(options);

    if (watch) {
        b.on('update', bundleJs);
    }

    b.on('log', function(data) {
        console.log(`[browserify]: ${data}`);
        
        notify({
            title: 'Compile Complete!',
            message: data
        });
    });
}

function bundleJs() {
    if (!b) {
        throw new Error("Missing call to initBrowserify");
    }

    console.log('[gulp] Starting bundleJs');

    b.transform("babelify", {presets: ["es2015", "react"]})
     .bundle()
     .on('error', function(err){
        // print the error (can replace with gulp-util)
        console.log(`[browserify] Error: ${err.message}`);
        notify({
            'title': 'Compile Error',
            'message': err.message
        });
        // end this stream
        this.emit('end');
     })
     .pipe(fs.createWriteStream(jsoutput));
}

function bundleCss() {
    console.log('[gulp] Starting bundleCss');

     gulp.src(cssroot)
         .pipe(concat('app.css'))
         .pipe(gulp.dest('public/'));
}

gulp.task('js', function() {
    initBrowserify(false);
    return bundleJs();
});

gulp.task('js-watch', function() {
    initBrowserify(true);
    return bundleJs();
});

gulp.task('css', function () {
  bundleCss();
});

gulp.task('css-watch', function () {
  //gulp.watch(cssroot, bundleCss);
  bundleCss();
});

gulp.task('default', ['js', 'css']);
gulp.task('watch', ['js-watch', 'css-watch']);
