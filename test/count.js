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

  describe('The method count:', function() {
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
      db.count({});
    });

    it('Expects the filter {} to return count = 4.', function(done) {
      db.insertMany(doc, function() {
        db.count({ a: 1 }, function(err, count) {
          expect(count).to.be.equal(4);
          done();
        });
      });
    });

    it('Expects the filter { a: 1 } to return count = 4.', function(done) {
      db.count({ a: 1 }, function(err, count) {
        expect(count).to.be.equal(4);
        done();
      });
    });

    it('Expects the filter { a: 1, b: 1 } to return count = 3.', function(done) {
      db.count({ a: 1, b: 1 }, function(err, count) {
        expect(count).to.be.equal(3);
        done();
      });
    });

    it('Expects the filter { a: 1, b: 1, c: { d: 1 } } to return count = 2.', function(done) {
      db.count({ a: 1, b: 1, c: { d: 1 } }, function(err, count) {
        expect(count).to.be.equal(2);
        done();
      });
    });

    it('Expects the filter { a: 1, b: 1, c: { d: 1, e : ["A", "B", "C"] } } to return count = 1.', function(done) {
      db.count({ a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } }, function(err, count) {
        expect(count).to.be.equal(1);
        done();
      });
    });

    it('Expects the filter { a: 2 } to return count = 0.', function(done) {
      db.count({ a: 2 }, function(err, count) {
        expect(count).to.be.equal(0);
        done();
      });
    });

    it('Expects the filter { a: { b: { c: { d: { e: 1 }}}} } to return count = 1.', function(done) {
      db.count({ a: { b: { c: { d: { e: 1 }}}} }, function(err, count) {
        expect(count).to.be.equal(1);
        done();
      });
    });

    it('Expects the filter { a: { b: { c: { d: { e: 2 }}}} } to return count = 0.', function(done) {
      db.count({ a: { b: { c: { d: { e: 2 }}}} }, function(err, count) {
        expect(count).to.be.equal(0);
        done();
      });
    });

    it('Expects the method with a non valid query to return an error.', function() {
      db.count([{ a: 1 }], function(err) {
        expect(err).to.be.a.string;
      });
    });

    it('Expects the method with a non valid query and no callback not to throw any error.', function() {
      db.count([{ a: 1 }]);
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', function() {
      db.count({ d: 1 }, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', function() {
      db.count({ d: 1 }, {});
      expect(true).to.be.true;
    });

    it('Expects the method with wrong callback and options not to throw any error.', function() {
      db.count({ d: 1 }, function() {}, function() {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', function() {
      db.count({ d: 1 }, []);
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', function() {
      db.count();
      expect(true).to.be.true;
    });
  });
};
