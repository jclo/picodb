// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const testargs       = require('./insert/insert_1')
    , testinsertOne  = require('./insert/insertone')
    , testinsertMany = require('./insert/insertmany')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the insert() method:', () => {
    testargs(PicoDB);
    testinsertOne(PicoDB);
    testinsertMany(PicoDB);
  });
};
