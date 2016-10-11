/* global describe, it */
/* eslint  max-len: [1, 120, 1] */
/* eslint new-cap: 0, no-unused-expressions: 0 */

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
  describe('The methods EventListener:', function() {
    var db = PicoDB.Create()
      ;

    it('Expects the method insertOne to fire the event "insert".', function(done) {
      db.one('insert', function(doc) {
        expect(doc).to.have.lengthOf(1);
        done();
      });
      db.insertOne({ a: 1 });
    });

    it('Expects the method insertOne to fire the event "change".', function() {
      db.one('change', function(doc) {
        expect(doc).to.have.lengthOf(1);
      });
      db.insertOne({ a: 1 });
    });

    it('Expects the method insertMany to fire the event "insert".', function() {
      db.one('insert', function(doc) {
        expect(doc).to.have.lengthOf(3);
      });
      db.insertMany([{ a: 1 }, { b: 1 }, { c: 5 }]);
    });

    it('Expects the method insertMany to fire the event "change".', function() {
      db.one('change', function(doc) {
        expect(doc).to.have.lengthOf(3);
      });
      db.insertMany([{ a: 1 }, { b: 1 }, { c: 5 }]);
    });

    it('Expects the method updateOne to fire the event "update".', function() {
      db.one('update', function(doc) {
        expect(doc).to.have.lengthOf(1);
      });
      db.updateOne({ a: 1 }, { a: 1, b: 1 });
    });

    it('Expects the method updateOne to fire the event "change".', function() {
      db.one('change', function(doc) {
        expect(doc).to.have.lengthOf(1);
      });
      db.updateOne({ a: 1 }, { a: 1, b: 2 });
    });

    it('Expects the method updateMany to fire the event "update".', function() {
      db.one('update', function(doc) {
        expect(doc).to.have.lengthOf(4);
      });
      db.updateMany({ a: 1 }, { a: 1, c: 1 });
    });

    it('Expects the method updateMany to fire the event "change".', function() {
      db.one('change', function(doc) {
        expect(doc).to.have.lengthOf(4);
      });
      db.updateMany({ a: 1 }, { a: 1, c: 2 });
    });

    it('Expects the method deleteOne to fire the event "delete".', function() {
      db.one('delete', function(doc) {
        expect(doc).to.have.lengthOf(1);
      });
      db.deleteOne({ a: 1 });
    });

    it('Expects the method deleteOne to fire the event "change".', function() {
      db.one('change', function(doc) {
        expect(doc).to.have.lengthOf(1);
      });
      db.deleteOne({ a: 1 });
    });

    it('Expects the method deleteMany to fire the event "delete".', function() {
      db.one('delete', function(doc) {
        expect(doc).to.have.lengthOf(2);
      });
      db.deleteMany({ c: 5 });
    });

    it('Expects the method removeEventListener to stop firing events.', function() {
      var handler = function(doc) {
        expect(doc).to.have.lengthOf(1);
        db.off('insert', handler);
      };

      db.on('insert', handler);
      db.insertOne({ a: 1 });
      db.insertMany([{ a: 1 }, { b: 1 }]);
    });

    it('Expects events on an undefined database not to throw any error.', function() {
      db.db = undefined;
      db.addEventListener('change', function() {});
      db.db = undefined;
      db.addOneTimeEventListener('change', function() {});
      db.db = undefined;
      db.removeEventListener('change', function() {});
      expect(true).to.be.true;
    });

    it('Expects undefined events not to throw any error.', function() {
      db.addEventListener('xyz', function() {});
      db.addOneTimeEventListener('xyz', function() {});
      db.removeEventListener('xyz', function() {});
      expect(true).to.be.true;
    });
  });
};
