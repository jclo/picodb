/* global describe, it */
/* eslint import/no-extraneous-dependencies: 0  */

'use strict';

// -- Node modules
const expect = require('chai').expect
    ;

// -- Local modules
const PicoDB = require('../index.js')
    ;

// -- Local constants

// -- Main
module.exports = function() {
  describe('The creation of the object database:', () => {
    it('Expects the constructor to return an object.', () => {
      const db = PicoDB.Create();
      expect(db).be.an('object');
    });
  });
};
