/* global describe, it */
/* eslint  max-len: 0, camelcase: 0 */
'use strict';

// -- Node modules
var expect = require('chai').expect
  ;

// -- Local modules
var PicoDB = require('../index.js')
  , us     = require('./usa.js')
  ;

// -- Local constants
var jfk = {
  name: 'John F Kennedy Intl',
  type: 'International',
  code: 'JFK',
  loc: { type: 'Point', coordinates: [ -73.778889, 40.639722 ]}
};

var lax = {
  name: 'Los Angeles International Airport',
  type: 'International',
  code: 'LAX',
  loc: { type: 'Point', coordinates: [-118.412581, 33.944117]}
};

var sfo = {
  name: 'San Francisco International Airport',
  type: 'International',
  code: 'SFO',
  loc: { type: 'Point', coordinates: [-122.382674, 37.621642]}
};

var san = {
  name: 'San Diego International Airport',
  type: 'International',
  code: 'SAN',
  loc: { type: 'Point', coordinates: [-117.189724, 32.733917]}
};

var phx = {
  name: 'Sky Harbor International Airport',
  type: 'International',
  code: 'PHX',
  loc: { type: 'Point', coordinates: [-112.011559, 33.434539]}
};

// Boxes surrounding airports:
var sfo_alone = [[-122.416865, 37.569838], [-122.166926, 37.969322]];
var lax_sfo_san_phx = [[-123.422810, 38.859617], [-109.675695, 31.867779]];
var lax_phx = [[-119.158175, 34.352516], [-111.626853, 33.105325]];
var sfo_lax = [[-123.379009, 38.285678], [-116.984801, 33.550482]];

// Polygons surrounding airports:
var p_sfo = [[-122.791995, 37.735612], [-122.407454, 38.069684], [-122.290926, 37.603405]];
var p_sfo_san = [[-123.464417, 38.010944], [-121.040755, 38.161299], [-118.820060, 33.169072], [-116.229249, 33.059071], [-117.148569, 31.351899]];

var c2a = {
  name: 'LineString from California to Arizona',
  loc: { type: 'LineString', coordinates: [ [-117.844126, 35.474386], [-115.680319, 34.163808], [-113.054724, 33.241810]] }
};

var pinc = {
  name: 'Polygon inside California',
  loc: {
    type: 'Polygon',
    coordinates: [[[-121.145223, 36.328949],[-118.701559, 37.589239],[-116.035744, 33.060344],[-121.145223, 36.328949]]]
  }
};

var pca = {
  name: 'Polygon straddling California and Arizona',
  loc: {
    type: 'Polygon',
    coordinates: [[[-123.611111, 39.738829],[-121.249398, 40.902991],[-117.869706, 35.879994],[-113.207358, 34.465468],[-116.566692, 33.333281],[-123.611111, 39.738829]]]
  }
};

var pina = {
  name: 'Polygon inside Arizona',
  loc: {
    type: 'Polygon',
    coordinates: [[[-113.560760, 32.839403],[-109.928685,31.845991],[-109.928685, 36.176015],[-113.613020, 34.900303],[-113.560760, 32.839403]]]
  }
};


// -- Local variables
var db = PicoDB.Create()
  ;

