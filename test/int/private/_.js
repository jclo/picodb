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
  describe('Test the extra functions of the library _.js:', () => {
    const [,, _] = PicoDB._setTestMode();

    describe('Test _.normalize():', () => {
      const o1 = _.normalize({ a: 1 })
          , o2 = _.normalize({ a: { b: 1 } })
          , o3 = _.normalize({ 'a.b': 1 })
          , o4 = _.normalize({ 'a.b': { 'c.d.e': { 'f.g.h': { i: { 'j.k': '007' } } } } })
          ;

      // o1 = _.normalize({ a: 1 })
      it('Expects _.normalize({ a: 1 }) to return the object { a: 1 }.', () => {
        expect(o1).to.be.an('object');
      });

      it('Expects this object to own one property.', () => {
        expect(Object.keys(o1)).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this object to own the property "a" that is equal to 1.', () => {
        expect(o1).to.own.property('a').that.is.a('number').that.is.equal(1);
      });


      // o2 = _.normalize({ a: { b: 1 } })
      it('Expects _.normalize({ a: { b: 1 } }) to return the object { a: { b: 1 } } }.', () => {
        expect(o2).to.be.an('object');
      });

      it('Expects this object to own one property.', () => {
        expect(Object.keys(o2)).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this object to own the property "a" that is an object.', () => {
        expect(o2).to.own.property('a').that.is.an('object');
      });

      it('Expects the object "a" to own one property.', () => {
        expect(Object.keys(o2.a)).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the object "a" to own the property "b" that is equal to 1.', () => {
        expect(o2.a).to.own.property('b').that.is.a('number').that.is.equal(1);
      });


      // o3 = _.normalize({ 'a.b': 1 })
      it('Expects _.normalize({ "a.b": 1 } }) to return the object { a: { b: 1 } } }.', () => {
        expect(o3).to.be.an('object');
      });

      it('Expects this object to own one property.', () => {
        expect(Object.keys(o3)).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this object to own the property "a" that is an object.', () => {
        expect(o3).to.own.property('a').that.is.an('object');
      });

      it('Expects the object "a" to own one property.', () => {
        expect(Object.keys(o3.a)).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the object "a" to own the property "b" that is equal to 1.', () => {
        expect(o3.a).to.own.property('b').that.is.a('number').that.is.equal(1);
      });


      // o4 = _.normalize({ 'a.b': { 'c.d.e': { 'f.g.h': { i: { 'j.k': '007' } } } } })
      it('Expects _.normalize({ "a.b": { "c.d.e":  { "f.g.h": { i: { "j.k": "007" } } } } }) to return the object ...', () => {
        expect(o4).to.be.an('object');
      });

      it('Expects the returned object "o.a.b.c.d.e.f.g.h.i.j.k" to be equal "0.0.7".', () => {
        expect(o4.a.b.c.d.e.f.g.h.i.j.k).to.be.a('string').that.is.equal('007');
      });
    });
  });
};
