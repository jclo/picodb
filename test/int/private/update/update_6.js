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
  describe('Test the updateMany method:', () => {
    const db = PicoDB();

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects { a: { $gte: 1 }} { a: 1 } to return 4 documents', async () => {
      const resp = await db.updateMany({ a: { $gte: 1 } }, { a: 1 });
      expect(resp).to.be.an('array').that.has.lengthOf(4);
    });
  });
};
