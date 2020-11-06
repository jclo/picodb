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
  describe('Test find().toArray() with a variation of arguments:', () => {
    const db = PicoDB();

    const doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    // Fill db
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // Test promises
    it('Expects db.find().toArray() to return a promise.', async () => {
      const resp = await db.find().toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // Test callback
    it('Expects db.find().toArray((err, resp) => ...) to call a callback.', (done) => {
      db.find().toArray((err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        done();
      });
    });

    // Test with invalid find arguments:

    // Zero arguments:
    it('Expects db.find().toArray() to return an array with all the documents.', async () => {
      const resp = await db.find().toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // One argument:
    it('Expects db.find(1).toArray() to return an array with all the documents.', async () => {
      const resp = await db.find(1).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.find({}).toArray() to return an array with all documents.', async () => {
      const resp = await db.find({}).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // Two arguments:
    it('Expects db.find({}, "string").toArray() to return an array with all the documents.', async () => {
      const resp = await db.find({}, 'string').toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.find({}, {}).toArray() to return an array with all the documents.', async () => {
      const resp = await db.find({}, {}).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.find("string", {}).toArray() to return an array with all the documents.', async () => {
      const resp = await db.find('string', {}).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.find("string", 123).toArray() to return an array with all the documents.', async () => {
      const resp = await db.find('string', 123).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });
  });
};
