'use strict';

var Foso = require('foso');
var sass = require('../');

var foso = new Foso();
foso
  .register(sass, {
    src: './styles',
    minify: true
  })
  .then(() => foso.bundle());
