/* global describe, it */
/* eslint import/no-extraneous-dependencies: 0, no-unused-expressions: 0 */

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
  describe('The methods EventListener:', () => {
    const db = PicoDB.Create()
        ;

    it('Expects the method insertOne to fire the event "insert".', (done) => {
      db.one('insert', (doc) => {
        expect(doc).to.have.lengthOf(1);
        done();
      });
      db.insertOne({ a: 1 });
    });

    it('Expects the method insertOne to fire the event "change".', () => {
      db.one('change', (doc) => {
        expect(doc).to.have.lengthOf(1);
      });
      db.insertOne({ a: 1 });
    });

    it('Expects the method insertMany to fire the event "insert".', () => {
      db.one('insert', (doc) => {
        expect(doc).to.have.lengthOf(3);
      });
      db.insertMany([{ a: 1 }, { b: 1 }, { c: 5 }]);
    });

    it('Expects the method insertMany to fire the event "change".', () => {
      db.one('change', (doc) => {
        expect(doc).to.have.lengthOf(3);
      });
      db.insertMany([{ a: 1 }, { b: 1 }, { c: 5 }]);
    });

    it('Expects the method updateOne to fire the event "update".', () => {
      db.one('update', (doc) => {
        expect(doc).to.have.lengthOf(1);
      });
      db.updateOne({ a: 1 }, { a: 1, b: 1 });
    });

    it('Expects the method updateOne to fire the event "change".', () => {
      db.one('change', (doc) => {
        expect(doc).to.have.lengthOf(1);
      });
      db.updateOne({ a: 1 }, { a: 1, b: 2 });
    });

    it('Expects the method updateMany to fire the event "update".', () => {
      db.one('update', (doc) => {
        expect(doc).to.have.lengthOf(4);
      });
      db.updateMany({ a: 1 }, { a: 1, c: 1 });
    });

    it('Expects the method updateMany to fire the event "change".', () => {
      db.one('change', (doc) => {
        expect(doc).to.have.lengthOf(4);
      });
      db.updateMany({ a: 1 }, { a: 1, c: 2 });
    });

    it('Expects the method deleteOne to fire the event "delete".', () => {
      db.one('delete', (doc) => {
        expect(doc).to.have.lengthOf(1);
      });
      db.deleteOne({ a: 1 });
    });

    it('Expects the method deleteOne to fire the event "change".', () => {
      db.one('change', (doc) => {
        expect(doc).to.have.lengthOf(1);
      });
      db.deleteOne({ a: 1 });
    });

    it('Expects the method deleteMany to fire the event "delete".', () => {
      db.one('delete', (doc) => {
        expect(doc).to.have.lengthOf(2);
      });
      db.deleteMany({ c: 5 });
    });

    it('Expects the method removeEventListener to stop firing events.', () => {
      const handler = (doc) => {
        expect(doc).to.have.lengthOf(1);
        db.off('insert', handler);
      };

      db.on('insert', handler);
      db.insertOne({ a: 1 });
      db.insertMany([{ a: 1 }, { b: 1 }]);
    });

    it('Expects events on an undefined database not to throw any error.', () => {
      db.db = undefined;
      db.addEventListener('change', () => {});
      db.db = undefined;
      db.addOneTimeEventListener('change', () => {});
      db.db = undefined;
      db.removeEventListener('change', () => {});
      expect(true).to.be.true;
    });

    it('Expects undefined events not to throw any error.', () => {
      db.addEventListener('xyz', () => {});
      db.addOneTimeEventListener('xyz', () => {});
      db.removeEventListener('xyz', () => {});
      expect(true).to.be.true;
    });
  });
};
