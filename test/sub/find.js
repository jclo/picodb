/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-unused-expressions: 0, prefer-destructuring: 0 */

'use strict';

// -- Node modules
const { expect } = require('chai')
    ;

// -- Local modules
const PicoDB = require('../../index.js')
    ;

// -- Local constants


// -- Main
module.exports = function() {
  describe('The method find:', () => {
    const db = PicoDB()
        ;

    const doc = [
      { a: 1 },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    it('Expects the method with an undefined database to not throw any error.', () => {
      db.find({}).toArray();
    });

    it('Expects the method with an undefined database to return an empty array.', (done) => {
      db.find({}).toArray((err, docs) => {
        expect(docs).to.be.an('array').that.have.lengthOf(0);
        done();
      });
    });

    it('Expects the method with query { a: 1 } to return 4 documents.', (done) => {
      db.insertMany(doc, () => {
        db.find({ a: 1 }).toArray((err, docs) => {
          expect(docs).to.have.lengthOf(4);
          done();
        });
      });
    });

    it('Expects the method with query { b: 1 } to return 3 documents.', (done) => {
      db.find({ b: 1 }).toArray((err, docs) => {
        expect(docs).to.have.lengthOf(3);
        done();
      });
    });

    it('Expects the method with query { c: { d: 1, e: ["A", "B", "C"] }} to return 1 document.', (done) => {
      db.find({ c: { d: 1, e: ['A', 'B', 'C'] } }).toArray((err, docs) => {
        expect(docs).to.have.lengthOf(1);
        done();
      });
    });

    it('Expects the method with an empty query to return all the 5 documents.', (done) => {
      db.find({}).toArray((err, docs) => {
        expect(docs).to.have.lengthOf(5);
        done();
      });
    });

    it('Expects the method without query to return all the 5 documents.', (done) => {
      db.find().toArray((err, docs) => {
        expect(docs).to.have.lengthOf(5);
        done();
      });
    });

    it('Expects the method with a wrong query to return an error.', (done) => {
      const fn = function() {};
      db.find(fn).toArray((err) => {
        expect(err).to.be.a('string');
        done();
      });
    });

    // it('Expects the method with a wrong query to return an error.', (done) => {
    //   db.find([]).toArray((err) => {
    //     expect(err).to.be.a('string');
    //     done();
    //   });
    // });

    it('Expects the method without a callback to not throw any error.', () => {
      db.find().toArray();
      expect(true).to.be.a.true;
    });

    it('Expects the method with a wrong callback to not throw any error.', () => {
      db.find().toArray([]);
      expect(true).to.be.a.true;
    });

    describe('projection:', () => {
      describe('include:', () => {
        let doc4
          , doc44
          , doc444
          , doc4444
          ;

        it('Expects the projection { a: 1, b: 1, c: { e: 1 }} to return 5 documents.', () => {
          db.find({}, { a: 1, b: 1, c: { d: 0, e: 1 } }).toArray((err, docs) => {
            doc4 = docs[3];
            expect(doc).to.have.lengthOf(5);
          });
        });

        it('Expects the fourth document to have the property "_id" that is a string.', () => {
          expect(doc4).to.have.property('_id').that.is.a('string');
        });

        it('Expects the fourth document to have the property "a" equal to 1.', () => {
          expect(doc4).to.have.property('a').that.is.equal(1);
        });

        it('Expects the fourth document to have the property "b" equal to 1.', () => {
          expect(doc4).to.have.property('b').that.is.equal(1);
        });

        it('Expects the fourth document to have the property "c" that is an object.', () => {
          expect(doc4).to.have.property('c').that.is.an('object');
        });

        it('Expects the fourth document to not have the property "d".', () => {
          expect(doc4).not.to.have.deep.property('c.d');
        });

        it('Expects the fourth document to have the property "e" that is an array. ', () => {
          expect(doc4.c).to.have.property('e').that.is.an('array');
        });

        it('Expects the projection { aaa: 1, bbb: { ccc: 1 } } to return 5 documents.', () => {
          db.find({}, { aaa: 1, bbb: { ccc: 1 } }).toArray((err, docs) => {
            doc44 = docs[3];
            expect(doc).to.have.lengthOf(5);
          });
        });

        it('Expects the documents to not have the property "aaa". ', () => {
          expect(doc44).not.to.have.property('aaa');
        });

        it('Expects the documents to not have the property "bbb". ', () => {
          expect(doc44).not.to.have.property('bbb');
        });

        it('Expects the projection { _id: 0, a: 1, b: 1, c: { e: 1 }} to return 5 documents.', () => {
          db.find({}, {
            _id: 0, a: 1, b: 1, c: { d: 0, e: 1 },
          }).toArray((err, docs) => {
            doc444 = docs[3];
            expect(doc).to.have.lengthOf(5);
          });
        });

        it('Expects the fourth document to not have the property "_id".', () => {
          expect(doc444).to.not.have.property('_id');
        });

        it('Expects the fourth document to have the property "a" equal to 1.', () => {
          expect(doc444).to.have.property('a').that.is.equal(1);
        });

        it('Expects the fourth document to have the property "b" equal to 1.', () => {
          expect(doc444).to.have.property('b').that.is.equal(1);
        });

        it('Expects the fourth document to have the property "c" that is an object.', () => {
          expect(doc444).to.have.property('c').that.is.an('object');
        });

        it('Expects the fourth document to not have the property "d".', () => {
          expect(doc444).not.to.have.deep.property('c.d');
        });

        it('Expects the fourth document to have the property "e" that is an array. ', () => {
          expect(doc444.c).to.have.property('e').that.is.an('array');
        });

        it('Expects the projection { c: { e: 1 }} to return 5 documents.', () => {
          db.find({}, { c: { e: 1 } }).toArray((err, docs) => {
            doc4444 = docs[3];
            expect(doc).to.have.lengthOf(5);
          });
        });

        it('Expects the fourth document to not have the property "a".', () => {
          expect(doc4444).not.to.have.property('a');
        });

        it('Expects the fourth document to not have the property "d".', () => {
          expect(doc4444).not.to.have.deep.property('c.d');
        });
      });


      describe('exclude:', () => {
        let doc4
          , doc44
          ;

        it('Expects the projection { b: 0, c: 0 } to return 5 documents.', () => {
          db.find({}, { b: 0, c: 0 }).toArray((err, docs) => {
            doc4 = docs[3];
            expect(doc).to.have.lengthOf(5);
          });
        });

        it('Expects the fourth document to have the property "_id" that is a string.', () => {
          expect(doc4).to.have.property('_id').that.is.a('string');
        });

        it('Expects the fourth document to have the property "a" equal to 1.', () => {
          expect(doc4).to.have.property('a').that.is.equal(1);
        });

        it('Expects the fourth document to not have the property "b".', () => {
          expect(doc4).to.not.have.property('b');
        });

        it('Expects the fourth document to not have the property "c".', () => {
          expect(doc4).to.not.have.property('c');
        });

        it('Expects the projection { b: 0, c: { d: 0 } } to return 5 documents.', () => {
          db.find({}, { b: 0, c: { d: 0 } }).toArray((err, docs) => {
            doc44 = docs[3];
            expect(doc).to.have.lengthOf(5);
          });
        });

        it('Expects the fourth document to have the property "_id" that is a string.', () => {
          expect(doc44).to.have.property('_id').that.is.a('string');
        });

        it('Expects the fourth document to have the property "a" equal to 1.', () => {
          expect(doc44).to.have.property('a').that.is.equal(1);
        });

        it('Expects the fourth document to not have the property "b".', () => {
          expect(doc44).to.not.have.property('b');
        });

        it('Expects the fourth document to have the property "c" that is an object.', () => {
          expect(doc44).to.have.property('c').that.is.an('object');
        });

        it('Expects the fourth document to not have the property "d".', () => {
          expect(doc44).to.not.have.deep.property('c.d');
        });

        it('Expects the fourth document to have the property "e" that is an array.', () => {
          expect(doc44.c).to.have.deep.property('e').that.is.an('array');
        });

        it('Expects the projection "cuicui" to return 5 documents.', () => {
          db.find({}, 'cuicui').toArray((err, docs) => {
            expect(docs).to.have.lengthOf(5);
          });
        });
      });
    });
  });
};
