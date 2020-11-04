// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./delete/delete_1')
    , test2 = require('./delete/delete_2')
    , test3 = require('./delete/delete_3')
    ;


// -- Local Constants
const doc = [
  { a: 1 },
  { a: 1, b: 1 },
  { a: 1, b: 1, c: { d: 1 } },
  { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
  { a: { b: { c: { d: { e: 1 } } } } },
];


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the delete() method:', () => {
    test1(PicoDB, doc);
    test2(PicoDB, doc);
    test3(PicoDB, doc);
  });
};
