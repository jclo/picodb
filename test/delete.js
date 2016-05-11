/* global describe, it */
/* eslint  max-len: [1, 120, 1] */
'use strict';

// -- Node modules
var expect = require('chai').expect
  ;

// -- Local modules
var PicoDB = require('../index.js')
  ;

// -- Local constants


// -- Main
module.exports = function() {

  describe('The method deleteOne:', function() {
    var db = PicoDB.Create()
      , doc
      ;

    doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 }},
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] }},
      { a: { b: { c: { d: { e: 1 }}}}}
    ];

    it('Expects the method with an undefined database not to throw any error.', function() {
      db.deleteOne();
    });

    it('Expects the method with the filter { a: 2 } not to return any error.', function(done) {
      db.insertMany(doc, function() {
        db.deleteOne({ a: 2 }, function(err) {
          expect(err).to.be.null;
          done();
        });
      });
    });

    it('Expects the method with the filter { a: 2 } to return zero doc deleted.', function(done) {
      db.deleteOne({ a: 2 }, function(err, deleted) {
        expect(deleted).to.be.equal(0);
        done();
      });
    });

    it('Expects the method with the filter { a: 1 } to return 1 doc deleted.', function(done) {
      db.deleteOne({ a: 1 }, function(err, deleted) {
        expect(deleted).to.be.equal(1);
        done();
      });
    });

    it('Expects the method with the filter {} to return 1 doc deleted.', function(done) {
      db.deleteOne({}, function(err, deleted) {
        expect(deleted).to.be.equal(1);
        done();
      });
    });

    it('Expects the method with the filter {} and no callback not to throw any error.', function() {
      db.deleteOne({});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong filter ([]) to return null.', function(done) {
      db.deleteOne([], function(err, deleted) {
        expect(deleted).to.be.null;
        done();
      });
    });

    it('Expects the method with a wrong filter ([]) and no callback not to throw any error.', function() {
      db.deleteOne([]);
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', function() {
      db.deleteOne({ a: 1 }, {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', function() {
      db.deleteOne({ a: 1 }, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method with wrong callback and options not to throw any error.', function() {
      db.deleteOne({ a: 1 }, function() {}, function() {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', function() {
      db.deleteOne({ a: 1 }, []);
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', function() {
      db.deleteOne();
      expect(true).to.be.true;
    });
  });

  describe('The method deleteMany:', function() {
    var db = PicoDB.Create()
      , doc
      ;

    doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 }},
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] }},
      { a: { b: { c: { d: { e: 1 }}}}}
    ];

    it('Expects the method with an undefined database not to throw any error.', function() {
      db.deleteMany();
    });

    it('Expects the method with the filter {} to return 5 deleted documents.', function(done) {
      db.insertMany(doc, function() {
        db.deleteMany({}, function(err, deleted) {
          expect(deleted).to.be.equal(5);
          done();
        });
      });
    });

    it('Expects the method with the filter { a: 1 } to return 4 deleted documents.', function(done) {
      db.insertMany(doc, function() {
        db.deleteMany({ a: 1 }, function(err, deleted) {
          expect(deleted).to.be.equal(4);
          done();
        });
      });
    });
  });
};
