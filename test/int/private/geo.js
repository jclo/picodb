// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./geo/geo_1')
    , test2 = require('./geo/geo_2')
    , test3 = require('./geo/geo_3')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the GeoSpatial Operators:', () => {
    test1(PicoDB);
    test2(PicoDB);
    test3(PicoDB);
  });
};
