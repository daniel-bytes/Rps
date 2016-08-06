'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var customOpts = {
  entries: ['./frontend/app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var builder = browserify(opts);
var watcher = watchify(builder); 

gulp.task('default', bundlejs);
watcher.on('update', bundlejs);
watcher.on('log', gutil.log);

function bundlejs() {
  return watcher.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public'));
}