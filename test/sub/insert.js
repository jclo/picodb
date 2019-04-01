/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-unused-expressions: 0 */

'use strict';

// -- Node modules
const { expect } = require('chai')
    ;

// -- Local modules
const PicoDB = require('../../index.js')
    ;

// -- Local constants


// -- Main
module.exports = function() {
  describe('The method insertOne:', () => {
    const db = PicoDB()
        ;
    let doc
      ;

    it('Expects the method to return null for the error.', (done) => {
      db.insertOne({ a: 1 }, (err, payload) => {
        doc = payload;
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Expects the method to return a payload.', () => {
      expect(doc).not.to.be.a('undefined');
    });

    it('Expects the payload to be an array.', () => {
      expect(doc).to.be.an('array');
    });

    it('Expects the payload to be an array with one element.', () => {
      expect(doc.length).to.be.equal(1);
    });

    it('Expects the payload to be an array with one object.', () => {
      expect(doc[0]).to.be.an('object');
    });

    it('Expects the payload object to have the property "_id".', () => {
      expect(doc[0]).to.have.property('_id');
    });

    it('Expects the method not to insert more than one document without _id.', (done) => {
      db.insertOne([{ c: 1 }, { c: 2 }], (err, payload) => {
        expect(payload.length).to.be.equal(1);
        done();
      });
    });

    it('Expects the method not to insert more than one document with _id.', (done) => {
      db.insertOne([{ _id: 1, c: 1 }, { _id: 2, c: 2 }], (err, payload) => {
        expect(payload.length).to.be.equal(1);
        done();
      });
    });

    it('Expects the method not to insert doc with the same _id twice.', (done) => {
      db.insertOne({ d: 1 }, (err, payload) => {
        db.insertOne(payload, (error, payload2) => {
          expect(payload2.length).to.be.equal(0);
          done();
        });
      });
    });

    it('Expects the method not to insert a false document item.', (done) => {
      db.insertOne(['string'], (err, docs) => {
        expect(docs).to.have.lengthOf(0);
      });
      done();
    });

    it('Expects the method not to insert a false document.', () => {
      db.insertOne('string');
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', () => {
      db.insertOne();
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', () => {
      db.insertOne({ d: 1 }, {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', () => {
      db.insertOne({ d: 1 }, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', () => {
      db.insertOne({ d: 1 }, () => {}, () => {});
      expect(true).to.be.true;
    });
  });

  describe('The method insertMany:', () => {
    const db = PicoDB()
        ;

    it('Expects the method to insert more than one document.', (done) => {
      db.insertMany([{ c: 1 }, { c: 2 }], (err, payload) => {
        expect(payload.length).to.be.equal(2);
        done();
      });
    });

    it('Expects the method not to insert more than once documents with the same id.', (done) => {
      db.insertMany([{ _id: 1, c: 1 }, { _id: 1, c: 2 }], (err, payload) => {
        expect(payload.length).to.be.equal(1);
        done();
      });
    });

    it('Expects the method not to insert false document items.', (done) => {
      db.insertMany([{ c: 1 }, { c: 2 }, 'string'], (err, payload) => {
        expect(payload.length).to.be.equal(2);
        done();
      });
    });

    it('Expects the method without arguments not to throw any error.', () => {
      db.insertMany();
      expect(true).to.be.true;
    });
  });
};
