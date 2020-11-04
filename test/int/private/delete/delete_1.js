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
  describe('Test the delete methods with wrong arguments:', () => {
    const db = PicoDB();

    // Zero argument:
    it('Expects db.deleteOne() to return a promise.', async () => {
      const resp = await db.deleteOne();
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    // One argument:
    it('Expects db.deleteOne((err, resp) => { ... }) to return zero document.', (done) => {
      db.deleteOne((err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne(1) to to return zero document.', async () => {
      const resp = await db.deleteOne(1);
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    // Two arguments
    it('Expects db.deleteOne(1, (err, resp) => { ... }) to return zero document.', (done) => {
      db.deleteOne(1, (err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne(1, 2) to to return zero document.', async () => {
      const resp = await db.deleteOne(1, 2);
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    // Three arguments:
    it('Expects db.deleteOne(1, {}, (err, resp) => { ... }) to return zero document.', (done) => {
      db.deleteOne(1, {}, (err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne(1, 2, (err, resp) => { ... }) to return zero document.', (done) => {
      db.deleteOne(1, 2, (err, resp) => {
        expect(err).to.be.a('null');
        expect(resp).to.be.an('number').that.is.equal(0);
        done();
      });
    });

    it('Expects db.deleteOne(1, {}, 3) to to return zero document.', async () => {
      const resp = await db.deleteOne(1, {}, 3);
      expect(resp).to.be.an('number').that.is.equal(0);
    });

    it('Expects db.deleteOne(1, 2, 3) to to return zero document.', async () => {
      const resp = await db.deleteOne(1, 2, 3);
      expect(resp).to.be.an('number').that.is.equal(0);
    });
  });
};
