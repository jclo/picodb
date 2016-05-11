/* global describe, it */
/* eslint  max-len: [1, 110, 1] */
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

  describe('The method insertOne:', function() {
    var db = PicoDB.Create()
      , doc
      ;

    it('Expects the method to return null for the error.', function(done) {
      db.insertOne({a: 1}, function(err, payload) {
        doc = payload;
        expect(err).to.be.null;
        done();
      });
    });

    it('Expects the method to return a payload.', function() {
      expect(doc).to.be.defined;
    });

    it('Expects the payload to be an array.', function() {
      expect(doc).to.be.an.array;
    });

    it('Expects the payload to be an array with one element.', function() {
      expect(doc.length).to.be.equal(1);
    });

    it('Expects the payload to be an array with one object.', function() {
      expect(doc).to.be.an.object;
    });

    it('Expects the payload object to have the property "_id".', function() {
      expect(doc[0]).to.have.property('_id');
    });

    it('Expects the method not to insert more than one document without _id.', function(done) {
      db.insertOne([{c: 1}, {c: 2}], function(err, payload) {
        expect(payload.length).to.be.equal(1);
        done();
      });
    });

    it('Expects the method not to insert more than one document with _id.', function(done) {
      db.insertOne([{_id: 1, c: 1}, {_id: 2, c: 2}], function(err, payload) {
        expect(payload.length).to.be.equal(1);
        done();
      });
    });

    it('Expects the method not to insert doc with the same _id twice.', function(done) {
      db.insertOne({d: 1}, function(err, payload) {
        db.insertOne(payload, function(err, payload) {
          expect(payload.length).to.be.equal(0);
          done();
        });
      });
    });

    it('Expects the method not to insert a false document item.', function(done) {
      db.insertOne(['string'], function(err, doc) {
        expect(doc).to.have.lengthOf(0);
      });
      done();
    });

    it('Expects the method not to insert a false document.', function() {
      db.insertOne('string');
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', function() {
      db.insertOne();
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', function() {
      db.insertOne({d: 1}, {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', function() {
      db.insertOne({d: 1}, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', function() {
      db.insertOne({d: 1}, function() {}, function() {});
      expect(true).to.be.true;
    });



  });

  describe('The method insertMany:', function() {
    var db = PicoDB.Create()
      ;

    it('Expects the method to insert more than one document.', function(done) {
      db.insertMany([{c: 1}, {c: 2}], function(err, payload) {
        expect(payload.length).to.be.equal(2);
        done();
      });
    });

    it('Expects the method not to insert more than once documents with the same id.', function(done) {
      db.insertMany([{_id: 1, c: 1}, {_id: 1, c: 2}], function(err, payload) {
        expect(payload.length).to.be.equal(1);
        done();
      });
    });

    it('Expects the method not to insert false document items.', function(done) {
      db.insertMany([{c: 1}, {c: 2}, 'string'], function(err, payload) {
        expect(payload.length).to.be.equal(2);
        done();
      });
    });

    it('Expects the method without arguments not to throw any error.', function() {
      db.insertMany();
      expect(true).to.be.true;
    });
  });
};
