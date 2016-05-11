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
var docs = [
  { a: 1 },
  { a: 1, b: 'bbb', c: 5 },
  { a: 2, b: 'bbb', c: ['a', 'b', 'c'] }
];

// -- Local variables
var db = PicoDB.Create()
  ;

// -- Main
module.exports = function() {

  describe('Query Operators:', function() {

    describe('Comparison Operators:', function() {

      describe('$eq:', function() {
        it('Expects query { a: { $eq: 1 }} to return 2 documents.', function(done) {
          db.insertMany(docs, function() {
            db.find({ a: { $eq: 1 }}).toArray(function(err, docs) {
              expect(docs).to.have.lengthOf(2);
              done();
            });
          });
        });

        it('Expects query { b: { $eq: "bbb" }} to return 2 documents.', function() {
          db.find({ b: { $eq: 'bbb' }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: 1, b: { $eq: "bbb" }} to return 1 document.', function() {
          db.find({ a: 1, b: { $eq: 'bbb' }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { a: { $eq: 1 }, b: { $eq: "bbb" }} to return 1 document.', function() {
          db.find({ a: { $eq: 1 }, b: { $eq: 'bbb' }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });

      describe('$gt:', function() {

        it('Expects query { a: { $gt: 0 }} to return 3 documents', function() {
          db.find({ a: { $gt: 0 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $gt: 1 }} to return 1 document', function() {
          db.find({ a: { $gt: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { a: { $gt: 0 }, { c: { $gt: 4 }}} to return 1 document', function() {
          db.find({ a: { $gt: 0 }, c: { $gt: 4 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });

      describe('$gte:', function() {

        it('Expects query { a: { $gte: 0 }} to return 3 documents', function() {
          db.find({ a: { $gt: 0 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $gte: 1 }} to return 3 documents', function() {
          db.find({ a: { $gte: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $gte: 0 }, { c: { $gte: 5 }}} to return 1 document', function() {
          db.find({ a: { $gte: 0 }, c: { $gte: 5 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });

      describe('$lt:', function() {

        it('Expects query { a: { $lt: 3 }} to return 3 documents', function() {
          db.find({ a: { $lt: 3 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $lt: 2 }} to return 2 documents', function() {
          db.find({ a: { $lt: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $lt: 3 }, { c: { $lt: 6 }}} to return 1 document', function() {
          db.find({ a: { $lt: 3 }, c: { $lt: 6 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });

      describe('$lte:', function() {

        it('Expects query { a: { $lte: 2 }} to return 3 documents', function() {
          db.find({ a: { $lte: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $lte: 1 }} to return 2 documents', function() {
          db.find({ a: { $lte: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $lte: 2 }, { c: { $lte: 5 }}} to return 1 document', function() {
          db.find({ a: { $lte: 2 }, c: { $lte: 5 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });
    });
  });
};
