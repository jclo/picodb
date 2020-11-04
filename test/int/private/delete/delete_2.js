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
  describe('Test the DeleteOne method with a real filter:', () => {
    const db = PicoDB();
    db._db._silent = true;

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // One argument:
    it('Expects db.deleteOne({ a: 2 }) not to delete any document.', async () => {
      const resp = await db.deleteOne({ a: 2 });
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    // Two arguments:
    it('Expects db.deleteOne({ a: 2 }, {}) not to delete any document.', async () => {
      const resp = await db.deleteOne({ a: 2 }, {});
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    it('Expects db.deleteOne({ a: 2 }, (err, resp) => {...}) not to delete any document.', (done) => {
      db.deleteOne({ a: 2 }, (err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne({ a: 2 }, 1) not to delete any document.', async () => {
      const resp = await db.deleteOne({ a: 2 }, 1);
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    // Three arguments:
    it('Expects db.deleteOne({ a: 2 }, {}, (err, resp) => {...}) not to delete any document.', (done) => {
      db.deleteOne({ a: 2 }, {}, (err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne({ a: 2 }, {}, 1) not to delete any document.', async () => {
      const resp = await db.deleteOne({ a: 2 }, {}, 1);
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    it('Expects db.deleteOne({ a: 2 }, 1, (err, resp) => {...}) not to delete any document.', (done) => {
      db.deleteOne({ a: 2 }, 1, (err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne({ a: 2 }, 1, 2) not to delete any document.', async () => {
      const resp = await db.deleteOne({ a: 2 }, 1, 2);
      expect(resp).to.be.an('number').that.is.equal(0);
    });
  });
};
