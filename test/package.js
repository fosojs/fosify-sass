'use strict';

var expect = require('chai').expect;
var fsass = require('../');

describe('fosify-sass', function() {
  it('exports a function', function() {
    expect(fsass).to.be.a('function');
  });
});
