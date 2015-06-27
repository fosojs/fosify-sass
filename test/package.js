'use strict';

var expect = require('chai').expect;
var fsass = require('../');

describe('fosify-sass', function() {
  it('exports a function', function() {
    expect(fsass).to.be.a('function');
  });

  it('returns the correct set of extensions', function() {
    expect(fsass.extensions).to.be.instanceof(Array);
    expect(fsass.extensions.length).to.equal(1);
    expect(fsass.extensions[0]).to.equal('css');
  });
});
