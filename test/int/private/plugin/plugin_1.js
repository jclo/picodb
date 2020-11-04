// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  const [, P] = PicoDB._setTestMode();

  describe('Test the library plugin:', () => {
    it('Expects [, P] = PicoDB._setTestMode() to return an object.', () => {
      expect(P).to.be.an('object');
    });

    it('Expects this object to own three properties.', () => {
      expect(Object.keys(P)).to.be.an('array').that.has.lengthOf(3);
    });

    it('Expects this object to own the property "_db" that is an object.', () => {
      expect(P).to.own.property('_db').that.is.an('object');
    });

    it('Expects this object to own the property "plugin" that is a function.', () => {
      expect(P).to.own.property('plugin').that.is.a('function');
    });

    it('Expects this object to own the property "get" that is a function.', () => {
      expect(P).to.own.property('get').that.is.a('function');
    });

    it('Expects the property "_db" to own one property.', () => {
      expect(Object.keys(P._db)).to.be.an('array').that.has.lengthOf(1);
    });

    // it('Expects the property "_db" to own the property "messenger" that is null.', () => {
    //   expect(P._db).to.own.property('messenger').that.is.a('null');
    // });

    // Test plugin function:
    it('Expects P.plugin() to return false.', () => {
      expect(P.plugin()).to.be.equal(false);
    });

    it('Expects P.plugin({}) to return false.', () => {
      expect(P.plugin({})).to.be.equal(false);
    });

    // Test the get function:
    it('Expects P.get() to return null.', () => {
      expect(P.get()).to.be.a('null');
    });

    // it('Expects P.get("messenger") to return null.', () => {
    //   expect(P.get('messenger')).to.be.a('null');
    // });
  });

  describe('Test the library without attaching the right plugin:', () => {
    it('Expects P.plugin({ messenger: { NAME: "Nobody" } }) to return false.', () => {
      expect(P.plugin({ messenger: { NAME: 'Nobody' } })).to.be.equal(false);
    });
  });
};
