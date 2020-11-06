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
module.exports = function(PicoDB, doc) {
  describe('No Operator:', () => {
    const db = PicoDB();

    let docu
      , _id
      ;

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.updateOne({ a: 1 }, { b: 1 }) to return one document.', async () => {
      const docs = await db.find({ a: 1 }).toArray();
      _id = docs[0]._id;
      const resp = await db.updateOne({ a: 1 }, { b: 1 });
      [docu] = resp;
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expected the returned document to own two properties.', () => {
      expect(Object.keys(docu)).to.be.an('array').that.has.lengthOf(2);
    });

    it('Expected the returned document to own the property "_id" that is a string.', () => {
      expect(docu).to.own.property('_id').that.is.a('string');
    });

    it('Expected the property "_id" has not been modified by the update operation.', () => {
      expect(docu).to.own.property('_id').that.is.equal(_id);
    });

    it('Expected the returned document to own the property "b" that is equal to 1.', () => {
      expect(docu).to.own.property('b').that.is.a('number').that.is.equal(1);
    });
  });

  describe('With dot notation for queries:', () => {
    const db = PicoDB();

    let _id;

    // Fill the db:
    it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
      const resp = await db.insertMany(doc);
      expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
    });

    it('Expects db.updateOne({ "name.first": "John" }, { b: 1 }) to return one document.', async () => {
      const docs = await db.find({ 'name.first': 'John' }).toArray();
      _id = docs[0]._id;
      const resp = await db.updateOne({ 'name.first': 'John' }, { b: 1 });
      expect(resp).to.be.an('array').that.has.lengthOf(1);
    });

    it('Expects db.find({ b: 1 }).toArray() to return a document with the same _id as before updating.', async () => {
      const resp = await db.find({ b: 1 }).toArray();
      expect(resp[0]._id).to.be.a('string').that.is.equal(_id);
    });
  });
};
