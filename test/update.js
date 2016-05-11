/* global describe, it */
/* eslint  max-len: [1, 135, 1] */
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

  describe('The method updateOne:', function() {
    var db = PicoDB.Create()
      , doc
      , updated
      ;

    doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 }},
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] }},
      { a: { b: { c: { d: { e: 1 }}}}}
    ];

    it('Expects the method with an undefined database not to throw any error.', function() {
      db.updateOne({});
    });

    it('Expects the method with unmatched filter not to update any document.', function(done) {
      db.insertMany(doc, function() {
        db.updateOne({ a: 5 }, { a: 2 }, function(err, docs) {
          expect(docs).to.have.lengthOf(0);
          done();
        });
      });
    });

    it('Expects the method with unmatched filter and no callback not to throw any error.', function() {
      db.updateOne({ a: 5 }, { a: 2 });
      expect(true).to.be.true;
    });

    it('Expects the method with filter {a: 1} and update {a: 2} to return one updated document.', function(done) {
      db.updateOne({ a: 1 }, { a: 2 }, function(err, doc) {
        updated = doc[0];
        expect(doc).to.have.lengthOf(1);
        done();
      });
    });

    it('And the document being: { a: 2 }.', function() {
      expect(updated).to.have.property('a').that.is.equal(2);
    });

    it('Expects this document being updated with the field { c: "isNew"}.', function(done) {
      db.updateOne({ a: 2 }, { $set: { c: 'isNew'}}, function(err, doc) {
        expect(doc[0]).to.have.property('c').that.is.equal('isNew');
        done();
      });
    });

    it('Expects now this field being removed.', function(done) {
      db.updateOne({ a: 2 }, { $unset: { c: 'isNew'}}, function(err, doc) {
        expect(doc[0]).not.to.have.property('c');
        done();
      });
    });

    it('Expects the method with a wrong filter to return an error.', function(done) {
      db.updateOne('aaa', {}, function(err) {
        expect(err).to.be.a.string;
        done();
      });
    });

    it('Expects the method with a wrong filter and no callback not to throw any error.', function() {
      db.updateOne('aaa', {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong update to return any error.', function(done) {
      db.updateOne({}, 'aaa', function(err) {
        expect(err).to.be.a.string;
        done();
      });
    });

    it('Expects the method with a wrong update and no callback not to throw any error.', function() {
      db.updateOne({}, 'aaa');
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', function() {
      db.updateOne({ a: 'x' }, {}, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', function() {
      db.updateOne({ a: 'x' }, {}, {});
      expect(true).to.be.true;
    });

    it('Expects the method with wrong callback and options not to throw any error.', function() {
      db.updateOne({ a: 'x' }, {}, function() {}, function() {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', function() {
      db.updateOne({ a: 'x' }, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', function() {
      db.updateOne();
      expect(true).to.be.true;
    });
  });


  describe('The method updateMany:', function() {
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
      db.updateOne({});
    });

    it('Expects the method with the filter { a: 1 } and the update { b: 2 } to update 4 documents.', function(done) {
      db.insertMany(doc, function() {
        db.updateMany({ a: 1 }, { b: 2 }, function(err, docs) {
          expect(docs).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('Expects the method without arguments not to throw any error.', function() {
      db.updateMany();
      expect(true).to.be.true;
    });
  });
};
