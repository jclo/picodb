// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules
const d  = require('./geodb')
    , us = require('./usa.js')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test $geoIntersects:', () => {
    const db = PicoDB();

    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const doc = [
        d.jfk, d.lax, d.sfo, d.san, d.phx, d.c2a, d.pinc, d.pca, d.pina,
        us.california, us.nevada, us.oregon, us.utah,
      ];

      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    describe('LineString:', () => {
      it('Expects db.find({  name: "LineString from California to Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: arizona } } }  }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({  name: "LineString from California to Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: california } } }  }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({  name: "LineString from California to Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: nevada } } }  }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });

    describe('Polygon:', () => {
      it('Expects db.find({  name: "Polygon straddling California and Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: arizona } } }  }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({  name: "Polygon straddling California and Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: california } } }  }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({  name: "Polygon straddling California and Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: nevada } } }  }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({  name: "Polygon inside Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: arizona } } }  }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ name: 'Polygon inside Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({  name: "Polygon inside Arizona", loc: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: california } } }  }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ name: 'Polygon inside Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });
  });
};
