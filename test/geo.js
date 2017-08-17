/* global describe, it */
/* eslint one-var: 0, max-len: [1, 250, 0], import/no-extraneous-dependencies: 0,
  camelcase: 0, no-underscore-dangle: 0  */

'use strict';

// -- Node modules
const expect = require('chai').expect
    ;

// -- Local modules
const PicoDB = require('../index.js')
    , us     = require('./usa.js')
    ;

// -- Local constants
const jfk = {
  name: 'John F Kennedy Intl',
  type: 'International',
  code: 'JFK',
  loc: { type: 'Point', coordinates: [-73.778889, 40.639722] },
};

const lax = {
  name: 'Los Angeles International Airport',
  type: 'International',
  code: 'LAX',
  loc: { type: 'Point', coordinates: [-118.412581, 33.944117] },
};

const sfo = {
  name: 'San Francisco International Airport',
  type: 'International',
  code: 'SFO',
  loc: { type: 'Point', coordinates: [-122.382674, 37.621642] },
};

const san = {
  name: 'San Diego International Airport',
  type: 'International',
  code: 'SAN',
  loc: { type: 'Point', coordinates: [-117.189724, 32.733917] },
};

const phx = {
  name: 'Sky Harbor International Airport',
  type: 'International',
  code: 'PHX',
  loc: { type: 'Point', coordinates: [-112.011559, 33.434539] },
};

const cai = {
  name: 'California Airports',
  type: 'International',
  code: '-',
  loc: {
    type: 'MultiPoint',
    coordinates: [
      [-118.412581, 33.944117],
      [-122.382674, 37.621642],
      [-117.189724, 32.733917],
    ],
  },
};

const cpai = {
  name: 'California and Arizona Airports',
  type: 'International',
  code: '-',
  loc: {
    type: 'MultiPoint',
    coordinates: [
      [-118.412581, 33.944117],
      [-122.382674, 37.621642],
      [-117.189724, 32.733917],
      [-112.011559, 33.434539],
    ],
  },
};

// Boxes surrounding airports:
const sfo_alone = [[-122.416865, 37.569838], [-122.166926, 37.969322]];
const lax_sfo_san_phx = [[-123.422810, 38.859617], [-109.675695, 31.867779]];
const lax_phx = [[-119.158175, 34.352516], [-111.626853, 33.105325]];
const sfo_lax = [[-123.379009, 38.285678], [-116.984801, 33.550482]];

// Polygons surrounding airports:
const p_sfo = [[-122.791995, 37.735612], [-122.407454, 38.069684], [-122.290926, 37.603405]];
const p_sfo_san = [[-123.464417, 38.010944], [-121.040755, 38.161299], [-118.820060, 33.169072], [-116.229249, 33.059071], [-117.148569, 31.351899]];


const cia = {
  name: 'LineString inside California',
  loc: { type: 'LineString', coordinates: [[-117.844126, 35.474386], [-115.680319, 34.163808]] },
};

const ciaplus = {
  name: 'Multiple LineString inside California',
  loc: {
    type: 'MultiLineString',
    coordinates: [
      [[-117.844126, 35.474386], [-115.680319, 34.163808]],
      [[-120.461033, 38.304856], [-120.233862, 37.408060], [-119.268383, 34.582782]],
      [[-116.429298, 34.506578], [-116.245495, 33.398331], [-115.191894, 33.264049], [-114.643132, 32.804465]],
    ],
  },
};

const c2a = {
  name: 'LineString from California to Arizona',
  loc: { type: 'LineString', coordinates: [[-117.844126, 35.474386], [-115.680319, 34.163808], [-113.054724, 33.241810]] },
};

const c2aplus = {
  name: 'Multiple LineString from California to Arizona',
  loc: {
    type: 'LineString',
    coordinates: [
      [[-117.844126, 35.474386], [-115.680319, 34.163808], [-113.054724, 33.241810]],
      [[-120.742173, 37.608024], [-119.291514, 35.895264], [-116.252764, 34.308765], [-114.015695, 33.929515]],
      [[-110.191751, 36.313820], [-113.584705, 33.992627], [-116.084776, 33.204302]],
    ],
  },
};

