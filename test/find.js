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

  describe('The method find:', function() {
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
      db.find({}).toArray();
    });

    it('Expects the method with query { a: 1 } to return 4 documents.', function(done) {
      db.insertMany(doc, function() {
        db.find({ a: 1 }).toArray(function(err, docs) {
          expect(docs).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('Expects the method with query { b: 1 } to return 3 documents.', function(done) {
      db.find({ b: 1 }).toArray(function(err, docs) {
        expect(docs).to.have.lengthOf(3);
        done();
      });
    });

    it('Expects the method with query { c: { d: 1, e: ["A", "B", "C"] }} to return 1 document.', function(done) {
      db.find({ c: { d: 1, e: ['A', 'B', 'C'] }}).toArray(function(err, docs) {
        expect(docs).to.have.lengthOf(1);
        done();
      });
    });

    it('Expects the method with an empty query to return all the 5 documents.', function(done) {
      db.find({}).toArray(function(err, docs) {
        expect(docs).to.have.lengthOf(5);
        done();
      });
    });

    it('Expects the method without query to return all the 5 documents.', function(done) {
      db.find().toArray(function(err, docs) {
        expect(docs).to.have.lengthOf(5);
        done();
      });
    });

    it('Expects the method with a wrong query to return an error.', function(done) {
      db.find([]).toArray(function(err) {
        expect(err).to.be.a.string;
        done();
      });
    });

    it('Expects the method without a callback not to throw any error.', function() {
      db.find().toArray();
      expect(true).to.be.a.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', function() {
      db.find().toArray([]);
      expect(true).to.be.a.true;
    });

  });
};
