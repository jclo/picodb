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
  describe('Test the update methods with wrong arguments:', () => {
    const db = PicoDB();

    // Zero argument:
    it('Expects db.updateOne() to return a promise.', async () => {
      const resp = await db.updateOne();
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne() to return an empty array.', async () => {
      const resp = await db.updateOne();
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // One argument:
    it('Expects db.updateOne((err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne((err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne(1) to return an empty array.', async () => {
      const resp = await db.updateOne(1);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // Two arguments:
    it('Expects db.updateOne({}, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne({}, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne({}, 1) to return an empty array.', async () => {
      const resp = await db.updateOne({}, 1);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne(1, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne(1, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne(1, "s") to return an empty array.', async () => {
      const resp = await db.updateOne(1, 's');
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // Three arguments:
    it('Expects db.updateOne(1, 2, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne({}, 's', (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne({}, 2, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne({}, 's', (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne(1, {}, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne({}, 's', (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne(1, 2, 3) to return an empty array.', async () => {
      const resp = await db.updateOne({}, 2, 3);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne({}, 2, 3) to return an empty array.', async () => {
      const resp = await db.updateOne({}, 2, 3);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne(1, {}, 3) to return an empty array.', async () => {
      const resp = await db.updateOne({}, 2, 3);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    // Four arguments:
    it('Expects db.updateOne(1, 2, 3, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne(1, 2, 3, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne({}, 2, 3, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne({}, 2, 3, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne({}, 2, 3, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne(1, {}, 3, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne({}, 2, 3, (err, resp) => {...}) to return an empty array.', (done) => {
      db.updateOne(1, 2, {}, (err, resp) => {
        expect(resp).to.be.an('array').that.has.lengthOf(0);
        done();
      });
    });

    it('Expects db.updateOne(1, 2, 3, 4) to return an empty array.', async () => {
      const resp = await db.updateOne(1, 2, 3, 4);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne({}, 2, 3, 4) to return an empty array.', async () => {
      const resp = await db.updateOne({}, 2, 3, 4);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne(1, {}, 3, 4) to return an empty array.', async () => {
      const resp = await db.updateOne(1, {}, 3, 4);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });

    it('Expects db.updateOne(1, 2, {}, 4) to return an empty array.', async () => {
      const resp = await db.updateOne(1, 2, {}, 4);
      expect(resp).to.be.an('array').that.has.lengthOf(0);
    });
  });
};
