/* global describe, it */
/* eslint  max-len: [1, 80, 1] */
/* eslint new-cap: 0, no-unused-expressions: 0 */

'use strict';

// -- Node modules
var expect = require('chai').expect
  ;

// -- Local modules
var PicoDB = require('../index.js')
  ;

// -- Local constants

// -- Main
module.exports = function() {
  describe('The creation of the object database:', function() {
    it('Expects the constructor to return an object.', function() {
      var db
        ;

      db = PicoDB.Create();
      expect(db).be.an.object;
    });
  });
};
