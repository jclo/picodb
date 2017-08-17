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
  describe('The method count:', () => {
    const db = PicoDB.Create()
        ;

    const doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    it('Expects the method with an undefined database not to throw any error.', () => {
      db.count({});
    });

    it('Expects the filter {} to return count = 4.', (done) => {
      db.insertMany(doc, () => {
        db.count({ a: 1 }, (err, count) => {
          expect(count).to.be.equal(4);
          done();
        });
      });
    });

    it('Expects the filter { a: 1 } to return count = 4.', (done) => {
      db.count({ a: 1 }, (err, count) => {
        expect(count).to.be.equal(4);
        done();
      });
    });

    it('Expects the filter { a: 1, b: 1 } to return count = 3.', (done) => {
      db.count({ a: 1, b: 1 }, (err, count) => {
        expect(count).to.be.equal(3);
        done();
      });
    });

    it('Expects the filter { a: 1, b: 1, c: { d: 1 } } to return count = 2.', (done) => {
      db.count({ a: 1, b: 1, c: { d: 1 } }, (err, count) => {
        expect(count).to.be.equal(2);
        done();
      });
    });

    it('Expects the filter { a: 1, b: 1, c: { d: 1, e : ["A", "B", "C"] } } to return count = 1.', (done) => {
      db.count({ a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } }, (err, count) => {
        expect(count).to.be.equal(1);
        done();
      });
    });

    it('Expects the filter { a: 2 } to return count = 0.', (done) => {
      db.count({ a: 2 }, (err, count) => {
        expect(count).to.be.equal(0);
        done();
      });
    });

    it('Expects the filter { a: { b: { c: { d: { e: 1 }}}} } to return count = 1.', (done) => {
      db.count({ a: { b: { c: { d: { e: 1 } } } } }, (err, count) => {
        expect(count).to.be.equal(1);
        done();
      });
    });

    it('Expects the filter { a: { b: { c: { d: { e: 2 }}}} } to return count = 0.', (done) => {
      db.count({ a: { b: { c: { d: { e: 2 } } } } }, (err, count) => {
        expect(count).to.be.equal(0);
        done();
      });
    });

    it('Expects the method with a non valid query to return an error.', () => {
      db.count([{ a: 1 }], (err) => {
        expect(err).to.be.a('string');
      });
    });

    it('Expects the method with a non valid query and no callback not to throw any error.', () => {
      db.count([{ a: 1 }]);
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong callback not to throw any error.', () => {
      db.count({ d: 1 }, {}, []);
      expect(true).to.be.true;
    });

    it('Expects the method without callback not to throw any error.', () => {
      db.count({ d: 1 }, {});
      expect(true).to.be.true;
    });

    it('Expects the method with wrong callback and options not to throw any error.', () => {
      db.count({ d: 1 }, () => {}, () => {});
      expect(true).to.be.true;
    });

    it('Expects the method with a wrong argument options not to throw any error.', () => {
      db.count({ d: 1 }, []);
      expect(true).to.be.true;
    });

    it('Expects the method without arguments not to throw any error.', () => {
      db.count();
      expect(true).to.be.true;
    });
  });
};
