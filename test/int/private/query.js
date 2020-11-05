// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const comparaison = require('./query/query_1')
    , elements    = require('./query/query_2')
    , logical1    = require('./query/query_3')
    , logical2    = require('./query/query_4')
    , logical3    = require('./query/query_5')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the Query Operators:', () => {
    comparaison(PicoDB);
    elements(PicoDB);
    logical1(PicoDB);
    logical2(PicoDB);
    logical3(PicoDB);
  });
};
