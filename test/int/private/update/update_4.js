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
  describe('Field Operators:', () => {
    describe('$inc:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects db.updateOne({ a: 3 }, { $inc: { quantity: 1, metrics: { orders: 1, ratings: { value: 0.5, type: "zzz", newobj: { newfield: "123" }}}}}) to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $inc: { quantity: 1, metrics: { orders: 1, ratings: { value: 0.5, type: 'zzz', newobj: { newfield: 123 } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is equal to 6.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.equal(6);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 2.', () => {
        expect(ndoc.metrics).to.have.ownProperty('orders').that.is.equal(2);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 1.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('value').that.is.equal(1);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "zzz".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.equal('zzz');
      });

      it('Expects this document to own the new property "metrics.ratings.newobj.newfield" that is equal to "123".', () => {
        expect(ndoc.metrics.ratings.newobj).to.have.ownProperty('newfield').that.is.equal(123);
      });
    });


    describe('$mul:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects db.updateOne({ a: 3 }, { $mul: { quantity: 2, metrics: { orders: 3, ratings: { value: 2, type: "zzz", newfield: "123" }}}}) to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $mul: { quantity: 2, metrics: { orders: 3, ratings: { value: 2, type: 'zzz', newfield: 123 } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is equal to 10.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.equal(10);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 3.', () => {
        expect(ndoc.metrics).to.have.ownProperty('orders').that.is.equal(3);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 1.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('value').that.is.equal(1);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "0".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.equal(0);
      });

      it('Expects this document to own the new property "metrics.ratings.type.newfield" that is equal to "0".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('newfield').that.is.equal(0);
      });
    });


    describe('$rename:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects renaming a non existing field to return does not produce any error.', async () => {
        await db.updateOne({ a: 3 }, { $rename: { metrics: { ratings: { valuess: 'valor' } } } });
        expect(true).to.be.equal(true);
      });

      it('Expects db.updateOne({ a: 3 }, { $rename: { quantity: "quantities", metrics: "metricS" }}) to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $rename: { quantity: 'quantities', metrics: 'metricS', xxx: 'zzz' } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document not to own the property "quantity".', () => {
        expect(ndoc).not.to.have.ownProperty('quantity');
      });

      it('Expects this document not to own the property "metrics".', () => {
        expect(ndoc).not.to.have.ownProperty('metrics');
      });

      it('Expects this document not to own the property "xxx".', () => {
        expect(ndoc).not.to.have.ownProperty('xxx');
      });

      it('Expects this document not to own the property "zzz".', () => {
        expect(ndoc).not.to.have.ownProperty('zzz');
      });

      it('Expects this document to own the property "quantities" that is equal to 5.', () => {
        expect(ndoc).to.have.ownProperty('quantities').that.is.equal(5);
      });

      it('Expects this document to own the property "metricS" that is an object.', () => {
        expect(ndoc).to.have.ownProperty('metricS').that.is.an('object');
      });

      it('Expects this document to own the property "metricS.orders" that is equal to 1.', () => {
        expect(ndoc.metricS).to.have.ownProperty('orders').that.is.equal(1);
      });

      it('Expects this document to own the property "metricS.ratings.value" that is equal to 0.5.', () => {
        expect(ndoc.metricS.ratings).to.have.ownProperty('value').that.is.equal(0.5);
      });

      it('Expects this document to own the property "metricS.ratings.type" that is equal to "aaa".', () => {
        expect(ndoc.metricS.ratings).to.have.ownProperty('type').that.is.equal('aaa');
      });
    });


    describe('$set:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects db.updateOne({ a: 3 }, { $set: { quantity: 100, metrics: { orders: 200, ratings: { value: 300, type: "bbb", newfield: "new", newfield2: ["a", "b", "c"] }}}}) to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $set: { quantity: 100, metrics: { orders: 200, ratings: { value: 300, type: 'bbb', newfield: 'new', newfield2: ['a', 'b', 'c'] } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is equal to 100.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.equal(100);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 200.', () => {
        expect(ndoc.metrics).to.have.ownProperty('orders').that.is.equal(200);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 300.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('value').that.is.equal(300);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "bbb".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.equal('bbb');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield" that is equal to "new".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('newfield').that.is.equal('new');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield2" that is an array with 3 elements.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('newfield2').that.is.an('array').that.have.lengthOf(3);
      });

      it('Expects the first element of this array is equal to "a"', () => {
        expect(ndoc.metrics.ratings.newfield2[0]).to.be.equal('a');
      });

      it('Expects the second element of this array is equal to "b"', () => {
        expect(ndoc.metrics.ratings.newfield2[1]).to.be.equal('b');
      });

      it('Expects the third element of this array is equal to "c"', () => {
        expect(ndoc.metrics.ratings.newfield2[2]).to.be.equal('c');
      });
    });


    describe('$unset:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects deleting a non existing field not to produce any error.', async () => {
        /* eslint-disable-next-line max-len */
        await db.updateOne({ a: 3 }, { $unset: { metrics: { ratings: { values: true, othervalues: { others: true } } } } });
        expect(true).to.be.equal(true);
      });

      it('Expects db.updateOne({ a: 3 }, { $unset: { quantity: true, metrics: { ratings: { value: false, type: true }}}}) to return 1 document.', async () => {
        /* eslint-disable-next-line max-len */
        const resp = await db.updateOne({ a: 3 }, { $unset: { quantity: true, metrics: { ratings: { type: true } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document not to own the property "quantity".', () => {
        expect(ndoc).not.to.have.ownProperty('quantity');
      });

      it('Expects this document to own the property "metrics" that is an object.', () => {
        expect(ndoc).to.have.ownProperty('metrics').that.is.an('object');
      });

      it('Expects this document to own the property "metrics.ratings" that is an object.', () => {
        expect(ndoc.metrics).to.have.ownProperty('ratings').that.is.an('object');
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 0.5.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('value').that.is.equal(0.5);
      });

      it('Expects this document not to own the property "metrics.ratings.type".', () => {
        expect(ndoc.metrics.ratings).not.to.have.ownProperty('type');
      });
    });


    describe('$min:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects db.updateOne({ a: 3 }, { $min: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: "aaa", newfield: 555 }}}}) to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $min: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: 'aaa', newfield: 555 } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is equal to 5.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.equal(5);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 0.', () => {
        expect(ndoc.metrics).to.have.ownProperty('orders').that.is.equal(0);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 0.5.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('value').that.is.equal(0.5);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "aaa".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.equal('aaa');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield" that is equal to "555".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('newfield').that.is.equal(555);
      });
    });


    describe('$max:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects { a: 3 }, { $max: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: "aaa", newfield: 555 }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $max: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: 'aaa', newfield: 555 } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is equal to 6.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.equal(6);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 1.', () => {
        expect(ndoc.metrics).to.have.ownProperty('orders').that.is.equal(1);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 0.6.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('value').that.is.equal(0.6);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "aaa".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.equal('aaa');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield" that is equal to "555".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('newfield').that.is.equal(555);
      });
    });


    describe('$currentDate:', () => {
      const db = PicoDB();
      db._db._silent = true;
      let ndoc;

      // Fill the db:
      it('Expects db.insertMany([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertMany(doc);
        expect(resp).to.be.an('array').that.has.lengthOf(doc.length);
      });

      it('Expects { a: 4 }, { $currentDate: { lastModified: true, cancellation: { date: { $type: "timestamp" } }}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 1 }, { $currentDate: { lastModified: true, cancellation: { date: { $type: 'timestamp' } }, cancel2: { date: { $type: 'date' } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "lastModified" that is equal to a string.', () => {
        expect(ndoc).to.have.ownProperty('lastModified').that.is.a('string');
      });

      it('Expects this document to own the property "cancellation.date" that is equal to a number.', () => {
        expect(ndoc.cancellation).to.have.ownProperty('date').that.is.a('number');
      });

      it('Expects this document to own the property "cancel2.date" that is equal to a string.', () => {
        expect(ndoc.cancel2).to.have.ownProperty('date').that.is.a('string');
      });
    });
  });
};
