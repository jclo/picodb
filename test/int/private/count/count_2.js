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
  describe('Test the count method with real arguments:', () => {
    const db = PicoDB();
    db._db._silent = true;

    const doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    // One real argument:
    it('Expects db.count({ a: 1 }) to return 4 documents.', async () => {
      const resp = await db.count({ a: 1 });
      expect(resp).to.be.a('number').that.is.equal(4);
    });

    // Two real arguments:
    it('Expects db.count({ a: 1 }, 1) to return 4 documents.', async () => {
      const resp = await db.count({ a: 1 }, 1);
      expect(resp).to.be.a('number').that.is.equal(4);
    });

    it('Expects db.count({ a: 1 }, {}) to return 4 documents.', async () => {
      const resp = await db.count({ a: 1 }, {});
      expect(resp).to.be.a('number').that.is.equal(4);
    });

    it('Expects db.count({ a: 1 }, (err, resp) => ...) to return 4 documents.', (done) => {
      db.count({ a: 1 }, (err, resp) => {
        expect(resp).to.be.a('number').that.is.equal(4);
        done();
      });
    });

    // Three real arguments:
    it('Expects db.count({ a: 1 }, {}, (err, resp) => ...) to return 4 documents.', (done) => {
      db.count({ a: 1 }, {}, (err, resp) => {
        expect(resp).to.be.a('number').that.is.equal(4);
        done();
      });
    });

    it('Expects db.count({ a: 1 }, {}, 1) to return 4 documents.', async () => {
      const resp = await db.count({ a: 1 }, {}, 1);
      expect(resp).to.be.a('number').that.is.equal(4);
    });

    it('Expects db.count({ a: 1 }, [], (err, resp) => ...) to return 4 documents.', (done) => {
      db.count({ a: 1 }, [], (err, resp) => {
        expect(resp).to.be.a('number').that.is.equal(4);
        done();
      });
    });

    it('Expects db.count({ a: 1 }, [], {}) to return 4 documents.', async () => {
      const resp = await db.count({ a: 1 }, [], {});
      expect(resp).to.be.a('number').that.is.equal(4);
    });
  });
};
