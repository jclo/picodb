// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0, max-len: 0 */


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
  describe('Test $geoWithins:', () => {
    const db1 = PicoDB();
    db1._db._silent = true;

    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const doc = [
        d.jfk, d.lax, d.sfo, d.san, d.phx, d.c2a, d.pinc, d.pca, d.pina,
        us.california, us.nevada, us.oregon, us.utah,
      ];

      const resp = await db1.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    describe('$box:', () => {
      it('Expects db.find({ type: "International", loc: { $geoWithin: { $box: d.sfo_alone }} }).toArray() to return 1 document.', async () => {
        const resp = await db1.find({ type: 'International', loc: { $geoWithin: { $box: d.sfo_alone } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ type: "International", loc: { $geoWithin: { $box: d.lax_sfo_san_phx }} }).toArray() to return 4 documents.', async () => {
        const resp = await db1.find({ type: 'International', loc: { $geoWithin: { $box: d.lax_sfo_san_phx } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(4);
      });

      it('Expects db.find({ type: "International", loc: { $geoWithin: { $box: d.lax_phx }} }).toArray() to return 2 documents.', async () => {
        const resp = await db1.find({ type: 'International', loc: { $geoWithin: { $box: d.lax_phx } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ type: "International", loc: { $geoWithin: { $box: d.sfo_lax }} }).toArray() to return 2 documents.', async () => {
        const resp = await db1.find({ type: 'International', loc: { $geoWithin: { $box: d.sfo_lax } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });
    });


    describe('$polygon:', () => {
      it('Expects db.find({ loc: { $geoWithin: { $polygon: d.p_sfo }} }).toArray() to return 1 document.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $polygon: d.p_sfo } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ loc: { $geoWithin: { $polygon: d.p_sfo_san }} }).toArray() to return 2 documents.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $polygon: d.p_sfo_san } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });
    });

    describe('$center:', () => {
      it('Expects db.find({ loc: { $geoWithin: { $center: [d.jfk.loc.coordinates, 1] }} }).toArray() to return 1 document.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $center: [d.jfk.loc.coordinates, 1] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ loc: { $geoWithin: { $center: [d.jfk.loc.coordinates, 50] }} }).toArray() to return 5 documents.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $center: [d.jfk.loc.coordinates, 50] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(5);
      });
    });

    describe('$centerSphere:', () => {
      it('Expects db.find({ loc: { $geoWithin: { $centerSphere: [d.jfk.loc.coordinates, 100 / 6378.1] }} }).toArray() to return 1 document.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $centerSphere: [d.jfk.loc.coordinates, (100 / 6378.1)] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ loc: { $geoWithin: { $centerSphere: [d.lax.loc.coordinates, 200 / 6378.1] }} }).toArray() to return 2 documents.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $centerSphere: [d.lax.loc.coordinates, (200 / 6378.1)] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ loc: { $geoWithin: { $centerSphere: [d.san.loc.coordinates, 600 / 6378.1] }} }).toArray() to return 3 documents.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $centerSphere: [d.san.loc.coordinates, (600 / 6378.1)] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ loc: { $geoWithin: { $centerSphere: [d.lax.loc.coordinates, 750 / 6378.1] }} }).toArray() to return 4 documents.', async () => {
        const resp = await db1.find({ loc: { $geoWithin: { $centerSphere: [d.lax.loc.coordinates, (750 / 6378.1)] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(4);
      });
    });


    describe('$geometry:', () => {
      describe('Type Polygon:', () => {
        describe('Geometry Point:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([jfk, lax, sfo, san, phx]) to return an array with all the documents.', async () => {
            const doc = [d.jfk, d.lax, d.sfo, d.san, d.phx];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: california }} }).toArray() to return 3 documents.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(3);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: arizona }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: new_york }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.new_york.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: utah }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.utah.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry LineString:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([cia, c2a]) to return an array with all the documents.', async () => {
            const doc = [d.cia, d.c2a];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: california }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: arizona }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry MultiPoint:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([cai, cpai]) to return an array with all the documents.', async () => {
            const doc = [d.cai, d.cpai];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: california }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: arizona }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry MultiLineString', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([ciaplus, c2aplus] to return an array with all the documents.', async () => {
            const doc = [d.ciaplus, d.c2aplus];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: california }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: arizona }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry Polygon', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([pinc, pca, pina]) to return an array with all the documents.', async () => {
            const doc = [d.pinc, d.pca, d.pina];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: california }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: arizona }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: nevada }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });
      });

      describe('Type MultiPolygon:', () => {
        describe('Geometry Point:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([jfk, lax, sfo, san, phx]) to return an array with all the documents.', async () => {
            const doc = [d.jfk, d.lax, d.sfo, d.san, d.phx];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, arizona] }} }).toArray() to return 4 documents.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(4);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, nevada] }} }).toArray() to return 3 documents.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(3);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [nevada, arizona] }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [nevada, utah] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry LineString:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([cia, c2a] to return an array with all the documents.', async () => {
            const doc = [d.cia, d.c2a];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, arizona] }} }).toArray() to return 2 documents.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(2);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, nevada] }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [arizona, nevada] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [nevada, utah] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry MultiPoint:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([cai, cpai] to return an array with all the documents.', async () => {
            const doc = [d.cai, d.cpai];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, arizona] }} }).toArray() to return 2 documents.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(2);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, nevada] }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [arizona, nevada] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [nevada, utah] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry MultiLineString:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([ciaplus, c2aplus]) to return an array with all the documents.', async () => {
            const doc = [d.ciaplus, d.c2aplus];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, arizona] }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [arizona, nevada] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });

        describe('Geometry Polygon:', () => {
          const db2 = PicoDB();
          db2._db._silent = true;

          it('Expects db.insertMany([pinc, pca, pina] to return an array with all the documents.', async () => {
            const doc = [d.pinc, d.pca, d.pina];
            const resp = await db2.insertMany(doc);
            expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, arizona] }} }).toArray() to return 3 documents.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(3);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [california, nevada] }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [arizona, nevada] }} }).toArray() to return 1 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(1);
          });

          it('Expects db.find({ loc: { $geoWithin: { $geometry: { type: "MultiPolygon", coordinates: [nevada, utah] }} }).toArray() to return 0 document.', async () => {
            const resp = await db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray();
            expect(resp).to.be.an('array').that.has.lengthOf(0);
          });
        });
      });
    });
  });
};
