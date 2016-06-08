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

var cai = {
  name: 'California Airports',
  type: 'International',
  code: '-',
  loc: {
    type: 'MultiPoint',
    coordinates: [
      [-118.412581, 33.944117],
      [-122.382674, 37.621642],
      [-117.189724, 32.733917]
    ]
  }
};

var cpai = {
  name: 'California and Arizona Airports',
  type: 'International',
  code: '-',
  loc: {
    type: 'MultiPoint',
    coordinates: [
      [-118.412581, 33.944117],
      [-122.382674, 37.621642],
      [-117.189724, 32.733917],
      [-112.011559, 33.434539]
    ]
  }
};

// Boxes surrounding airports:
var sfo_alone = [[-122.416865, 37.569838], [-122.166926, 37.969322]];
var lax_sfo_san_phx = [[-123.422810, 38.859617], [-109.675695, 31.867779]];
var lax_phx = [[-119.158175, 34.352516], [-111.626853, 33.105325]];
var sfo_lax = [[-123.379009, 38.285678], [-116.984801, 33.550482]];

// Polygons surrounding airports:
var p_sfo = [[-122.791995, 37.735612], [-122.407454, 38.069684], [-122.290926, 37.603405]];
var p_sfo_san = [[-123.464417, 38.010944], [-121.040755, 38.161299], [-118.820060, 33.169072], [-116.229249, 33.059071], [-117.148569, 31.351899]];


var cia = {
  name: 'LineString inside California',
  loc: { type: 'LineString', coordinates: [ [-117.844126, 35.474386], [-115.680319, 34.163808]] }
};

var ciaplus = {
  name: 'Multiple LineString inside California',
  loc: {
    type: 'MultiLineString',
    coordinates: [
      [[-117.844126, 35.474386], [-115.680319, 34.163808]],
      [[-120.461033, 38.304856], [-120.233862, 37.408060], [-119.268383, 34.582782]],
      [[-116.429298, 34.506578], [-116.245495, 33.398331], [-115.191894, 33.264049], [-114.643132, 32.804465]]
    ]
  }
};

var c2a = {
  name: 'LineString from California to Arizona',
  loc: { type: 'LineString', coordinates: [ [-117.844126, 35.474386], [-115.680319, 34.163808], [-113.054724, 33.241810]] }
};

