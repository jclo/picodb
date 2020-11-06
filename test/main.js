// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const Messenger = require('@mobilabs/messenger');


// -- Local Modules
const // PicoDB = require('../index')
    PicoDB     = require('../src/picodb').default
    // , pack    = require('../package.json')
    , testlib  = require('./int/lib')
    , test_    = require('./int/private/_')
    , plugin   = require('./int/private/plugin')
    , insert   = require('./int/private/insert')
    , find     = require('./int/private/find')
    , query    = require('./int/private/query')
    , geo      = require('./int/private/geo')
    , count    = require('./int/private/count')
    , deldoc   = require('./int/private/delete')
    , update   = require('./int/private/update')
    , event    = require('./int/private/event')
    ;


// -- Local Constants
// const libname = 'PicoDB';


// -- Local Variables


// -- Main

// Nota:
// If you choose 'PicoDB = require('../index')', 'display-coverage' will
// show the coverage of all the library in one file.
//
// If you want to display the coverage file by file, you must choose
// 'PicoDB = require('../src/picodb').default'. But, in this case,
// the build isn't done, so you should pass '{{lib:name}}' as libname and
// '{{lib:version}}' as the library version.

describe('Test PicoDB:', () => {
  testlib(PicoDB, '{{lib:name}}', '{{lib:version}}', 'without new');
  // testlib(PicoDB, libname, pack.version, 'without new');

  // Test the plugin:
  plugin(PicoDB, Messenger);

  // Test _.js lib:
  test_(PicoDB);

  // Test the methods insertOne & insertMany:
  insert(PicoDB);

  // Test the methods find and toArray:
  find(PicoDB);

  // Test the query operators:
  query(PicoDB);
  geo(PicoDB);

  // Test the method count:
  count(PicoDB);

  // Test the methods updateOne & updateMany:
  update(PicoDB);

  // Test the methods deleteOne & deleteMany:
  deldoc(PicoDB);

  // Test the methods addEventListener, addOneTimeEventListener
  // and removeEventListener).
  event(PicoDB, Messenger);
});
