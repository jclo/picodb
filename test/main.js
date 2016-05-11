// ESLint declarations
/* global describe */
/* eslint max-len: [1, 100], curly: 0 */
'use strict';

// -- Node modules

// -- Local modules
var create    = require('./create.js')
  , insert    = require('./insert.js')
  , find      = require('./find.js')
  , count     = require('./count.js')
  , deleteDoc = require('./delete.js')
  , update    = require('./update.js')
  , event     = require('./event.js')
  ;

// -- Local variables


// -- Main
describe('PicoDB', function() {

  // Test constructor:
  create();

  // Test the methods insertOne & insertMany:
  insert();

  // Test the methods find and toArray:
  find();

  // Test the method count:
  count();

  // Test the methods deleteOne & deleteMany:
  deleteDoc();

  // Test the methods updateOne & updateMany:
  update();

  // Test the methods addEventListener, addOneTimeEventListener and removeEventListener:
  event();

});
