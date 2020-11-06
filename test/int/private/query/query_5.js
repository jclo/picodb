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
  describe('Test the Logical Operators (next):', () => {
    describe('$and $or', () => {
      const db = PicoDB();

      const doc = [
        { a: 1, b: 1 },
        { c: 1, d: 1 },
        /* eslint-disable-next-line object-curly-newline */
        { a: 10, b: 11, c: 20, d: 100 },
      ];

      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects db.find({ $and: [{ $or: [{ a: 1 }, { b: 2 }] }, { $or: [{ c: 1 }, { d: 2 }] }] }).toArray() to return 0 document.', async () => {
        const q = {
          $and: [
            { $or: [{ a: 1 }, { b: 2 }] },
            { $or: [{ c: 1 }, { d: 2 }] },
          ],
        };
        const resp = await db.find(q).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: [{ $or: [{ a: 2 }, { b: 1 }] }, { $or: [{ c: 1 }, { d: 1 }] }] }).toArray() to return 0 document.', async () => {
        const q = {
          $and: [
            { $or: [{ a: 2 }, { b: 1 }] },
            { $or: [{ c: 1 }, { d: 1 }] },
          ],
        };

        const resp = await db.find(q).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects db.find({ $and: [{ $or: [{ a: { $gte: 10 } }, { b: 1 }] }, { $or: [{ c: 21 }, { d: { $lte: 100 } }] }] }).toArray() to return 0 document.', async () => {
        const q = {
          $and: [
            { $or: [{ a: { $gte: 10 } }, { b: 1 }] },
            { $or: [{ c: 21 }, { d: { $lte: 100 } }] },
          ],
        };
        const resp = await db.find(q).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });
    });
  });
};
