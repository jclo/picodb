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
  describe('Test the updateOne method with real arguments:', () => {
    const db = PicoDB();
    db._db._silent = true;

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // Two arguments:
    it('Expects db.updateOne({ a: 1 }, { a: 2 }) to return one document.', async () => {
      const resp = await db.updateOne({ a: 1 }, { a: 2 });
      expect(resp).to.be.an('array').that.has.lengthOf(1);
      expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(2);
    });

    // Three arguments:
    it('Expects db.updateOne({ a: 2 }, { a: 1 }, {}) to return one document.', async () => {
      const resp = await db.updateOne({ a: 2 }, { a: 1 }, {});
      expect(resp).to.be.an('array').that.has.lengthOf(1);
      expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
    });

    it('Expects db.updateOne({ a: 1 }, { a: 2 }, (err, resp) => { ... }) to return one document.', (done) => {
      db.updateOne({ a: 1 }, { a: 2 }, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(2);
        done();
      });
    });

    it('Expects db.updateOne({ a: 2 }, { a: 1 }, 1) to return one document.', async () => {
      const resp = await db.updateOne({ a: 2 }, { a: 1 }, 1);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
      expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
    });

    // Four arguments:
    it('Expects db.updateOne({ a: 1 }, { a: 2 }, {}, (err, resp) => { ... }) to return one document.', (done) => {
      db.updateOne({ a: 1 }, { a: 2 }, {}, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(2);
        done();
      });
    });

    it('Expects db.updateOne({ a: 2 }, { a: 1 }, {}, 1) to return one document.', async () => {
      const resp = await db.updateOne({ a: 2 }, { a: 1 }, {}, 1);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
      expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
    });

    it('Expects db.updateOne({ a: 1 }, { a: 2 }, 1, (err, resp) => { ... }) to return one document.', (done) => {
      db.updateOne({ a: 1 }, { a: 2 }, 1, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(2);
        done();
      });
    });

    it('Expects db.updateOne({ a: 2 }, { a: 1 }, 1, 2) to return one document.', async () => {
      const resp = await db.updateOne({ a: 2 }, { a: 1 }, 1, 2);
      expect(resp).to.be.an('array').that.has.lengthOf(1);
      expect(resp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
    });

    describe('Test the updateOne method with no matching:', () => {
      it('Expects db.updateOne({ a: 5 }, { a: 1 }, {}) to return an empty array.', async () => {
        const resp = await db.updateOne({ a: 5 }, { a: 1 }, {});
        expect(resp).to.be.an('array').that.has.lengthOf(0);
      });
    });
  });
};
