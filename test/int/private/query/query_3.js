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
  describe('Test the Logical Operators poorly built:', () => {
    const db = PicoDB();

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

    describe('$and $or', () => {
      it('Expects db.find({ $and: 1 }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: 1 }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: {} }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: {} }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: [] }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: [] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: [1] }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: [1] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: [{ $or: [{ a: 1 }] }, { $and: [{ a: 1 }] }] }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: [{ $or: [{ a: 1 }] }, { $and: [{ a: 1 }] }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: [{ $or: [{ a: 1 }, 2] }] }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: [{ $or: [{ a: 1 }, 2] }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });


    describe('$and', () => {
      it('Expects db.find({ $and: [{ a: 1 }, 2] }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $and: [{ a: 1 }, 2] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });


    describe('$or', () => {
      it('Expects db.find({ $or: [{ a: 1 }, 2] }).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $or: [{ a: 1 }, 2] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });


    describe('$not', () => {
      //
    });
  });
};
