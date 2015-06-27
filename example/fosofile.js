'use strict';

var foso = require('foso');
var sass = require('../');

foso
  .please({
    src: './styles',
    minify: true
  })
  .fosify(sass)
  .now();