// -- Main
module.exports = function() {

  describe('Query Operators:', function() {

    describe('GeoSpatial Operators:', function() {

      describe('$geoWithins:', function() {

        describe('$box:', function() {

          it('Expects query { loc: { $geoWithin: { $box: sfo_alone }} } to return 1 document.', function(done) {
            db.insertMany([jfk, lax, sfo, san, phx, c2a, pinc, pca, pina, us.california, us.nevada, us.oregon, us.utah], function() {
              db.find({ loc: { $geoWithin: { $box: sfo_alone }}}).toArray(function(err, doc) {
                expect(doc).to.have.lengthOf(1);
                done();
              });
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: lax_sfo_san_phx }} } to return 4 documents.', function() {
            db.find({ loc: { $geoWithin: { $box: lax_sfo_san_phx }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(4);
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: lax_phx }} } to return 2 documents.', function() {
            db.find({ loc: { $geoWithin: { $box: lax_phx }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(2);
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: sfo_lax }} } to return 2 documents.', function() {
            db.find({ loc: { $geoWithin: { $box: sfo_lax }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(2);
            });
          });
        });

        describe('$polygon:', function() {

          it('Expects query { loc: { $geoWithin: { $polygon: p_sfo }} } to return 1 document.', function() {
            db.find({ loc: { $geoWithin: { $polygon: p_sfo }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { loc: { $geoWithin: { $polygon: p_sfo_san }} } to return 2 documents.', function() {
            db.find({ loc: { $geoWithin: { $polygon: p_sfo_san }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(2);
            });
          });
        });

        describe('$center:', function() {

          it('Expects query { loc: { $geoWithin: { $center: [jfk.loc.coordinates, 1] }} } to return 1 document.', function() {
            db.find({ loc: { $geoWithin: { $center: [jfk.loc.coordinates, 1] }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { loc: { $geoWithin: { $center: $center: [jfk.loc.coordinates, 50] }} } to return 5 documents.', function() {
            db.find({ loc: { $geoWithin: { $center: [jfk.loc.coordinates, 50] }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(5);
            });
          });
        });

        describe('$centerSphere:', function() {

          it('Expects query { loc: { $geoWithin: { $centerSphere: [jfk.loc.coordinates, 100 / 6378.1 ] }} } to return 1 document.', function() {
            db.find({ loc: { $geoWithin: { $center: [jfk.loc.coordinates, (100 / 6378.1)] }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, 200 / 6378.1 ] }} } to return 2 documents.', function() {
            db.find({ loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, (200 / 6378.1)] }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(2);
            });
          });

          it('Expects query { loc: { $geoWithin: { $centerSphere: [san.loc.coordinates, 600 / 6378.1 ] }} } to return 2 documents.', function() {
            db.find({ loc: { $geoWithin: { $centerSphere: [san.loc.coordinates, (600 / 6378.1)] }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(3);
            });
          });

          it('Expects query { loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, 750 / 6378.1 ] }} } to return 2 documents.', function() {
            db.find({ loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, (750 / 6378.1)] }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(4);
            });
          });
        });

        describe('$geometry:', function() {

          describe('Polygon:', function() {
            it('Expects query { loc: { $geoWithin: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates } }} } to return 1 document.', function() {
              db.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }}}).toArray(function(err, doc) {
                expect(doc).to.have.lengthOf(1);
              });
            });
          });

          describe('MultiPolygon:', function() {
            it('Expects query { loc: { $geoWithin: { $geometry: { type: "Multipolygon", coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates]} }} } to return 4 documents.', function() {
              db.find({ loc: { $geoWithin: { $geometry: { type: 'Multipolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates]} }}}).toArray(function(err, doc) {
                expect(doc).to.have.lengthOf(4);
              });
            });
          });
        });
      });

      describe('$geoIntersects:', function() {

        // polygon - intersects LineString & Polygon

        describe('LineString:', function() {

          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 1 document.', function() {
            db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.california.geometry.coordinates }}}} to return 1 document.', function() {
            db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.nevada.geometry.coordinates }}}} to return 0 document.', function() {
            db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });
        });

        describe('Polygon:', function() {

          it('Expects query { name: "Polygon straddling California and Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 1 document.', function() {
            db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "Polygon straddling California and Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.california.geometry.coordinates }}}} to return 1 document.', function() {
            db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "Polygon straddling California and Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.nevada.geometry.coordinates }}}} to return 0 document.', function() {
            db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects query { name: "Polygon inside Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 0 document.', function() {
            db.find({ name: 'Polygon inside Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects query { name: "Polygon inside Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.california.geometry.coordinates }}}} to return 0 document.', function() {
            db.find({ name: 'Polygon inside Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }} }).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });
        });
      });
    });
  });
};
