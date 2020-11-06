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
  describe('Test the Logical Operators:', () => {
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

    describe('$and', () => {
      it('Expects db.find({ $and: [{ a: 1 }] }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ $and: [{ a: 1 }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $and: [{ a: 1 }, { b: "bbb" }] }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ $and: [{ a: 1 }, { b: 'bbb' }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ $and: [{ a: 2 }, { d: { e: { f: "f" }} }] }).toArray() to return 1 document.', async () => {
        const resp = await db.find({ $and: [{ a: 2 }, { d: { e: { f: 'f' } } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ $and: [{ a: { $gte: 1 } }, { b: "bbb" }] }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ $and: [{ a: { $gte: 1 } }, { b: 'bbb' }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $and: [{ a: { $gte: 1 } }] }).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ $and: [{ a: { $gte: 1 } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ $and: [{ a: { $gte: 1 } }, { a: { $lt: 2 }}] }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ $and: [{ a: { $gte: 1 } }, { a: { $lt: 2 } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $and: [{ a: { $gte: 1 } }, { b: { $exists: true }] }).toArray() to return 2 documents.', async () => {
        /* eslint-disable-next-line */
        const resp = await db.find({ $and: [{ a: { $gte: 1 } }, { b: { $exists: true } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $and: [{ a: { $gt: 1 } }, { b: { $exists: true }] }).toArray() to return 1 document.', async () => {
        /* eslint-disable-next-line */
        const resp = await db.find({ $and: [{ a: { $gt: 1 } }, { b: { $exists: true } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });


    describe('$or', () => {
      it('Expects db.find({ $or: [{ a: 1 }, { a: 2 }] }).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ $or: [{ a: 1 }, { a: 2 }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ $or: [{ a: { $eq: 1 }}, { c: { $eq: 5 }} ] }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ $or: [{ a: { $eq: 1 } }, { c: { $eq: 5 } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $or: [{ a: { $eq: 1 }}, { b: { $in: ["bbb"] }}]}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ $or: [{ a: { $eq: 1 } }, { b: { $in: ['bbb'] } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ $or: [{ a: { $gt: 1 }}, { b: { $in: ["bbb"] }}]}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ $or: [{ a: { $gt: 1 } }, { b: { $in: ['bbb'] } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $or: [{ a: { $gt: 1 }}, { b: { $nin: ["bbb"] }} ]}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ $or: [{ a: { $gt: 1 } }, { b: { $nin: ['bbb'] } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ $or: [{ a: { $gt: 3 }}, { d: { e: { f: { $eq: "f" }}} }]}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ $or: [{ a: { $gt: 3 } }, { d: { e: { f: { $eq: 'f' } } } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ $or: [{ a: 3 }, { d: { e: { f: { $eq: "g" }}}}]}).toArray() to return 0 document.', async () => {
        const resp = await db.find({ $or: [{ a: 3 }, { d: { e: { f: { $eq: 'g' } } } }] }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });


    describe('$not', () => {
      it('Expects db.find({ a: { $not: { $eq: 1 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $not: { $eq: 1 } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ a: { $not: { $gt: 1 }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ a: { $not: { $gt: 1 } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ a: { $not: { $gte: 1 }}).toArray() to return 0 document.', async () => {
        const resp = await db.find({ a: { $not: { $gte: 1 } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ b: { $not: { $in: ["ccc"] }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ b: { $not: { $in: ['ccc'] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ b: { $not: { $nin: ["bbb"] }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ b: { $not: { $nin: ['bbb'] } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });
    });
  });
};
