const fs = require('fs');
const $ = jQuery = require('./../bower_components/jquery/dist/jquery.js');
require('./../bower_components/jquery-csv/src/jquery.csv.js');

/**
 * Definitions for supported file types
 *
 * Add more objects here to support additional formats
 */
var formats = {
  csv: {
    label: 'Comma separated',
    filters: [
      { name: 'csv files', extensions: ['csv'] }
    ],
    options: { separator: ',', delimiter: '"'},
    mime_type: 'text/csv',
    default_extension: 'csv',
  },
  tsv: {
    label: 'Tab separated',
    filters: [
      { name: 'tsv files', extensions: ['tsv'] },
      { name: 'txt files', extensions: ['txt'] },
      { name: 'dat files', extensions: ['dat'] },
    ],
    options: { separator: "\t", delimiter: '"'},
    mime_type: 'text/tab-separated-values',
    default_extension: 'tsv',
  },
  semicolon: {
    label: 'Semicolon separated',
    filters: [
      { name: 'csv files', extensions: ['csv'] }
    ],
    options: { separator: ';', delimiter: '"'},
    mime_type: 'text/csv',
    default_extension: 'csv',
  },
};

var openFile = function(hot, data, format) {
  var arrays;
  // if no format specified, default to csv
  if (typeof format === 'undefined') {
    arrays = $.csv.toArrays(data);
  } else {
    arrays = $.csv.toArrays(data, format.options);
  }
  hot.loadData(arrays);
  return arrays;
};

var saveFile = function(hot, fileName, format) {
  var data;
  // if no format specified, default to csv
  if (typeof format === 'undefined') {
    data = $.csv.fromArrays(hot.getData());
  } else {
    data = $.csv.fromArrays(hot.getData(), format.options);
  }
  fs.writeFile(fileName, data, function (err) {
  });
  document.title = fileName;
};

module.exports = {
  formats: formats,
  open: openFile,
  save: saveFile
};