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
  describe('Test the method insertMany:', () => {
    const db = PicoDB();
    db._db._silent = true;

    // Classic:
    it('Expects db.inserMany([{...}, {...}]) to insert more than one document.', async () => {
      const resp = await db.insertMany([{ c: 1 }, { c: 2 }]);
      expect(resp).to.be.an('array').that.has.lengthOf(2);
    });

    // Wrong argument:
    it('Expects db.inserMany([{...}, {...}, [...]]) not to insert the array.', async () => {
      const resp = await db.insertMany([{ c: 1 }, { c: 2 }, [1, 2, 3]]);
      expect(resp).to.be.an('array').that.has.lengthOf(2);
    });

    // Same id:
    it('Expects db.inserMany([{ _id: 1, ...}, {_id: 1, ...}]) not to insert twice the same id.', async () => {
      const resp = await db.insertMany([{ _id: 1, c: 1 }, { _id: 1, c: 2 }]);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    // One document not inserted in an array:
    it('Expects db.inserMany({ a: 1 }) not to insert one document not in an array.', async () => {
      const resp = await db.insertMany({ a: 1 });
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });
  });
};
