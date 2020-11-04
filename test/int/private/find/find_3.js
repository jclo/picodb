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
  describe('Test find().toArray() with projections:', () => {
    const db = PicoDB();
    db._db._silent = true;

    const doc = [
      { a: 1 },
      { a: 1, b: null },
      { a: 1, b: 1 },
      { a: 1, b: 1, c: { d: 1 } },
      { a: 1, b: 1, c: { d: 1, e: ['A', 'B', 'C'] } },
      { a: { b: { c: { d: { e: 1 } } } } },
    ];

    // Fill db
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    describe('Test include projections:', () => {
      let doc4
        , doc44
        , doc444
        , doc4444
        , doc44444
        ;

      // projection { a: 1 }
      it('Expects db.find({}, { a: 1 }).toArray() to return 6 documents.', async () => {
        const resp = await db.find({}, { a: 1 }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc4 = resp;
      });
      it('Expects the returned documents to own 2 properties only.', () => {
        expect(Object.keys(doc4[4])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the returned documents to own the property "_id" that is a string.', () => {
        expect(doc4[4]).to.own.property('_id').that.is.a('string');
      });
      it('Expects the returned documents to own the property "a".', () => {
        expect(doc4[4]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });


      // projection { b: 1 }
      it('Expects db.find({}, { b: 1 }).toArray((err, resp) => ...) to return 6 documents.', async () => {
        const resp = await db.find({}, { b: 1 }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc44 = resp;
      });
      it('Expects the first returned document to own 1 property only.', () => {
        expect(Object.keys(doc44[0])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the second returned document to own 1 property only.', () => {
        expect(Object.keys(doc44[1])).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the third returned document to own 2 properties.', () => {
        expect(Object.keys(doc44[2])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(doc44[2]).to.own.property('_id').that.is.a('string');
      });
      it('Expects this document to own the property "b" that is equal to 1.', () => {
        expect(doc44[2]).to.own.property('b').that.is.a('number').that.is.equal(1);
      });

      // projection { c: { e: 1 }}
      it('Expects db.find({}, { c: { e: 1 } }).toArray() to return 6 documents.', async () => {
        const resp = await db.find({}, { c: { e: 1 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc444 = resp;
      });
      it('Expects the first returned document to own 1 property only.', () => {
        expect(Object.keys(doc444[0])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the second returned document to own 1 property only.', () => {
        expect(Object.keys(doc444[1])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the third returned document to own 1 property only.', () => {
        expect(Object.keys(doc444[2])).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects the fourth returned document to own 2 properties.', () => {
        expect(Object.keys(doc444[3])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(doc444[3]).to.own.property('_id').that.is.a('string');
      });
      it('Expects this document to own the property "c" that is an object.', () => {
        expect(doc444[3]).to.own.property('c').that.is.an('object');
      });
      it('Expects this object no to have any property.', () => {
        expect(Object.keys(doc444[3].c)).to.be.an('array').that.has.lengthOf(0);
      });

      it('Expects the fifth returned document to own 2 properties.', () => {
        expect(Object.keys(doc444[4])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(doc444[4]).to.own.property('_id').that.is.a('string');
      });
      it('Expects this document to own the property "c" that is an object.', () => {
        expect(doc444[4]).to.own.property('c').that.is.an('object');
      });
      it('Expects this object to have one property.', () => {
        expect(Object.keys(doc444[4].c)).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects this property to own the property "e" that is an array with 3 elements.', () => {
        expect(doc444[4].c).to.own.property('e').that.is.an('array').that.has.lengthOf(3);
      });

      // projection { _id: 0, a: 1 }
      it('Expects db.find({}, { _id: 0, a: 1 }).toArray() to return 6 documents.', async () => {
        const resp = await db.find({}, { _id: 0, a: 1 }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc4444 = resp;
      });
      it('Expects the first returned document to own 1 property only.', () => {
        expect(Object.keys(doc4444[0])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the second returned document to own 1 property only.', () => {
        expect(Object.keys(doc4444[1])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the third returned document to own 1 property only.', () => {
        expect(Object.keys(doc4444[2])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the fourth returned document to own 1 property only.', () => {
        expect(Object.keys(doc4444[2])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the fifth returned document to own 1 property only.', () => {
        expect(Object.keys(doc4444[2])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the sixth returned document to own 0 property.', () => {
        expect(Object.keys(doc4444[2])).to.be.an('array').that.has.lengthOf(1);
      });

      // projection { _id: 0, c: 1 }
      it('Expects db.find({}, { _id: 0, c: { d: 1 } }).toArray() to return 6 documents.', async () => {
        const resp = await db.find({}, { _id: 0, c: 1 }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc44444 = resp;
      });
      it('Expects the first returned document to own 0 property.', () => {
        expect(Object.keys(doc44444[0])).to.be.an('array').that.has.lengthOf(0);
      });
      it('Expects the second returned document to own 0 property.', () => {
        expect(Object.keys(doc44444[1])).to.be.an('array').that.has.lengthOf(0);
      });
      it('Expects the third returned document to own 0 property.', () => {
        expect(Object.keys(doc44444[2])).to.be.an('array').that.has.lengthOf(0);
      });
      it('Expects the fourth returned document to own 1 property.', () => {
        expect(Object.keys(doc44444[3])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the fifth returned document to own 1 property.', () => {
        expect(Object.keys(doc44444[4])).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects the sixth returned document to own 0 property.', () => {
        expect(Object.keys(doc44444[5])).to.be.an('array').that.has.lengthOf(0);
      });
      //
    });

    describe('Test exlude projections:', () => {
      let doc4
        , doc44
        ;

      it('Expects db.find({}, { b: 0, c: 0 }).toArray() to return 6 documents.', async () => {
        const resp = await db.find({}, { b: 0, c: 0 }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc4 = resp;
      });
      it('Expects the first returned document to own 2 properties.', () => {
        expect(Object.keys(doc4[0])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the second returned document to own 2 properties.', () => {
        expect(Object.keys(doc4[1])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the third returned document to own 2 properties.', () => {
        expect(Object.keys(doc4[2])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the fourth returned document to own 2 properties.', () => {
        expect(Object.keys(doc4[3])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the fifth returned document to own 2 properties.', () => {
        expect(Object.keys(doc4[4])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the sixth returned document to own 2 properties.', () => {
        expect(Object.keys(doc4[5])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects the fifth returned document to own the property "_id" that is a string.', () => {
        expect(doc4[4]).to.own.property('_id').that.is.a('string');
      });
      it('Expects the fifth returned document to own the property "a" that is a number equal to 1.', () => {
        expect(doc4[4]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });

      it('Expects db.find({}, { b: 0, c: { d: 0 } }).toArray() to return 6 documents.', async () => {
        const resp = await db.find({}, { b: 0, c: { d: 0 } }).toArray();
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
        doc44 = resp;
      });

      it('Expects the first returned document to own 2 properties.', () => {
        expect(Object.keys(doc44[0])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the second returned document to own 2 properties.', () => {
        expect(Object.keys(doc44[1])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the third returned document to own 2 properties.', () => {
        expect(Object.keys(doc44[2])).to.be.an('array').that.has.lengthOf(2);
      });
      it('Expects the fourth returned document to own 3 properties.', () => {
        expect(Object.keys(doc44[3])).to.be.an('array').that.has.lengthOf(3);
      });
      it('Expects the fifth returned document to own 3 properties.', () => {
        expect(Object.keys(doc44[4])).to.be.an('array').that.has.lengthOf(3);
      });
      it('Expects the sixth returned document to own 2 properties.', () => {
        expect(Object.keys(doc44[5])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects the fifth returned document to own the property "_id" that is a string.', () => {
        expect(doc44[4]).to.own.property('_id').that.is.a('string');
      });
      it('Expects the fifth returned document to own the property "a" that is a number equal to 1.', () => {
        expect(doc44[4]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });
      it('Expects the fifth returned document to own the property "c" that is an object.', () => {
        expect(doc44[4]).to.own.property('c').that.is.an('object');
      });
      it('Expects this object to own one property.', () => {
        expect(Object.keys(doc44[4].c)).to.be.an('array').that.has.lengthOf(1);
      });
      it('Expects this object to own the property e that is an array of 3 elements.', () => {
        expect(doc44[4].c).to.own.property('e').that.is.an('array').that.has.lengthOf(3);
      });
    });
  });
};
