// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const Messenger = require('@mobilabs/messenger');


// -- Local Modules
const testlib = require('./int/lib')
    // , pack   = require('../package.json')
    , test_   = require('./int/private/_')
    , plugin  = require('./int/private/plugin')
    , insert  = require('./int/private/insert')
    , find    = require('./int/private/find')
    , query   = require('./int/private/query')
    , geo     = require('./int/private/geo')
    , count   = require('./int/private/count')
    , deldoc  = require('./int/private/delete')
    , update  = require('./int/private/update')
    , event   = require('./int/private/event')
    ;


// -- Local Constants
// const libname = 'PicoDB';


// -- Local Variables


// -- Main

// This define root for Node.js:
global.root = {};

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'PicoDB' and 'testlib' like this:
//  . const PicoDB = require('../src/<file>').default;
//  . testlib(PicoDB, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'PicoDB' and 'testlib' like this:
//  . const PicoDB = require('../index');
//  . testlib(PicoDB, libname, pack.version, 'without new');

const PicoDB = require('../src/picodb').default;
// const PicoDB = require('../index');

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

// - oOo --