const pinc = {
  name: 'Polygon inside California',
  loc: {
    type: 'Polygon',
    coordinates: [[[-121.145223, 36.328949], [-118.701559, 37.589239], [-116.035744, 33.060344], [-121.145223, 36.328949]]],
  },
};

const pca = {
  name: 'Polygon straddling California and Arizona',
  loc: {
    type: 'Polygon',
    coordinates: [[[-123.611111, 39.738829], [-121.249398, 40.902991], [-117.869706, 35.879994], [-113.207358, 34.465468], [-116.566692, 33.333281], [-123.611111, 39.738829]]],
  },
};

const pina = {
  name: 'Polygon inside Arizona',
  loc: {
    type: 'Polygon',
    coordinates: [[[-113.560760, 32.839403], [-109.928685, 31.845991], [-109.928685, 36.176015], [-113.613020, 34.900303], [-113.560760, 32.839403]]],
  },
};

// -- Local variables


// -- Main
module.exports = () => {
  describe('Query Operators:', () => {
    describe('GeoSpatial Operators:', () => {
      describe('$geoWithins:', () => {
        const db = PicoDB.Create()
            ;

        describe('$box:', () => {
          it('Expects query { loc: { $geoWithin: { $box: sfo_alone }} } to return 1 document.', (done) => {
            db.insertMany([jfk, lax, sfo, san, phx, c2a, pinc, pca, pina, us.california, us.nevada, us.oregon, us.utah], () => {
              db.find({ type: 'International', loc: { $geoWithin: { $box: sfo_alone } } }).toArray((err, doc) => {
                expect(doc).to.have.lengthOf(1);
                done();
              });
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: lax_sfo_san_phx }} } to return 4 documents.', () => {
            db.find({ type: 'International', loc: { $geoWithin: { $box: lax_sfo_san_phx } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(4);
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: lax_phx }} } to return 2 documents.', () => {
            db.find({ type: 'International', loc: { $geoWithin: { $box: lax_phx } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(2);
            });
          });

          it('Expects query { loc: { $geoWithin: { $box: sfo_lax }} } to return 2 documents.', () => {
            db.find({ type: 'International', loc: { $geoWithin: { $box: sfo_lax } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(2);
            });
          });
        });

        describe('$polygon:', () => {
          it('Expects query { loc: { $geoWithin: { $polygon: p_sfo }} } to return 1 document.', () => {
            db.find({ loc: { $geoWithin: { $polygon: p_sfo } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { loc: { $geoWithin: { $polygon: p_sfo_san }} } to return 2 documents.', () => {
            db.find({ loc: { $geoWithin: { $polygon: p_sfo_san } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(2);
            });
          });
        });

        describe('$center:', () => {
          it('Expects query { loc: { $geoWithin: { $center: [jfk.loc.coordinates, 1] }} } to return 1 document.', () => {
            db.find({ loc: { $geoWithin: { $center: [jfk.loc.coordinates, 1] } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { loc: { $geoWithin: { $center: $center: [jfk.loc.coordinates, 50] }} } to return 5 documents.', () => {
            db.find({ loc: { $geoWithin: { $center: [jfk.loc.coordinates, 50] } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(5);
            });
          });
        });

        describe('$centerSphere:', () => {
          it('Expects query { loc: { $geoWithin: { $centerSphere: [jfk.loc.coordinates, 100 / 6378.1 ] }} } to return 1 document.', () => {
            db.find({ loc: { $geoWithin: { $center: [jfk.loc.coordinates, (100 / 6378.1)] } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, 200 / 6378.1 ] }} } to return 2 documents.', () => {
            db.find({ loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, (200 / 6378.1)] } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(2);
            });
          });

          it('Expects query { loc: { $geoWithin: { $centerSphere: [san.loc.coordinates, 600 / 6378.1 ] }} } to return 2 documents.', () => {
            db.find({ loc: { $geoWithin: { $centerSphere: [san.loc.coordinates, (600 / 6378.1)] } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(3);
            });
          });

          it('Expects query { loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, 750 / 6378.1 ] }} } to return 2 documents.', () => {
            db.find({ loc: { $geoWithin: { $centerSphere: [lax.loc.coordinates, (750 / 6378.1)] } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(4);
            });
          });
        });

        describe('$geometry:', () => {
          describe('Type Polygon:', () => {
            describe('Geometry Point:', () => {
              const db1 = PicoDB.Create()
                  ;

              it('Expects query on jfk, lax, sfo, san, phx for california polygon to return 3 documents.', (done) => {
                db1.insertMany([jfk, lax, sfo, san, phx], () => {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(3);
                    done();
                  });
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for arizona polygon to return 1 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for new_york polygon to return 1 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.new_york.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for utah polygon to return 0 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.utah.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry LineString:', () => {
              const db1 = PicoDB.Create()
                  ;

              it('Expects query on cia, c2a for california polygon to return 1 document.', (done) => {
                db1.insertMany([cia, c2a], () => {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on cia, c2a for arizona polygon to return 0 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiPoint:', () => {
              const db1 = PicoDB.Create()
                  ;

              it('Expects query on cai, cpai for california polygon to return 1 document.', (done) => {
                db1.insertMany([cai, cpai], () => {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on cai, cpai for arizona polygon to return 0 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiLineString', () => {
              const db1 = PicoDB.Create()
                  ;

              it('Expects query on ciaplus, c2aplus for california polygon to return 1 document.', (done) => {
                db1.insertMany([ciaplus, c2aplus], () => {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on ciaplus, c2aplus for arizona polygon to return 0 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry Polygon', () => {
              const db1 = PicoDB.Create()
                  ;

              it('Expects query on pinc, pca, pina for california polygon to return 1 document.', (done) => {
                db1.insertMany([pinc, pca, pina], () => {
                  db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on pinc, pca, pina for arizona polygon to return 1 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on pinc, pca, pina for nevada polygon to return 0 document.', () => {
                db1.find({ loc: { $geoWithin: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });
          });

          describe('Type MultiPolygon:', () => {
            describe('Geometry Point:', () => {
              const db2 = PicoDB.Create()
                ;

              it('Expects query on jfk, lax, sfo, san, phx for california and arizona multipolygon to return 4 documents.', (done) => {
                db2.insertMany([jfk, lax, sfo, san, phx], () => {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(4);
                    done();
                  });
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for california and nevada multipolygon to return 3 documents.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(3);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for nevada and arizona multipolygon to return 1 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on jfk, lax, sfo, san, phx for nevada and utah multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry LineString:', () => {
              const db2 = PicoDB.Create()
                  ;

              it('Expects query on cia, c2a for california and arizona multipolygon to return 2 documents.', (done) => {
                db2.insertMany([cia, c2a], () => {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(2);
                    done();
                  });
                });
              });

              it('Expects query on cia, c2a for california and nevada multipolygon to return 1 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on cia, c2a for arizona and nevada multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });

              it('Expects query on cia, c2a for nevada and utah multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiPoint:', () => {
              const db2 = PicoDB.Create()
                  ;

              it('Expects query on cai, cpai for california and arizona multipolygon to return 2 documents.', (done) => {
                db2.insertMany([cai, cpai], () => {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(2);
                    done();
                  });
                });
              });

              it('Expects query on cai, cpai for california and nevada multipolygon to return 1 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on cai, cpai for california and nevada multipolygon to return 1 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on cai, cpai for arizona and nevada multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });

              it('Expects query on cai, cpai for nevada and utah multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry MultiLineString:', () => {
              const db2 = PicoDB.Create()
                  ;

              it('Expects query on ciaplus, c2aplus for california and arizona multipolygon to return 1 document.', (done) => {
                db2.insertMany([ciaplus, c2aplus], () => {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(1);
                    done();
                  });
                });
              });

              it('Expects query on ciaplus, c2aplus for arizona and nevada multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });

            describe('Geometry Polygon:', () => {
              const db2 = PicoDB.Create()
                  ;

              it('Expects query on pinc, pca, pina for california and arizona multipolygon to return 3 documents.', (done) => {
                db2.insertMany([pinc, pca, pina], () => {
                  db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.arizona.geometry.coordinates] } } } }).toArray((err, doc) => {
                    expect(doc).to.have.lengthOf(3);
                    done();
                  });
                });
              });

              it('Expects query on pinc, pca, pina for california and nevada multipolygon to return 1 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.california.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on pinc, pca, pina for arizona and nevada multipolygon to return 1 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.arizona.geometry.coordinates, us.nevada.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(1);
                });
              });

              it('Expects query on pinc, pca, pina for nevada and utah multipolygon to return 0 document.', () => {
                db2.find({ loc: { $geoWithin: { $geometry: { type: 'MultiPolygon', coordinates: [us.nevada.geometry.coordinates, us.utah.geometry.coordinates] } } } }).toArray((err, doc) => {
                  expect(doc).to.have.lengthOf(0);
                });
              });
            });
          });
        });
      });

      describe('$geoIntersects:', () => {
        const db = PicoDB.Create()
            ;

        describe('LineString:', () => {
          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 1 document.', (done) => {
            db.insertMany([jfk, lax, sfo, san, phx, c2a, pinc, pca, pina, us.california, us.nevada, us.oregon, us.utah], () => {
              db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
                expect(doc).to.have.lengthOf(1);
                done();
              });
            });
          });

          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.california.geometry.coordinates }}}} to return 1 document.', () => {
            db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "LineString from California to Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.nevada.geometry.coordinates }}}} to return 0 document.', () => {
            db.find({ name: 'LineString from California to Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });
        });

        describe('Polygon:', () => {
          it('Expects query { name: "Polygon straddling California and Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 1 document.', () => {
            db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "Polygon straddling California and Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.california.geometry.coordinates }}}} to return 1 document.', () => {
            db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects query { name: "Polygon straddling California and Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.nevada.geometry.coordinates }}}} to return 0 document.', () => {
            db.find({ name: 'Polygon straddling California and Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.nevada.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects query { name: "Polygon inside Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.arizona.geometry.coordinates }}}} to return 0 document.', () => {
            db.find({ name: 'Polygon inside Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.arizona.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects query { name: "Polygon inside Arizona", geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: us.california.geometry.coordinates }}}} to return 0 document.', () => {
            db.find({ name: 'Polygon inside Arizona', loc: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: us.california.geometry.coordinates } } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });
        });
      });

      describe('$near:', () => {
        const db = PicoDB.Create()
          // , _geo = eval(fs.readFileSync('./src/geo.js').toString())
            , _geo = db._export('_geo')
            ;

        describe('Test of private functions:', () => {
          describe('law of haversines:', () => {
            it('Expects the distance between the airports of SF and LA to be below 600 km.', () => {
              expect(_geo._lawOfHaversines(sfo.loc, lax.loc)).to.be.below(600000);
            });
          });

          describe('law of cosines:', () => {
            it('Expects the distance between the airports of SF and LA to be below 600 km.', () => {
              expect(_geo._lawOfCosines(sfo.loc, lax.loc)).to.be.below(600000);
            });
          });

          describe('equirectangular projection:', () => {
            it('Expects the distance between the airports of SF and LA to be below 600 km.', () => {
              expect(_geo._equirectangularProjection(sfo.loc, lax.loc)).to.be.below(600000);
            });
          });
        });

        describe('Test of proximity:', () => {
          it('Expects $near with no $maxDistance to return 5 documents.', (done) => {
            db.insertMany([jfk, lax, sfo, san, phx, cai], () => {
              db.find({ loc: { $near: { $geometry: jfk.loc } } }).toArray((err, doc) => {
                expect(doc).to.have.lengthOf(5);
                done();
              });
            });
          });

          it('Expects $near with $maxDistance 100 km to return 1 document.', () => {
            db.find({ loc: { $near: { $geometry: jfk.loc, $maxDistance: 100000 } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(1);
            });
          });

          it('Expects $near with $maxDistance 100 km and $minDistance 10 km to return 0 document.', () => {
            db.find({ loc: { $near: { $geometry: jfk.loc, $maxDistance: 100000, $minDistance: 10000 } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects $near with $maxDistance lower than $minDistance to return 0 document.', () => {
            db.find({ loc: { $near: { $geometry: jfk.loc, $maxDistance: 10, $minDistance: 10000 } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects $near with a $geometry other than "Point" to return 0 document.', () => {
            db.find({ loc: { $near: { $geometry: cai.loc } } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });

          it('Expects $near without $geometry operator to return 0 document.', () => {
            db.find({ loc: { $near: {} } }).toArray((err, doc) => {
              expect(doc).to.have.lengthOf(0);
            });
          });
        });
      });
    });
  });
};
