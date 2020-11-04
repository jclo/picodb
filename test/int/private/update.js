// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./update/update_1')
    , test2 = require('./update/update_2')
    , test3 = require('./update/update_3')
    , test4 = require('./update/update_4')
    , test5 = require('./update/update_5')
    , test6 = require('./update/update_6')
    ;


// -- Local Constants
const doc = [
  { a: 1 },
  { a: 2, name: { first: 'John', last: 'Doe' } },
  { a: 3, quantity: 5, metrics: { orders: 1, ratings: { value: 0.5, type: 'aaa' } } },
  { a: 4, lastModified: null, cancellation: { date: null } },
];


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the update methods:', () => {
    test1(PicoDB, doc);
    test2(PicoDB, doc);

    describe('Test the updateOne method:', () => {
      test3(PicoDB, doc);
      test4(PicoDB, doc);
      test5(PicoDB, doc);
      test6(PicoDB, doc);
    });
  });
};