var c2aplus = {
  name: 'Multiple LineString from California to Arizona',
  loc: {
    type: 'LineString',
    coordinates: [
      [[-117.844126, 35.474386], [-115.680319, 34.163808], [-113.054724, 33.241810]],
      [[-120.742173,37.608024], [-119.291514,35.895264], [-116.252764,34.308765], [-114.015695,33.929515]],
      [[-110.191751,36.313820], [-113.584705,33.992627], [-116.084776,33.204302]]
    ]
  }
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


// -- Main
module.exports = function() {

  describe('Query Operators:', function() {

    describe('GeoSpatial Operators:', function() {

      describe('$geoWithins:', function() {
        var db = PicoDB.Create()
          ;

        describe('$box:', function() {

          it('Expects query { loc: { $geoWithin: { $box: sfo_alone }} } to return 1 document.', function(done) {
            db.insertMany([jfk, lax, sfo, san, phx, c2a, pinc, pca, pina, us.california, us.nevada, us.oregon, us.utah], function() {
              db.find({ type: 'International', loc: { $geoWithin: { $box: sfo_alone }}}).toArray(function(err, doc) {
                expect(doc).to.have.lengthOf(1);
                done();
              });
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: lax_sfo_san_phx }} } to return 4 documents.', function() {
            db.find({ type: 'International', loc: { $geoWithin: { $box: lax_sfo_san_phx }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(4);
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: lax_phx }} } to return 2 documents.', function() {
            db.find({ type: 'International', loc: { $geoWithin: { $box: lax_phx }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(2);
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: sfo_lax }} } to return 2 documents.', function() {
            db.find({ type: 'International', loc: { $geoWithin: { $box: sfo_lax }}}).toArray(function(err, doc) {
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

          describe('Type Polygon:', function() {

            describe('Geometry Point:', function() {
              var db1 = PicoDB.Create()
                ;

              it('Expects query on jfk, lax, sfo, san, phx for california polygon to return 3 documents.', function(done) {
                db1.insertMany([jfk, lax, sfo, san, phx], function() {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(3);
                    done();
                  });
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for arizona polygon to return 1 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for new_york polygon to return 1 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.new_york.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for utah polygon to return 0 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.utah.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry LineString:', function() {
              var db1 = PicoDB.Create()
                ;

              it('Expects query on cia, c2a for california polygon to return 1 document.', function(done) {
                db1.insertMany([cia, c2a], function() {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on cia, c2a for arizona polygon to return 0 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiPoint:', function() {
              var db1 = PicoDB.Create()
                ;

              it('Expects query on cai, cpai for california polygon to return 1 document.', function(done) {
                db1.insertMany([cai, cpai], function() {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on cai, cpai for arizona polygon to return 0 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiLineString', function() {
              var db1 = PicoDB.Create()
                ;

              it('Expects query on ciaplus, c2aplus for california polygon to return 1 document.', function(done) {
                db1.insertMany([ciaplus, c2aplus], function() {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on ciaplus, c2aplus for arizona polygon to return 0 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry Polygon', function() {
              var db1 = PicoDB.Create()
                ;

              it('Expects query on pinc, pca, pina for california polygon to return 1 document.', function(done) {
                db1.insertMany([pinc, pca, pina], function() {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on pinc, pca, pina for arizona polygon to return 1 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on pinc, pca, pina for nevada polygon to return 0 document.', function() {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });
          });

          describe('Type MultiPolygon:', function() {

            describe('Geometry Point:', function() {
              var db2 = PicoDB.Create()
                ;

              it('Expects query on jfk, lax, sfo, san, phx for california and arizona multipolygon to return 4 documents.', function(done) {
                db2.insertMany([jfk, lax, sfo, san, phx], function() {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(4);
                    done();
                  });
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for california and nevada multipolygon to return 3 documents.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(3);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for nevada and arizona multipolygon to return 1 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.arizona.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for nevada and utah multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry LineString:', function() {
              var db2 = PicoDB.Create()
                ;

              it('Expects query on cia, c2a for california and arizona multipolygon to return 2 documents.', function(done) {
                db2.insertMany([cia, c2a], function() {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(2);
                    done();
                  });
                });
              });

              it('Expects query on cia, c2a for california and nevada multipolygon to return 1 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on cia, c2a for arizona and nevada multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });

              it('Expects query on cia, c2a for nevada and utah multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiPoint:', function() {
              var db2 = PicoDB.Create()
                ;

              it('Expects query on cai, cpai for california and arizona multipolygon to return 2 documents.', function(done) {
                db2.insertMany([cai, cpai], function() {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(2);
                    done();
                  });
                });
              });

              it('Expects query on cai, cpai for california and nevada multipolygon to return 1 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on cai, cpai for california and nevada multipolygon to return 1 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on cai, cpai for arizona and nevada multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });

              it('Expects query on cai, cpai for nevada and utah multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiLineString:', function() {
              var db2 = PicoDB.Create()
                ;

              it('Expects query on ciaplus, c2aplus for california and arizona multipolygon to return 1 document.', function(done) {
                db2.insertMany([ciaplus, c2aplus], function() {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on ciaplus, c2aplus for arizona and nevada multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry Polygon:', function() {
              var db2 = PicoDB.Create()
                ;

              it('Expects query on pinc, pca, pina for california and arizona multipolygon to return 3 documents.', function(done) {
                db2.insertMany([pinc, pca, pina], function() {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } }}}).toArray(function(err, doc) {
                    expect(doc).to.have.lengthOf(3);
                    done();
                  });
                });
              });

              it('Expects query on pinc, pca, pina for california and nevada multipolygon to return 1 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on pinc, pca, pina for arizona and nevada multipolygon to return 1 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on pinc, pca, pina for nevada and utah multipolygon to return 0 document.', function() {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } }}}).toArray(function(err, doc) {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });
          });
        });
      });

      describe('$geoIntersects:', function() {
        var db = PicoDB.Create()
          ;

        describe('LineString:', function() {

          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 1 document.', function(done) {
            db.insertMany([jfk, lax, sfo, san, phx, c2a, pinc, pca, pina, us.california, us.nevada, us.oregon, us.utah], function() {
              db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } }} }).toArray(function(err, doc) {
                expect(doc).to.have.lengthOf(1);
                done();
              });
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

      describe('$near:', function() {
        var db = PicoDB.Create()
          //, _geo = eval(fs.readFileSync('./src/geo.js').toString())
          , _geo = db._export('_geo')
          ;

        describe('Test of private functions:', function() {

          describe('law of haversines:', function() {
            it('Expects the distance between the airports of SF and LA to be below 600 km.', function() {
              expect(_geo._lawOfHaversines(sfo.loc, lax.loc)).to.be.below(600000);
            });
          });

          describe('law of cosines:', function() {
            it('Expects the distance between the airports of SF and LA to be below 600 km.', function() {
              expect(_geo._lawOfCosines(sfo.loc, lax.loc)).to.be.below(600000);
            });
          });

          describe('equirectangular projection:', function() {
            it('Expects the distance between the airports of SF and LA to be below 600 km.', function() {
              expect(_geo._equirectangularProjection(sfo.loc, lax.loc)).to.be.below(600000);
            });
          });

        });

        describe('Test of proximity:', function() {

          it('Expects $near with no $maxDistance to return 5 documents.', function(done) {
            db.insertMany([jfk, lax, sfo, san, phx, cai], function() {
              db.find({ loc: { $near: { $geometry: jfk.loc }}}).toArray(function(err, doc) {
                expect(doc).to.have.lengthOf(5);
                done();
              });
            });
          });

          it('Expects $near with $maxDistance 100 km to return 1 document.', function() {
            db.find({ loc: { $near: { $geometry: jfk.loc, $maxDistance: 100000 }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects $near with $maxDistance 100 km and $minDistance 10 km to return 0 document.', function() {
            db.find({ loc: { $near: { $geometry: jfk.loc, $maxDistance: 100000, $minDistance: 10000 }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects $near with $maxDistance lower than $minDistance to return 0 document.', function() {
            db.find({ loc: { $near: { $geometry: jfk.loc, $maxDistance: 10, $minDistance: 10000 }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects $near with a $geometry other than "Point" to return 0 document.', function() {
            db.find({ loc: { $near: { $geometry: cai.loc }}}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects $near without $geometry operator to return 0 document.', function() {
            db.find({ loc: { $near: {} }}).toArray(function(err, doc) {
              expect(doc).to.have.lengthOf(0);
            });
          });
        });
      });
    });
  });
};
