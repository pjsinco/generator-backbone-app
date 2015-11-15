'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('backbone-app:app', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'index.html',
      'src/sass/_style.scss',
      'src/sass/base/_index.scss',
      'src/sass/layout/_index.scss',
      'src/sass/modules/_index.scss',
      'src/sass/utilities/_index.scss',
      'package.json',
      '.gitignore',
      //'.editorconfig',
      //'.jshintrc'
    ]);
  });

});
