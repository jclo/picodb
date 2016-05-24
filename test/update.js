/* global describe, it */
/* eslint  max-len: [1, 185, 1] */
'use strict';

// -- Node modules
var expect = require('chai').expect
  ;

// -- Local modules
var PicoDB = require('../index.js')
  ;

// -- Local constants
var docs = [
  { a: 1 },
  { a: 2, name: { first: 'John', last: 'Doe' }},
  { a: 3, quantity: 5, metrics: { orders: 1, ratings: { value: 0.5, type: 'aaa'}}},
  { a: 4, lastModified: null, cancellation: { date: null } }
];

// -- Local variables


// -- Main
module.exports = function() {

  describe('The method updateOne:', function() {

    describe('General:', function() {
      var db = PicoDB.Create();

      it('Expects the method with an undefined database not to throw any error.', function() {
        db.updateOne({});
      });

      it('Expects the method with unmatched filter not to update any document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ x: 5 }, { y: 2 }, function(err, docs) {
            expect(docs).to.have.lengthOf(0);
            done();
          });
        });
      });

      it('Expects the method with unmatched filter and no callback not to throw any error.', function() {
        db.updateOne({ x: 5 }, { y: 2 });
        expect(true).to.be.true;
      });

      it('Expects the method with a wrong filter to return an error.', function() {
        db.updateOne('aaa', {}, function(err) {
          expect(err).to.be.a.string;
        });
      });

      it('Expects the method with a wrong filter and no callback not to throw any error.', function() {
        db.updateOne('aaa', {});
        expect(true).to.be.true;
      });

      it('Expects the method with a wrong update to return any error.', function() {
        db.updateOne({}, 'aaa', function(err) {
          expect(err).to.be.a.string;
        });
      });

      it('Expects the method with a wrong update and no callback not to throw any error.', function() {
        db.updateOne({}, 'aaa');
        expect(true).to.be.true;
      });

      it('Expects the method with a wrong callback not to throw any error.', function() {
        db.updateOne({ a: 'x' }, {}, {}, []);
        expect(true).to.be.true;
      });

      it('Expects the method without callback not to throw any error.', function() {
        db.updateOne({ a: 'x' }, {}, {});
        expect(true).to.be.true;
      });

      it('Expects the method with wrong callback and options not to throw any error.', function() {
        db.updateOne({ a: 'x' }, {}, function() {}, function() {});
        expect(true).to.be.true;
      });

      it('Expects the method with a wrong argument options not to throw any error.', function() {
        db.updateOne({ a: 'x' }, {}, []);
        expect(true).to.be.true;
      });

      it('Expects the method without arguments not to throw any error.', function() {
        db.updateOne();
        expect(true).to.be.true;
      });
    });

    describe('No Operator:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects {}, { b: 1 } to return 1 document.', function() {
        db.insertMany(docs, function() {
          db.updateOne({}, { b: 1 }, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
          });
        });
      });

      it ('Expects this document to own the property "_id".', function() {
        expect(newdocs).to.have.ownProperty('_id');
      });

      it ('Expects this document to own the property "b".', function() {
        expect(newdocs).to.have.ownProperty('b');
      });

      it ('Expects this document to have only these two properties.', function() {
        expect(Object.keys(newdocs).length).to.be.equal(2);
      });
    });

    describe('$inc:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $inc: { quantity: 1, metrics: { orders: 1, ratings: { value: 0.5, type: "zzz", newobj: { newfield: "123" }}}}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $inc: { quantity: 1, metrics: { orders: 1, ratings: { value: 0.5, type: 'zzz', newobj: { newfield: 123 }}}} }, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document to own the property "quantity" that is equal to 6.', function() {
        expect(newdocs).to.have.property('quantity').that.is.equal(6);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 2.', function() {
        expect(newdocs).to.have.deep.property('metrics.orders').that.is.equal(2);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 1.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.value').that.is.equal(1);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "zzz".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.type').that.is.equal('zzz');
      });

      it('Expects this document to own the new property "metrics.ratings.newobj.newfield" that is equal to "123".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.newobj.newfield').that.is.equal(123);
      });
    });

    describe('$mul:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $mul: { quantity: 2, metrics: { orders: 3, ratings: { value: 2, type: "zzz", newfield: "123" }}}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $mul: { quantity: 2, metrics: { orders: 3, ratings: { value: 2, type: 'zzz', newfield: 123 }}} }, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document to own the property "quantity" that is equal to 10.', function() {
        expect(newdocs).to.have.property('quantity').that.is.equal(10);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 3.', function() {
        expect(newdocs).to.have.deep.property('metrics.orders').that.is.equal(3);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 1.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.value').that.is.equal(1);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "0".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.type').that.is.equal(0);
      });

      it('Expects this document to own the new property "metrics.ratings.type.newfield" that is equal to "0".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.newfield').that.is.equal(0);
      });
    });

    describe('$rename:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $rename: { quantity: "quantities", metrics: "metricS" }} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $rename: { quantity: 'quantities', metrics: 'metricS'} }, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document not to own the property "quantity".', function() {
        expect(newdocs).not.to.have.property('quantity');
      });

      it('Expects this document not to own the property "metrics".', function() {
        expect(newdocs).not.to.have.property('metrics');
      });

      it('Expects this document to own the property "quantities" that is equal to 5.', function() {
        expect(newdocs).to.have.property('quantities').that.is.equal(5);
      });

      it('Expects this document to own the property "metricS" that is an object.', function() {
        expect(newdocs).to.have.property('metricS').that.is.an('object');
      });

      it('Expects this document to own the property "metricS.orders" that is equal to 1.', function() {
        expect(newdocs).to.have.deep.property('metricS.orders').that.is.equal(1);
      });

      it('Expects this document to own the property "metricS.ratings.value" that is equal to 0.5.', function() {
        expect(newdocs).to.have.deep.property('metricS.ratings.value').that.is.equal(0.5);
      });

      it('Expects this document to own the property "metricS.ratings.type" that is equal to "aaa".', function() {
        expect(newdocs).to.have.deep.property('metricS.ratings.type').that.is.equal('aaa');
      });

      it('Expects renaming a non existing field not to throw any error.', function(done) {
        db.updateOne({ a: 3}, { $rename: { metrics: { ratings: { values: 'valor' }}}}, function() {
          expect(true).to.be.true;
          done();
        });
      });
    });

    describe('$set:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $set: { quantity: 100, metrics: { orders: 200, ratings: { value: 300, type: "bbb", newfield: "new" }}}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $set: { quantity: 100, metrics: { orders: 200, ratings: { value: 300, type: 'bbb', newfield: 'new' }}}}, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document to own the property "quantity" that is equal to 100.', function() {
        expect(newdocs).to.have.property('quantity').that.is.equal(100);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 200.', function() {
        expect(newdocs).to.have.deep.property('metrics.orders').that.is.equal(200);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 300.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.value').that.is.equal(300);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "bbb".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.type').that.is.equal('bbb');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield" that is equal to "new".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.newfield').that.is.equal('new');
      });
    });

    describe('$unset:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $unset: { quantity: true, metrics: { ratings: { value: false, type: true }}}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $unset: { quantity: true, metrics: { ratings: { type: true }}}}, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document not to own the property "quantity".', function() {
        expect(newdocs).not.to.have.property('quantity');
      });

      it('Expects this document to own the property "metrics" that is an object.', function() {
        expect(newdocs).to.have.property('metrics').that.is.an('object');
      });

      it('Expects this document to own the property "metrics.ratings" that is an object.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings').that.is.an('object');
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 0.5.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.value').that.is.equal(0.5);
      });

      it('Expects this document not to own the property "metrics.ratings.type".', function() {
        expect(newdocs).not.to.have.property('metrics.ratings.type');
      });

      it('Expects deleting a non existing field not to throw any error.', function(done) {
        db.updateOne({ a: 3}, { $unset: { metrics: { ratings: { values: true, othervalues: { others: true }}}}}, function() {
          expect(true).to.be.true;
          done();
        });
      });
    });

    describe('$min:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $min: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: "aaa", newfield: 555 }}}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $min: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: 'aaa', newfield: 555 }}}}, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document to own the property "quantity" that is equal to 5.', function() {
        expect(newdocs).to.have.property('quantity').that.is.equal(5);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 0.', function() {
        expect(newdocs).to.have.deep.property('metrics.orders').that.is.equal(0);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 0.5.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.value').that.is.equal(0.5);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "aaa".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.type').that.is.equal('aaa');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield" that is equal to "555".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.newfield').that.is.equal(555);
      });
    });

    describe('$max:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 3 }, { $max: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: "aaa", newfield: 555 }}}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $max: { quantity: 6, metrics: { orders: 0, ratings: { value: 0.6, type: 'aaa', newfield: 555 }}}}, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document to own the property "quantity" that is equal to 6.', function() {
        expect(newdocs).to.have.property('quantity').that.is.equal(6);
      });

      it('Expects this document to own the property "metrics.orders" that is equal to 1.', function() {
        expect(newdocs).to.have.deep.property('metrics.orders').that.is.equal(1);
      });

      it('Expects this document to own the property "metrics.ratings.value" that is equal to 0.6.', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.value').that.is.equal(0.6);
      });

      it('Expects this document to own the property "metrics.ratings.type" that is equal to "aaa".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.type').that.is.equal('aaa');
      });

      it('Expects this document to own the new property "metrics.ratings.newfield" that is equal to "555".', function() {
        expect(newdocs).to.have.deep.property('metrics.ratings.newfield').that.is.equal(555);
      });
    });

    describe('$currentDate:', function() {
      var db = PicoDB.Create()
        , newdocs
        ;

      it('Expects { a: 4 }, { $currentDate: { lastModified: true, cancellation: { date: { $type: "timestamp" } }}} to return 1 document.', function(done) {
        db.insertMany(docs, function() {
          db.updateOne({ a: 3 }, { $currentDate: { lastModified: true, cancellation: { date: { $type: 'timestamp' } }}}, function(err, docs) {
            newdocs = docs[0];
            expect(docs).to.have.lengthOf(1);
            done();
          });
        });
      });

      it('Expects this document to own the property "lastModified" that is equal to a string.', function() {
        expect(newdocs).to.have.property('lastModified').that.is.a('string');
      });

      it('Expects this document to own the property "cancellation.date" that is equal to a number.', function() {
        expect(newdocs).to.have.deep.property('cancellation.date').that.is.a('number');
      });
    });
  });

  describe('The method updateMany:', function() {
    var db = PicoDB.Create();

    it ('Expects { a: { $gte: 1 }} { a: 1 } to return 4 documents', function(done) {
      db.insertMany(docs, function() {
        db.updateMany({ a: { $gte: 1 }}, { a: 1 }, function(err, doc) {
          expect(doc).to.have.lengthOf(4);
          done();
        });
      });
    });
  });
};
