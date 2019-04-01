// ESLint declarations
/* global describe */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules

// -- Local modules
const picodb    = require('./sub/picodb.js')
    , insert    = require('./sub/insert.js')
    , find      = require('./sub/find.js')
    , query     = require('./sub/query.js')
    , geo       = require('./sub/geo.js')
    , count     = require('./sub/count.js')
    , deleteDoc = require('./sub/delete.js')
    , update    = require('./sub/update.js')
    , event     = require('./sub/event.js')
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
