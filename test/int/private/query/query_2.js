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
  describe('Test the Element Operators:', () => {
    const db = PicoDB();
    db._db._silent = true;

    const doc = [
      { a: 1 },
      { a: 1, b: 'bbb', c: 5 },
      /* eslint-disable-next-line object-curly-newline */
      { a: 2, b: 'bbb', c: ['a', 'b', 'c'], d: { e: { f: 'f' } } },
    ];

    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    describe('$exists:', () => {
      it('Expects db.find({ a: { $exists: true } }).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $exists: true } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $exists: false } }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ a: { $exists: false } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ b: { $exists: true } }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ b: { $exists: true } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ c: { $eq: 5 }, b: $exists: true }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ c: { $eq: 5 }, b: { $exists: true } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ b: { $exists: true }, c: { $ne: 5 } }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ b: { $exists: true }, c: { $ne: 5 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ b: { $exists: true }, c: { $exists: false } }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ b: { $exists: true }, c: { $exists: false } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ b: { $exists: true }, d: { e: { f: { $exists: true }}} }).toArray() to return 1 document.', async () => {
        /* eslint-disable-next-line max-len */
        const resp = await db.find({ b: { $exists: true }, d: { e: { f: { $exists: true } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });
  });
};
