// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./count/count_1')
    , test2 = require('./count/count_2')
    , test3 = require('./count/count_3')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the count() method:', () => {
    // Test with wrong arguments:
    test1(PicoDB);

    // Test with real arguments:
    test2(PicoDB);

    // Test queries
    test3(PicoDB);
  });
};
