// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0, max-len: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules
const d = require('./geodb');


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  const [Geo] = PicoDB._setTestMode();

  describe('Test $near:', () => {
    describe('Test private Geo functions:', () => {
      describe('law of haversines:', () => {
        it('Expects the distance between the airports of SF and LA to be below 600 km.', () => {
          expect(Geo.lawOfHaversines(d.sfo.loc, d.lax.loc)).to.be.below(600000);
        });
      });

      describe('law of cosines:', () => {
        it('Expects the distance between the airports of SF and LA to be below 600 km.', () => {
          expect(Geo.lawOfCosines(d.sfo.loc, d.lax.loc)).to.be.below(600000);
        });
      });

      describe('equirectangular projection:', () => {
        it('Expects the distance between the airports of SF and LA to be below 600 km.', () => {
          expect(Geo.equirectangularProjection(d.sfo.loc, d.lax.loc)).to.be.below(600000);
        });
      });
    });

    describe('Test of proximity:', () => {
      const db = PicoDB();

      it('Expects db.insertMany([jfk, lax, sfo, san, phx, cai]) to return an array with all the documents.', async () => {
        const doc = [d.jfk, d.lax, d.sfo, d.san, d.phx, d.cai];

        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects db.find({ { loc: { $near: { $geometry: jfk.loc } } }).toArray() to return 5 documents.', async () => {
        const resp = await db.find({ loc: { $near: { $geometry: d.jfk.loc } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(5);
      });

      it('Expects db.find({ { loc: { $near: { $geometry: jfk.loc, $maxDistance: 100000 } } }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ loc: { $near: { $geometry: d.jfk.loc, $maxDistance: 100000 } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ { loc: { $near: { $geometry: jfk.loc, $maxDistance: 100000, $minDistance: 10000 } } }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ loc: { $near: { $geometry: d.jfk.loc, $maxDistance: 100000, $minDistance: 10000 } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ { loc: { $near: { $geometry: jfk.loc, $maxDistance: 10, $minDistance: 10000 } } }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ loc: { $near: { $geometry: d.jfk.loc, $maxDistance: 10, $minDistance: 10000 } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ { loc: { $near: { $geometry: d.cai.loc } } }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ loc: { $near: { $geometry: d.cai.loc } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ { loc: { $near: {} } }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ loc: { $near: {} } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });
  });
};
