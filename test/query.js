/* global describe, it */
/* eslint  max-len: [1, 125, 1] */
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
  { a: 2, b: 'bbb', c: ['a', 'b', 'c'], d: { e: { f: 'f' }}}
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

        it('Expects query { d: { e: { f: { $eq: "f" }}}} to return 1 document.', function() {
          db.find({ d: { e: { f: { $eq: 'f' }}}}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });


      describe('$gt:', function() {

        it('Expects query { a: { $gt: 0 }} to return 3 documents.', function() {
          db.find({ a: { $gt: 0 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $gt: 1 }} to return 1 document.', function() {
          db.find({ a: { $gt: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { a: { $gt: 0 }, { c: { $gt: 4 }}} to return 1 document.', function() {
          db.find({ a: { $gt: 0 }, c: { $gt: 4 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });


      describe('$gte:', function() {

        it('Expects query { a: { $gte: 0 }} to return 3 documents.', function() {
          db.find({ a: { $gt: 0 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $gte: 1 }} to return 3 documents.', function() {
          db.find({ a: { $gte: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $gte: 0 }, { c: { $gte: 5 }}} to return 1 document.', function() {
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

        it('Expects query { a: { $lt: 2 }} to return 2 documents.', function() {
          db.find({ a: { $lt: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $lt: 3 }, { c: { $lt: 6 }}} to return 1 document.', function() {
          db.find({ a: { $lt: 3 }, c: { $lt: 6 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });


      describe('$lte:', function() {

        it('Expects query { a: { $lte: 2 }} to return 3 documents.', function() {
          db.find({ a: { $lte: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $lte: 1 }} to return 2 documents.', function() {
          db.find({ a: { $lte: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $lte: 2 }, { c: { $lte: 5 }}} to return 1 document.', function() {
          db.find({ a: { $lte: 2 }, c: { $lte: 5 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });


      describe('$ne:', function() {

        it('Expects query { a: { $ne: 1 }} to return 1 document.', function() {
          db.find({ a: { $ne: 1 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { a: { $ne: 2 }} to return 2 documents.', function() {
          db.find({ a: { $ne: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { b: { $ne: "bbb" }} to return 1 document.', function() {
          db.find({ b: { $ne: 'bbb' }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { bc: { $ne: "bbb" }} to return 3 documents.', function() {
          db.find({ bc: { $ne: 'bbb' }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { d: { e: { f: { $ne: "f" }}}} to return 2 documents.', function() {
          db.find({ d: { e: { f: { $ne: 'f' }}}}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { c: { $ne: 5 }} to return 2 documents.', function() {
          db.find({ c: { $ne: 5}}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $eq: 2 }, d: { e: { f: { $ne: "f" }}}} to return 0 document.', function() {
          db.find({ a: { $eq: 2 }, d: { e: { f: { $ne: 'f' }}}}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });

      });


      describe('$in:', function() {

        it('Expects query { b: { $in: ["aaa", "bbb"] }} to return 2 documents.', function() {
          db.find({ b: { $in: ['aaa', 'bbb'] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $in: [1, 2] }} to return 3 documents.', function() {
          db.find({ a: { $in: [1, 2] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { c: { $in: ["a", "b", "d"] }} to return 1 document.', function() {
          db.find({ c: { $in: ['a', 'b', 'd'] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { c: { $in: ["d", "e"] }} to return 0 document.', function() {
          db.find({ c: { $in: ['d', 'e'] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });
      });


      describe('$nin:', function() {

        it('Expects query { b: { $nin: ["ccc", "ddd"] }} to return 3 documents.', function() {
          db.find({ b: { $nin: ['ccc', 'ddd'] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { b: { $nin: ["bbb", "ccc"] }} to return 1 document.', function() {
          db.find({ b: { $nin: ['bbb', 'ccc'] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { c: { $nin: [1, 5] }} to return 2 documents.', function() {
          db.find({ c: { $nin: [1, 5] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { c: { $nin: [5, "a"] }} to return 1 document.', function() {
          db.find({ c: { $nin: [5, 'a'] }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });


      describe('$gt & $lt:', function() {

        it ('Expects query {a: { $gt: 1, $lt: 3 }} to return 1 document.', function() {
          db.find({ a: { $gt: 1, $lt: 3 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it ('Expects query {a: { $gte: 1, $lte: 2 }} to return 3 documents.', function() {
          db.find({ a: { $gte: 1, $lte: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it ('Expects query {a: { $gt: 1, $lt: 2 }} to return 0 document.', function() {
          db.find({ a: { $gt: 1, $lt: 2 }}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });
      });


      describe('$ne & $nin:', function() {

        it('Expects query { a: { $ne: 3 }, b: { $nin: ["bbb"] }} to return 1 document.', function() {
          db.find({ a: { $ne: 3 }, b: { $nin: ['bbb'] } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { b: { $nin: ["b"] }, c: { $nin: ["a"] }} to return 2 documents.', function() {
          db.find({ b: { $nin: ['b'] }, c: { $nin: ['a'] } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { b: { $nin: ["bbb"] }, c: { $nin: ["a"] }} to return 1 document.', function() {
          db.find({ b: { $nin: ['bbb'] }, c: { $nin: ['a'] } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });
    });


    describe('Element Operators:', function() {

      describe('$exists:', function() {
        it('Expects query { a: { $exists: true } } to return 3 documents.', function() {
          db.find({ a: { $exists: true } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { a: { $exists: false } } to return 0 document.', function() {
          db.find({ a: { $exists: false } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });

        it('Expects query { b: { $exists: true } } to return 2 documents.', function() {
          db.find({ b: { $exists: true } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { c: { $eq: 5 }, b: { $exists: true } } to return 1 document.', function() {
          db.find({ c: { $eq: 5 }, b: { $exists: true } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { b: { $exists: true }, c: { $ne: 5 } } to return 1 document.', function() {
          db.find({ b: { $exists: true }, c: { $ne: 5 } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { b: { $exists: true }, c: { $exists: false } } to return 0 document.', function() {
          db.find({ b: { $exists: true }, c: { $exists: false } }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });

        it('Expects query { b: { $exists: true }, d: { e: { f: { $exists: true }}} } to return 1 document.', function() {
          db.find({ b: { $exists: true }, d: { e: { f: { $exists: true }}} }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });
      });
    });


    describe('Logical Operators:', function() {

      describe('$or', function() {

        it('Expects query { $or: [ { a: 1 }, { a: 2 } ] } to return 3 documents.', function() {
          db.find({ $or: [ { a: 1 }, { a: 2 } ]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { $or: [ { a: { $eq: 1 }}, { c: { $eq: 5 }} ] } to return 2 documents.', function() {
          db.find({ $or: [ { a: { $eq: 1 } }, { c: { $eq: 5 } } ]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { $or: [ { a: { $eq: 1 }}, { b: { $in: ["bbb"] }}]} to return 3 documents.', function() {
          db.find({ $or: [ { a: { $eq: 1 }}, { b: { $in: ['bbb'] }}]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { $or: [ { a: { $gt: 1 }}, { b: { $in: ["bbb"] }}]} to return 2 documents.', function() {
          db.find({ $or: [ { a: { $gt: 1 }}, { b: { $in: ['bbb'] }}]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { $or: [ { a: { $gt: 1 }}, { b: { $nin: ["bbb"] }}]} to return 2 documents.', function() {
          db.find({ $or: [ { a: { $gt: 1 }}, { b: { $nin: ['bbb'] }}]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { $or: [ { a: { $gt: 3 }}, { d: { e: { f: { $eq: "f" }}} }]} to return 1 document.', function() {
          db.find({ $or: [ { a: { $gt: 3 }}, { d: { e: { f: { $eq: 'f' }}}}]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { $or: [ { a: 3 }, { d: { e: { f: { $eq: "g" }}}}]} to return 0 document.', function() {
          db.find({ $or: [ { a: 3 }, { d: { e: { f: { $eq: 'g' }}}}]}).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });
      });


      describe('$not', function() {

        it('Expects query { a: { $not: { $eq: 1 }} to return 1 document.', function() {
          db.find({ a: { $not: { $eq: 1 }} }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(1);
          });
        });

        it('Expects query { a: { $not: { $gt: 1 }} to return 2 documents.', function() {
          db.find({ a: { $not: { $gt: 1 }} }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(2);
          });
        });

        it('Expects query { a: { $not: { $gte: 1 }} to return 0 document.', function() {
          db.find({ a: { $not: { $gte: 1 }} }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(0);
          });
        });

        it('Expects query { b: { $not: { $in: ["ccc"] }} to return 3 documents.', function() {
          db.find({ b: { $not: { $in: ['ccc'] }} }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });

        it('Expects query { b: { $not: { $nin: ["bbb"] }} to return 3 documents.', function() {
          db.find({ b: { $not: { $nin: ['bbb'] }} }).toArray(function(err, docs) {
            expect(docs).to.have.lengthOf(3);
          });
        });
      });
    });
  });
};
