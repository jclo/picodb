// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./event/event_1')
    , test2 = require('./event/event_2')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB, Messenger) {
  describe('Test event methods:', () => {
    test1(PicoDB, Messenger);
    test2(PicoDB, Messenger);
  });
};
