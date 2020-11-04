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
module.exports = function(PicoDB, doc) {
  describe('Test DeleteOne operations:', () => {
    const db = PicoDB();
    db._db._silent = true;

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.deleteOne({ a: 1 }) to return 1 document deleted.', async () => {
      const resp = await db.deleteOne({ a: 1 });
      expect(resp).to.be.an('number').that.is.equal(1);
    });

    it('Expects db.deleteOne({}) to return 1 document deleted.', async () => {
      const resp = await db.deleteOne({});
      expect(resp).to.be.an('number').that.is.equal(1);
    });

    it('Expects db.count({}) to return 3 documents remaining into the db.', async () => {
      const resp = await db.count({});
      expect(resp).to.be.an('number').that.is.equal(3);
    });
  });

  describe('Test DeleteMany operations:', () => {
    const db = PicoDB();
    db._db._silent = true;

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.deleteMany({ a: 1 }) to return 4 documents deleted.', async () => {
      const resp = await db.deleteMany({ a: 1 });
      expect(resp).to.be.an('number').that.is.equal(4);
    });

    it('Expects db.count({}) to return 1 document remaining into the db.', async () => {
      const resp = await db.count({});
      expect(resp).to.be.an('number').that.is.equal(1);
    });

    // Refill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.deleteMany({}) to return 6 documents deleted.', async () => {
      const resp = await db.deleteMany({});
      expect(resp).to.be.an('number').that.is.equal(6);
    });

    it('Expects db.count({}) to return 0 document remaining into the db.', async () => {
      const resp = await db.count({});
      expect(resp).to.be.an('number').that.is.equal(0);
    });
  });
};
