// ESLint declarations
/* global describe */
/* eslint one-var: 0  */

'use strict';

// -- Node modules

// -- Local modules
const picodb    = require('./picodb.js')
    , insert    = require('./insert.js')
    , find      = require('./find.js')
    , query     = require('./query.js')
    , geo       = require('./geo.js')
    , count     = require('./count.js')
    , deleteDoc = require('./delete.js')
    , update    = require('./update.js')
    , event     = require('./event.js')
    ;

// -- Local constants


// -- Local variables


// -- Main
describe('PicoDB', () => {
  // Test constructor:
  picodb();

  // Test the methods insertOne & insertMany:
  insert();

  // Test the methods find and toArray:
  find();

  // Test the query operators:
  query();
  geo();

  // Test the method count:
  count();

  // Test the methods deleteOne & deleteMany:
  deleteDoc();

  // Test the methods updateOne & updateMany:
  update();

  // Test the methods addEventListener, addOneTimeEventListener and removeEventListener:
  event();
});
