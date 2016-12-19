process.env.NODE_ENV = 'test';

var chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var $ = require('./../../bower_components/jquery/dist/jquery.js');
var hotController = require('../../renderer/hot.js');
var rows = require('./../../renderer/ragged-rows');
var file_actions = require('./../../renderer/file-actions');
var fs = require('fs');
var os = require('os');

beforeEach(function () {
  hotView = document.createElement('div');
  document.body.appendChild(hotView);
  hot = hotController.create(hotView);
});

describe('open file (comma separated)', function() {

  it('opens a file (comma separated)', function() {
    var data = "foo,bar,baz\r\n1,2,3\r\n4,5,6";
    file_actions.open(hot, data);
    expect(hot.getData()).to.eql([['foo', 'bar', 'baz'],['1','2','3'],['4','5','6']]);
  });

});

describe('open file (semicolon separated)', function() {

  it('opens a file (semicolon separated)', function() {
    var data = "foo;bar;baz\r\n1;2;3\r\n4;5;6";
    file_actions.open(hot, data, file_actions.formats.semicolon);
    expect(hot.getData()).to.eql([['foo', 'bar', 'baz'],['1','2','3'],['4','5','6']]);
  });

});

describe('save file', function() {

  it('saves a file', function(done) {
    var data = "foo,bar,baz\r\n1,2,3\r\n4,5,6\r\n";
    file_actions.open(hot, data);
    file_actions.save(hot, os.tmpdir() + '/mycsv.csv');

    fs.readFile(os.tmpdir() + '/mycsv.csv', 'utf-8', function (err, d) {
      expect(d).to.eq(data);
      expect(document.title).to.eq(os.tmpdir() + '/mycsv.csv');
      done()
    });

  });

});

describe('convert file', function() {

  it('converts a file from csv to tsv', function(done) {
    var data = "foo,bar,baz\r\n1,2,3\r\n4,5,6";
    file_actions.open(hot, data);
    file_actions.save(hot, os.tmpdir() + '/mytsv.tsv', file_actions.formats.tsv);

    fs.readFile(os.tmpdir() + '/mytsv.tsv', 'utf-8', function (err, d) {
      expect(d).to.eq("foo\tbar\tbaz\r\n1\t2\t3\r\n4\t5\t6\r\n");
      done()
    });
  });

});