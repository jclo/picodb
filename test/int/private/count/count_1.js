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
  describe('Test the count method with wrong arguments:', () => {
    const db = PicoDB();

    // Zero argument:
    it('Expects db.count() to return a promise.', async () => {
      const resp = await db.count();
      expect(resp).to.be.a('number');
    });

    it('Expects db.count() to return zero.', async () => {
      const resp = await db.count();
      expect(resp).to.be.a('number').that.is.equal(0);
    });

    // One argument:
    it('Expects db.count(1) to return zero.', async () => {
      const resp = await db.count(1);
      expect(resp).to.be.a('number').that.is.equal(0);
    });

    it('Expects db.count((err, resp) => ...) to return zero.', (done) => {
      db.count((err, resp) => {
        expect(resp).to.be.a('number').that.is.equal(0);
        done();
      });
    });

    // Two arguments:
    it('Expects db.count(1, (err, resp) => ...) to return zero.', (done) => {
      db.count(1, (err, resp) => {
        expect(resp).to.be.a('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.count(1, 2) to return zero.', async () => {
      const resp = await db.count(1, 2);
      expect(resp).to.be.a('number').that.is.equal(0);
    });

    // Three arguments:
    it('Expects db.count(1, 2, (err, resp) => ...) to return zero.', (done) => {
      db.count(1, 2, (err, resp) => {
        expect(resp).to.be.a('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.count(1, 2, 3) to return zero.', async () => {
      const resp = await db.count(1, 2, 3);
      expect(resp).to.be.a('number').that.is.equal(0);
    });
  });
};
