'use strict';

var glob = require('glob');
var sass = require('node-sass');
var path = require('path');
var fs = require('fs');
var async = require('async');
var gaze = require('gaze');
var futil = require('fosify');
var pkg = require('./package.json');

function bundleSass(opts, cb) {
  cb = cb || futil.noop;

  var src = opts.src;
  var dest = opts.dest || './build';
  var createPath = futil.bundleNamer({
    src: src,
    extension: 'css'
  });

  glob(src + '{/*/**/bundle,/**/*.bundle}.{sass,scss}', { ignore: opts.ignore }, function(err, files) {
    async.eachSeries(files, function(file, cb) {
      sass.render({
        file: file,
        outputStyle: opts.minify ? 'expanded' : 'compressed',
      }, function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        var bundleName = createPath(file);
        var dest = path.join(opts.dest, bundleName);

        futil.saveFile(dest, result.css);
        futil.log.bundled(bundleName);
        cb();
      });
    }, cb);
  });
}

function bundle(opts, cb) {
  futil.notifyUpdate(pkg);

  bundleSass(opts, function() {
    if (opts.watch) {
      gaze(opts.src + '/**/*.{sass,scss}', function(err, watcher) {
        watcher.on('all', function() {
          bundleSass(opts);
        });
      });
    }

    cb();
  });
}

module.exports = bundle;
module.exports.extensions = ['css'];
