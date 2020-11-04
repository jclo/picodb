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
module.exports = function(PicoDB, Messenger) {
  const [, P] = PicoDB._setTestMode();
  describe('Test the library with the plugin @mobilabs/messenger attached:', () => {
    it('Expects P.plugin({ messenger: Messenger }) to return true.', () => {
      expect(P.plugin({ messenger: Messenger })).to.be.equal(true);
    });

    it('Expects P.get("messenger") to return a function.', () => {
      expect(P.get('messenger')).to.be.a('function');
    });

    it('Expects this function to own the property "NAME".', () => {
      expect(P.get('messenger')).to.own.property('NAME');
    });

    it('Expects this property "NAME" to be equal to "Messenger".', () => {
      expect(P.get('messenger'))
        .to.own.property('NAME')
        .that.is.a('string')
        .that.is.equal('Messenger')
      ;
    });
  });
};
