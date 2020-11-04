// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const { expect } = require('chai')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test event methods without installing the plugin:', () => {
    const db = PicoDB();

    it('Expects db.addEventListener() to return an object.', () => {
      expect(db.addEventListener()).to.be.an('object');
    });

    it('Expects db.addOneTimeEventListener() to return an object.', () => {
      expect(db.addOneTimeEventListener()).to.be.an('object');
    });

    it('Expects db.removeEventListener() to return an object.', () => {
      expect(db.removeEventListener()).to.be.an('object');
    });

    it('Expects db.removeEventListener() to return an object.', () => {
      expect(db.removeEventListener()).to.be.an('object');
    });

    it('Expects db.on() to return an object.', () => {
      expect(db.on()).to.be.an('object');
    });

    it('Expects db.one() to return an object.', () => {
      expect(db.one()).to.be.an('object');
    });

    it('Expects db.off() to return an object.', () => {
      expect(db.off()).to.be.an('object');
    });
  });
};
