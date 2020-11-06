// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB) {
  describe('Test the method insertOne:', () => {
    const db = PicoDB();

    // One argument:
    it('Expects db.insertOne({ a: 1 })" to return an array containing one document.', async () => {
      const resp = await db.insertOne({ a: 1 });
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.insertOne([{ a: 1 }])" to return an array containing one document.', async () => {
      const resp = await db.insertOne([{ a: 1 }]);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.insertOne([{ a: 1 }, { b: 2}])" to return an array containing one document.', async () => {
      const resp = await db.insertOne([{ a: 1 }, { a: 2 }]);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    // Two arguments:
    it('Expects db.insertOne({ a: 1 }, {})" to return an array containing one document.', async () => {
      const resp = await db.insertOne({ a: 1 }, {});
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.insertOne({ a: 1 }, "string")" to return an array containing one document.', async () => {
      const resp = await db.insertOne({ a: 1 }, 'string');
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.insertOne({ a: 1 }, (err, resp) => ...)" to return an array containing one document.', (done) => {
      db.insertOne({ a: 1 }, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        done();
      });
    });

    // Three arguments:
    it('Expects db.insertOne({ a: 1 }, 2, 3)" to return an array containing one document.', async () => {
      const resp = await db.insertOne({ a: 1 }, 2, 3);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.insertOne({ a: 1 }, {}, 3)" to return an array containing one document.', async () => {
      const resp = await db.insertOne({ a: 1 }, {}, 3);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.insertOne({ a: 1 }, "string", (err, resp) => ...)" to return an array containing one document.', (done) => {
      db.insertOne({ a: 1 }, 'string', (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        done();
      });
    });
    it('Expects db.insertOne({ a: 1 }, {}, (err, resp) => ...)" to return an array containing one document.', (done) => {
      db.insertOne({ a: 1 }, {}, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        done();
      });
    });

    // Multiple documents:
    it('Expects db.insertOne([{ a: 1 }, { b: 1 }], (err, resp) => ...)" to return an array containing one document.', (done) => {
      db.insertOne([{ a: 1 }, { b: 1 }], (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        done();
      });
    });

    // Twice the same document:
    it('Expects "db.insertOne(...db.insertOne(...)" not to insert the same doc. twice.', async () => {
      const resp = await db.insertOne({ d: 1 });
      const resp2 = await db.insertOne(resp);
      expect(resp2).to.have.lengthOf(0);
    });

    // documents with id:
    it('Expects "db.insertOne([{ _id: 1, c: 1 }, { _id: 2, c: 2 }], ..." not to insert more than one document.', async () => {
      const resp = await db.insertOne([{ _id: 1, c: 1 }, { _id: 2, c: 2 }]);
      expect(resp).to.have.lengthOf(1);
    });
  });
};
