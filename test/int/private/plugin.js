// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const test1 = require('./plugin/plugin_1')
    , test2 = require('./plugin/plugin_2')
    ;

// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB, Messenger) {
  describe('Test Plugin:', () => {
    test1(PicoDB);

    // test2 isn't executed because it attaches the plugin 'Messenger'.
    // It enters in conflict with the 'event' test.
    // test2(PicoDB, Messenger);
  });
};
