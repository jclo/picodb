/* global describe, it */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules
const { expect } = require('chai')
    ;

// -- Local modules
const PicoDB = require('../../index.js')
    ;

// -- Local constants

// -- Main
module.exports = function() {
  describe('PicoDB and PicoDB object:', () => {
    //
    describe('Test PicoDB.VERSION:', () => {
      it('Expects PicoDB.VERSION to return a string.', () => {
        expect(PicoDB.VERSION).to.be.a('string');
      });
    });

    describe('Test PicoDB.noConflict:', () => {
      it('Expects PicoDB.noConflict to return a function.', () => {
        expect(PicoDB.noConflict).to.be.a('function');
      });
    });

    describe('Test the object creation:', () => {
      it('Expects PicoDB() to return an object.', () => {
        expect(PicoDB()).to.be.an('object');
      });
    });
  });
};
