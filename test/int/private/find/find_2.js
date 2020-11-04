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
  describe('Test find().toArray() with basic queries:', () => {
    const db = PicoDB();
    db._db._silent = true;

    const doc = [
      { a: 1 },
      { a: 1, b: null },
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

    it('Expects db.find({ a: 1 }).toArray() to return 5 documents.', async () => {
      const resp = await db.find({ a: 1 }).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(5);
    });

    it('Expects db.find({ b: 1 }).toArray() to return 3 documents.', async () => {
      const resp = await db.find({ b: 1 }).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(3);
    });

    it('Expects db.find({ c: { d: 1, e: ["A", "B", "C"] } }).toArray() to return 1 document.', async () => {
      const resp = await db.find({ c: { d: 1, e: ['A', 'B', 'C'] } }).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.find({ b: null }).toArray() to return 1 document.', async () => {
      const resp = await db.find({ b: null }).toArray();
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });
  });
};
