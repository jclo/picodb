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
  describe('Test the count method with different queries:', () => {
    const db = PicoDB();

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

    it('Expects db.count({ a: 1 }) to return 4 documents.', async () => {
      const resp = await db.count({ a: 1 });
      expect(resp).to.be.a('number').that.is.equal(4);
    });

    it('Expects db.count({ a: 1, b: 1 }) to return 3 documents.', async () => {
      const resp = await db.count({ a: 1, b: 1 });
      expect(resp).to.be.a('number').that.is.equal(3);
    });

    it('Expects db.count({ a: 1, b: 1, c: { d: 1 } }) to return 2 documents.', async () => {
      const resp = await db.count({ a: 1, b: 1, c: { d: 1 } });
      expect(resp).to.be.a('number').that.is.equal(2);
    });

    it('Expects db.count({ a: 1, b: 1, c: { d: 1, e: ["A", "B", "C"] } }) to return 1 document.', async () => {
      const resp = await db.count({ a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } });
      expect(resp).to.be.a('number').that.is.equal(1);
    });

    it('Expects db.count({ a: 2 }) to return 0 document.', async () => {
      const resp = await db.count({ a: 2 });
      expect(resp).to.be.a('number').that.is.equal(0);
    });

    it('Expects db.count({ a: { b: { c: { d: { e: 1 }}}} }) to return 1 document.', async () => {
      const resp = await db.count({ a: { b: { c: { d: { e: 1 } } } } });
      expect(resp).to.be.a('number').that.is.equal(1);
    });

    it('Expects db.count({ a: { b: { c: { d: { e: 2 }}}} }) to return 0 document.', async () => {
      const resp = await db.count({ a: { b: { c: { d: { e: 2 } } } } });
      expect(resp).to.be.a('number').that.is.equal(0);
    });

    it('Expects db.count({ a: { b: { c: { d: { e: 2 }}}} }) to return 0 document.', async () => {
      const resp = await db.count({ a: { b: { c: { d: { e: 2 } } } } });
      expect(resp).to.be.a('number').that.is.equal(0);
    });
  });

  describe('Test the count method with queries using dot.notation:', () => {
    const db = PicoDB();

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

    it('Expects db.count({ "c.d": 1 }) to return 2 documents.', async () => {
      const resp = await db.count({ 'c.d': 1 });
      expect(resp).to.be.a('number').that.is.equal(2);
    });

    it('Expects db.count({ "a.b.c.d.e": 1 }) to return 1 document.', async () => {
      const resp = await db.count({ 'a.b.c.d.e': 1 });
      expect(resp).to.be.a('number').that.is.equal(1);
    });

    it('Expects db.count({ "a.b.c.d.e": 2 }) to return 0 document.', async () => {
      const resp = await db.count({ 'a.b.c.d.e': 2 });
      expect(resp).to.be.a('number').that.is.equal(0);
    });
  });
};
