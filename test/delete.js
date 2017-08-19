/* global describe, it */
/* eslint import/no-extraneous-dependencies: 0, no-unused-expressions: 0  */

'use strict';

// -- Node modules
const expect = require('chai').expect
    ;

// -- Local modules
const PicoDB = require('../index.js')
    ;

// -- Local constants


// -- Main
module.exports = () => {
  describe('The method deleteOne:', () => {
    const db = PicoDB()
        ;

    const doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    it('Expects the method with an undefined database not to throw any error.', () => {
      db.deleteOne();
    });

    it('Expects the method with the filter { a: 2 } not to return any error.', (done) => {
      db.insertMany(doc, () => {
        db.deleteOne({ a: 2 }, (err) => {
          expect(err).to.be.null;
          done();
        });
      });
    });

    it('Expects the method with the filter { a: 2 } to return zero doc deleted.', (done) => {
      db.deleteOne({ a: 2 }, (err, deleted) => {
        expect(deleted).to.be.equal(0);
        done();
      });
    });

    it('Expects the method with the filter { a: 1 } to return 1 doc deleted.', (done) => {
      db.deleteOne({ a: 1 }, (err, deleted) => {
        expect(deleted).to.be.equal(1);
        done();
      });
    });

    it('Expects the method with the filter {} to return 1 doc deleted.', (done) => {
      db.deleteOne({}, (err, deleted) => {
        expect(deleted).to.be.equal(1);
        done();
      });
    });

    it('Expects the method with the filter {} and no callback not to throw any error.', () => {
      db.deleteOne({});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong filter ([]) to return null.', (done) => {
      db.deleteOne([], (err, deleted) => {
        expect(deleted).to.be.null;
        done();
      });
    });

    it('Expects the method with a wrong filter ([]) and no callback not to throw any error.', () => {
      db.deleteOne([]);
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', () => {
      db.deleteOne({ a: 1 }, {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', () => {
      db.deleteOne({ a: 1 }, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method with wrong callback and options not to throw any error.', () => {
      db.deleteOne({ a: 1 }, () => {}, () => {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', () => {
      db.deleteOne({ a: 1 }, []);
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', () => {
      db.deleteOne();
      expect(true).to.be.true;
    });
  });

  describe('The method deleteMany:', () => {
    const db = PicoDB()
        ;

    const doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    it('Expects the method with an undefined database not to throw any error.', () => {
      db.deleteMany();
    });

    it('Expects the method with the filter {} to return 5 deleted documents.', (done) => {
      db.insertMany(doc, () => {
        db.deleteMany({}, (err, deleted) => {
          expect(deleted).to.be.equal(5);
          done();
        });
      });
    });

    it('Expects the method with the filter { a: 1 } to return 4 deleted documents.', (done) => {
      db.insertMany(doc, () => {
        db.deleteMany({ a: 1 }, (err, deleted) => {
          expect(deleted).to.be.equal(4);
          done();
        });
      });
    });
  });
};
