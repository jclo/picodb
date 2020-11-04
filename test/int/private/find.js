// ESLint declarations:
/* global describe, */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./find/find_1')
    , test2 = require('./find/find_2')
    , test3 = require('./find/find_3')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test find() and toArray() methods:', () => {
    // Test with wrong queries.
    test1(PicoDB);

    // Test basic queries and projections.
    test2(PicoDB);
    test3(PicoDB);
  });
};
