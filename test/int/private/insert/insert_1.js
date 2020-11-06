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
  // Test here the method with 0, 1, 2 or 3 arguments but with wrong
  // arguments. The goal is to test the function '_getArgs'.

  describe('Test the insertOne method with a variation of arguments:', () => {
    const db = PicoDB();

    it('Expects db.insertOne() to return a promise.', async () => {
      const resp = await db.insertOne();
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // Zero argument:
    it('Expects db.insertOne() to return an empty array.', async () => {
      const resp = await db.insertOne();
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // One argument:
    it('Expects db.insertOne("string") to return an empty array.', async () => {
      const resp = await db.insertOne('string');
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.insertOne((err, resp) => ...) to return an empty array.', (done) => {
      db.insertOne((err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    // Two arguments:
    it('Expects db.insertOne(1, (err, res) => ...) to return an empty array.', (done) => {
      db.insertOne(1, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.insertOne(1, "string") to return an empty array.', async () => {
      const resp = await db.insertOne(1, 'string');
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // Three arguments:
    it('Expects db.insertOne(1, "string", (err, res) => ...) to return an empty array.', (done) => {
      db.insertOne(1, 'string', (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.insertOne(1, "string", { a: 1 }) to return an empty array.', async () => {
      const resp = await db.insertOne(1, 'string', { a: 1 });
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });
  });
};
