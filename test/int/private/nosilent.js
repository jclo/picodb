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
  describe('Test insert, update, modify with warning log:', () => {
    const db = PicoDB();

    it('Expects db.insertOne({ a: 1 }) to return an array containing one document.', async () => {
      const resp = await db.insertOne({ a: 1 });
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.updateOne({ a: 1 }, { a: 2 }) to return an array containing one document.', async () => {
      const resp = await db.updateOne({ a: 1 }, { a: 2 });
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.deleteOne({ a: 2 }) to delete one document.', async () => {
      const resp = await db.deleteOne({ a: 2 });
      expect(resp).to.be.an('number').that.is.equal(1);
    });
  });
};
