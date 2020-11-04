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
  describe('Test the Comparison Operators:', () => {
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

    describe('$eq:', () => {
      it('Expects db.find({ a: { $eq: 1 } }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ a: { $eq: 1 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ b: { $eq: "bbb" } }).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ b: { $eq: 'bbb' } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ a: 1, b: { $eq: "bbb" }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: 1, b: { $eq: 'bbb' } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ a: { $eq: 1 }, b: { $eq: "bbb" }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $eq: 1 }, b: { $eq: 'bbb' } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ d: { e: { f: { $eq: "f" }}}}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ d: { e: { f: { $eq: 'f' } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });

    describe('$gt:', () => {
      it('Expects db.find({ a: { $gt: 0 }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $gt: 0 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $gt: 1 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $gt: 1 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ a: { $gt: 1 }, c: { $gt: 4 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $gt: 0 }, c: { $gt: 4 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });

    describe('$gte:', () => {
      it('Expects db.find({ a: { $gte: 0 }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $gte: 0 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $gte: 1 }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $gte: 1 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $gte: 0 }, c: { $gte: 5 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $gte: 0 }, c: { $gte: 5 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });

    describe('$lt:', () => {
      it('Expects db.find({ a: { $lt: 3 }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $lt: 3 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $lt: 2 }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ a: { $lt: 2 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ a: { $lt: 3 }, c: { $lt: 6 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $lt: 3 }, c: { $lt: 6 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });

    describe('$lte:', () => {
      it('Expects db.find({ a: { $lte: 2 }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $lte: 2 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $lte: 1 }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ a: { $lte: 1 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ a: { $lte: 2 }, c: { $lte: 5 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $lte: 2 }, c: { $lte: 5 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });

    describe('$ne:', () => {
      it('Expects db.find({ a: { $ne: 1 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $ne: 1 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ a: { $ne: 2 }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ a: { $ne: 2 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ b: { $ne: "bbb" }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ b: { $ne: 'bbb' } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ bc: { $ne: "bbb" }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ bc: { $ne: 'bbb' } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ d: { e: { f: { $ne: "f" }}}}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ d: { e: { f: { $ne: 'f' } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ c: { $ne: 5 }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ c: { $ne: 5 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ a: { $eq: 2 }, d: { e: { f: { $ne: "f" }}}}).toArray() to return 0 document.', async () => {
        const resp = await db.find({ a: { $eq: 2 }, d: { e: { f: { $ne: 'f' } } } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });

    describe('$in:', () => {
      it('Expects db.find({ b: { $in: ["aaa", "bbb"] }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ b: { $in: ['aaa', 'bbb'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ a: { $in: [1, 2] }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $in: [1, 2] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ c: { $in: ["a", "b", "d"] }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ c: { $in: ['a', 'b', 'd'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ c: { $in: ["d", "e"] }}).toArray() to return 0 document.', async () => {
        const resp = await db.find({ c: { $in: ['d', 'e'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });

    describe('$nin:', () => {
      it('Expects db.find({ b: { $nin: ["ccc", "ddd"] }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ b: { $nin: ['ccc', 'ddd'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ b: { $nin: ["bbb", "ccc"] }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ b: { $nin: ['bbb', 'ccc'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ c: { $nin: [1, 5] }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ c: { $nin: [1, 5] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ c: { $nin: [1, "a"] }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ c: { $nin: [5, 'a'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });

    describe('gt & $lt:', () => {
      it('Expects db.find({ a: { $gt: 1, $lt: 3 }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $gt: 1, $lt: 3 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ a: { $gte: 1, $lte: 2 }}).toArray() to return 3 documents.', async () => {
        const resp = await db.find({ a: { $gte: 1, $lte: 2 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects db.find({ a: { $gt: 1, $lt: 2 }}).toArray() to return 0 document.', async () => {
        const resp = await db.find({ a: { $gt: 1, $lt: 2 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });

    describe('$ne & $nin:', () => {
      it('Expects db.find({ a: { $ne: 3 }, b: { $nin: ["bbb"] }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ a: { $ne: 3 }, b: { $nin: ['bbb'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.find({ b: { $nin: ["b"] }, c: { $nin: ["a"] }}).toArray() to return 2 documents.', async () => {
        const resp = await db.find({ b: { $nin: ['b'] }, c: { $nin: ['a'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.find({ b: { $nin: ["bbb"] }, c: { $nin: ["a"] }}).toArray() to return 1 document.', async () => {
        const resp = await db.find({ b: { $nin: ['bbb'] }, c: { $nin: ['a'] } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });
  });
};
