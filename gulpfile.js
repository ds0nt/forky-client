/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

// Settings
var DEST = argv.dest || './dist';                         // The build output folder
var RELEASE = !!argv.release;                 // Minimize and optimize during a build?


var src = {};
var watch = false;

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [DEST], { force: true }));

// 3rd party libraries
gulp.task('vendor', function() {
    gulp.src('./node_modules/share/webclient/**')
      .pipe(gulp.dest(DEST + '/js')
  );
});

src.assets = 'src/assets/**';

// Static files
gulp.task('assets', function() {
  return gulp.src(src.assets)
    .pipe($.changed(DEST))
    .pipe(gulp.dest(DEST))
});

src.styles = 'src/styles/**/*.{css,scss}';

// CSS style sheets
gulp.task('styles', function() {
  return gulp.src('src/styles/app.scss')
    .pipe($.plumber())
    .pipe($.sass({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(DEST + '/css'))
});

// Bundle
gulp.task('bundle', function(cb) {
  var started = false;

  var config = require('./config/webpack.js')(RELEASE);
  config.output.path = DEST;
  config.output.publicPatch = DEST;

  var bundler = webpack(config);

  function bundle(err, stats) {

    !!argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));

    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    console.log('bundle watching');
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function(cb) {
  runSequence(['vendor', 'assets', 'styles', 'bundle'], cb);
});


gulp.task('watch', function(cb) {
  watch = true;

  runSequence('build', function() {
    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.styles, ['styles']);
    cb();
  });
});
