/* global describe, it */
/* eslint  max-len: [1, 250, 1] */
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

    describe('Field Operators:', function() {
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
            db.updateOne({ a: 3 }, { $rename: { quantity: 'quantities', metrics: 'metricS', xxx: 'zzz' } }, function(err, docs) {
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

        it('Expects this document not to own the property "xxx".', function() {
          expect(newdocs).not.to.have.property('xxx');
        });

        it('Expects this document not to own the property "zzz".', function() {
          expect(newdocs).not.to.have.property('zzz');
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
          db.updateOne({ a: 3}, { $rename: { metrics: { ratings: { valuess: 'valor' }}}}, function() {
            expect(true).to.be.true;
            done();
          });
        });
      });

      describe('$set:', function() {
        var db = PicoDB.Create()
          , newdocs
          ;

        it('Expects { a: 3 }, { $set: { quantity: 100, metrics: { orders: 200, ratings: { value: 300, type: "bbb", newfield: "new", newfield2: ["a", "b", "c"] }}}} to return 1 document.', function(done) {
          db.insertMany(docs, function() {
            db.updateOne({ a: 3 }, { $set: { quantity: 100, metrics: { orders: 200, ratings: { value: 300, type: 'bbb', newfield: 'new', newfield2: ['a', 'b', 'c'] }}}}, function(err, docs) {
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

        it('Expects this document to own the new property "metrics.ratings.newfield2" that is an array with 3 elements.', function() {
          expect(newdocs).to.have.deep.property('metrics.ratings.newfield2').that.is.an('array').that.have.lengthOf(3);
        });

        it('Expects the first element of this array is equal to "a"', function() {
          expect(newdocs.metrics.ratings.newfield2[0]).to.be.equal('a');
        });

        it('Expects the second element of this array is equal to "b"', function() {
          expect(newdocs.metrics.ratings.newfield2[1]).to.be.equal('b');
        });

        it('Expects the third element of this array is equal to "c"', function() {
          expect(newdocs.metrics.ratings.newfield2[2]).to.be.equal('c');
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
          db.insertMany({ a: 1, lastModified: null, cancellation: { date: null }}, function() {
            db.updateOne({ a: 1 }, { $currentDate: { lastModified: true, cancellation: { date: { $type: 'timestamp' }}, cancel2: { date: { $type: 'date' }}}}, function(err, docs) {
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

        it('Expects this document to own the property "cancel2.date" that is equal to a string.', function() {
          expect(newdocs).to.have.deep.property('cancel2.date').that.is.a('string');
        });

      });
    });

    describe('Array Operators:', function() {

      describe('$pop:', function() {
        var db = PicoDB.Create()
          , doc
          ;

        it ('Expects { a: 3} { $pop: { quantity: 1, metrics: { orders: 1, ratings: { values: -1, type: 2, newfield: 3 }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 3, quantity: ['a', 'b', 'c'], metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa', newfield: [0] }}}, function() {
            db.updateOne({ a: 3}, { $pop: { quantity: 1, metrics: { orders: 1, ratings: { values: -1, type: 2, newfield: 3 }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it ('Expects this document to own the property "quantity" that is an array.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array');
        });

        it('Expects this property to contain two values.', function() {
          expect(doc.quantity.length).is.equal(2);
        });

        it(('Expects the first value to be "a".'), function() {
          expect(doc.quantity[0]).is.equal('a');
        });

        it(('Expects the second value to be "b".'), function() {
          expect(doc.quantity[1]).is.equal('b');
        });

        it ('Expects this document to own the property "metrics.orders" that is an array.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array');
        });

        it('Expects this property to contain one value.', function() {
          expect(doc.metrics.orders.length).is.equal(1);
        });

        it(('Expects this value to be "x".'), function() {
          expect(doc.metrics.orders[0]).is.equal('x');
        });

        it ('Expects this document to own the property "metrics.ratings.values" that is an array.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array');
        });

        it('Expects this property to contain two values.', function() {
          expect(doc.metrics.ratings.values.length).is.equal(2);
        });

        it(('Expects the first value to be "cd".'), function() {
          expect(doc.metrics.ratings.values[0]).is.equal('cd');
        });

        it(('Expects the second value to be "ef".'), function() {
          expect(doc.metrics.ratings.values[1]).is.equal('ef');
        });

        it('Expects this document to own the property "type" that is an string with the value equal to "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.an('string').that.is.equal('aaa');
        });
      });

      describe('$pullAll:', function() {
        var db = PicoDB.Create()
          , doc
          ;

        it('Expects { a: 1 }, { $pullAll: { quantity: ["a", "b", "c"], metrics: { orders: [5, 7], ratings: { values: [0, "a"] }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 1, quantity: ['a', 'b', 'c', 'd', 'e', 'b', 'c', 'a', 'f'], metrics: { orders: [4, 5, 6], ratings: { values: [7, 8, 9], type: 'aaa' }}}, function() {
            db.updateOne({ a: 1 }, { $pullAll: { quantity: ['a', 'b', 'c'], metrics: { orders: [5, 7], ratings: { values: [0, 'a'], type: 'bbb' }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 3 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(3);
        });

        it('Expects the first element to be equal to "d"', function() {
          expect(doc.quantity[0]).to.be.equal('d');
        });

        it('Expects the second element to be equal to "e"', function() {
          expect(doc.quantity[1]).to.be.equal('e');
        });

        it('Expects the thrid element to be equal to "f"', function() {
          expect(doc.quantity[2]).to.be.equal('f');
        });

        it('Expects this document to own the property "orders" that is an array with 2 elements.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects the first element to be equal to "4"', function() {
          expect(doc.metrics.orders[0]).to.be.equal(4);
        });

        it('Expects the second element to be equal to "6"', function() {
          expect(doc.metrics.orders[1]).to.be.equal(6);
        });

        it('Expects this document to own the property "values" that is an array with 3 elements.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(3);
        });

        it('Expects this document to own the property "type" that is an string with the value equal to "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.an('string').that.is.equal('aaa');
        });

      });

      describe('$pull:', function() {
        var db = PicoDB.Create()
          , doc
          ;

        it('Expects { a: 1 }, { $pull: { extra: { field: "x" }, quantity: "b", metrics: { orders: 2, ratings: { values: "cd" }, type: "b" }}} to return 1 document.', function(done) {
          db.insertOne({ a: 1, quantity: ['a', 'b', 'c'], metrics: { orders: [1, 2], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' }}}, function() {
            db.updateOne({ a: 1 }, { $pull: { extra: { field: 'x' }, quantity: 'b', metrics: { orders: 2, ratings: { values: 'gh' }, type: 'b' }}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document not to own the property "extra".', function() {
          expect(doc).not.to.have.property('extra');
        });

        it('Expects this document to own the property "quantity" that is an array with 2 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects the first element to be equal to "a"', function() {
          expect(doc.quantity[0]).to.be.equal('a');
        });

        it('Expects the second element to be equal to "c"', function() {
          expect(doc.quantity[1]).to.be.equal('c');
        });

        it('Expects this document to own the property "orders" that is an array with 1 element.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects the first element to be equal to "1"', function() {
          expect(doc.metrics.orders[0]).to.be.equal(1);
        });

        it('Expects this document to own the property "values" that is an array with 3 elements.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(3);
        });

        it('Expects the first element to be equal to "ab"', function() {
          expect(doc.metrics.ratings.values[0]).to.be.equal('ab');
        });

        it('Expects the second element to be equal to "cd"', function() {
          expect(doc.metrics.ratings.values[1]).to.be.equal('cd');
        });

        it('Expects the third element to be equal to "ef"', function() {
          expect(doc.metrics.ratings.values[2]).to.be.equal('ef');
        });

        it('Expects this document to own the property "type" that is a string.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.a('string');
        });

        it('Expects this string to be equal to "aaa"', function() {
          expect(doc.metrics.ratings.type).to.be.equal('aaa');
        });


        it('Expects { a: 2 }, { $pull: { quantity: { a: 1, b: 2 }, metrics: { orders: { a: 1 }, ratings: { values: { a: 1, b: 1 }, type: { a: 1, b: 2 }}}}} to return 1 document.', function(done) {
          db.insertOne({ a: 2, quantity: [{ a: 1, b: 2, c: 3 }, { a: 1, b: 3 }], metrics: { orders: 3, ratings: { values: [{ a: 1, b: 2 }, { a: 1, b: 1}], type: [{ a: 2 }, 'aaa'] }}}, function() {
            db.updateOne({ a: 2 }, { $pull: { quantity: { a: 1, b: 2 }, metrics: { orders: { a: 1 }, ratings: { values: { a: 1, b: 1 }, type: { a: 1, b: 2 }}}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 1 element.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects the first element to be an object with the property a that is equal to 1.', function() {
          expect(doc.quantity[0]).to.be.an('object').that.have.property('a').that.is.equal(1);
        });

        it('Expects the second element to be an object with the property b that is equal to 3.', function() {
          expect(doc.quantity[0]).to.be.an('object').that.have.property('b').that.is.equal(3);
        });

        it('Expects this document to own the property "orders" that is equal to 3.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.equal(3);
        });

        it('Expects this document to own the property "values" that is an array with 1 element.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects the first element to be an object with the property a that is equal to 1.', function() {
          expect(doc.metrics.ratings.values[0]).to.be.an('object').that.have.property('a').that.is.equal(1);
        });

        it('Expects the first element to be an object with the property b that is equal to 2.', function() {
          expect(doc.metrics.ratings.values[0]).to.be.an('object').that.have.property('b').that.is.equal(2);
        });

        it('Expects { a: 3 }, { $pull: { quantity: { $eq: 5 }, metrics: { orders: { $gt: 1 }, ratings: { values: { $gte: 4 }, type: { $eq: "aaa" }}}}} to return 1 document.', function(done) {
          db.insertOne({ a: 3, quantity: [1, 2, 3, 4, 5], metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' }}}, function() {
            db.updateOne({ a: 3 }, { $pull: { quantity: { $eq: 5 }, metrics: { orders: { $eq: 3 }, ratings: { values: { $gt: 4 }, type: { $eq: 'aaa' }}}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 4 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(4);
        });

        it('Expects the fourth element of the array to be equal to 4.', function() {
          expect(doc.quantity[3]).to.be.equal(4);
        });

        it('Expects this document to own the property "orders" that is an array with 2 elements.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects this document to own the property "values" that is an array with 4 elements.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(4);
        });

        it('Expects this document to own the property "type" that is an string with the value equal to "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.an('string').that.is.equal('aaa');
        });

        it('Expects { a: 4 }, { $pull: { quantity: { $gt: 5 }, metrics: { orders: { $gte: 2 }, ratings: { values: { $gte: 6 }, type: { $gt: "ccc"} }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 4, quantity: [1, 2, 3, 4, 5], metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' }}}, function() {
            db.updateOne({ a: 4 }, { $pull: { quantity: { $gt: 5 }, metrics: { orders: { $gte: 2 }, ratings: { values: { $gte: 6 }, type: { $gt: 'ccc'} }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 5 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(5);
        });

        it('Expects this document to own the property "orders" that is an array with 1 element.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects the first element of the array to be equal to 1.', function() {
          expect(doc.metrics.orders[0]).to.be.equal(1);
        });

        it('Expects this document to own the property "values" that is an array with 5 elements.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(5);
        });

        it('Expects this document to own the property "type" that is a string with the value "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.a('string').that.is.equal('aaa');
        });

        it('Expects { a: 5 }, { $pull: { quantity: { $lt: 3 }, metrics: { orders: { $lt: 0 }, ratings: { values: { $lte: 3 }, type: { $lte: "ccc"}  }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 5, quantity: [1, 2, 3, 4, 5], metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' }}}, function() {
            db.updateOne({ a: 5 }, { $pull: { quantity: { $lt: 3 }, metrics: { orders: { $lt: 0 }, ratings: { values: { $lte: 3 }, type: { $lte: 'ccc'} }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 3 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(3);
        });

        it('Expects the first element of the array to be equal to 3.', function() {
          expect(doc.quantity[0]).to.be.equal(3);
        });

        it('Expects this document to own the property "orders" that is an array with 2 elements.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects this document to own the property "values" that is an array with 2 elements.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects the first element of the array to be equal to 3.', function() {
          expect(doc.quantity[0]).to.be.equal(3);
        });

        it('Expects this document to own the property "type" that is a string with the value "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.a('string').that.is.equal('aaa');
        });

        it('Expects { a: 6 }, { $pull: { quantity: { $ne: 3 }, metrics: { orders: { $ne: 0 }, ratings: { values: { $lte: 3 }, type: { $ne: "ccc" } }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 6, quantity: [1, 2, 3, 4, 5], metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' }}}, function() {
            db.updateOne({ a: 6 }, { $pull: { quantity: { $ne: 3 }, metrics: { orders: { $ne: 0 }, ratings: { values: { $lte: 3 }, type: { $ne: 'ccc' } }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 1 element.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects the first element of the array to be equal to 3.', function() {
          expect(doc.quantity[0]).to.be.equal(3);
        });

        it('Expects this document to own the property "type" that is a string with the value "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.a('string').that.is.equal('aaa');
        });

        it('Expects { a: 7 }, { $pull: { quantity: { $in: ["a", "b", "c"] }, metrics: { orders: { $in: [0] }, ratings: { values: { $in: 3 } }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 7, quantity: ['a', 'b', 'c', 'd', 'e'], metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' }}}, function() {
            db.updateOne({ a: 7 }, { $pull: { quantity: { $in: ['a', 'b', 'c'] }, metrics: { orders: { $in: [0] }, ratings: { values: { $in: 3 } }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 2 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects the first element of the array to be equal to "d".', function() {
          expect(doc.quantity[0]).to.be.equal('d');
        });

        it('Expects this document to own the property "orders" that is an array with 2 elements.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(2);
        });

        it('Expects { a: 8 }, { $pull: { quantity: { $nin: ["a", "b", "c"] }, metrics: { orders: { $nin: [0] }, ratings: { values: { $nin: "aaa" } }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 8, quantity: ['a', 'b', 'c', 'd', 'e'], metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' }}}, function() {
            db.updateOne({ a: 8 }, { $pull: { quantity: { $nin: ['a', 'b', 'c'] }, metrics: { orders: { $nin: [0] }, ratings: { values: { $nin: 'aaa' } }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array with 3 elements.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(3);
        });

        it('Expects the first element of the array to be equal to "a".', function() {
          expect(doc.quantity[0]).to.be.equal('a');
        });

        it('Expects the third element of the array to be equal to "c".', function() {
          expect(doc.quantity[2]).to.be.equal('c');
        });

        it('Expects this document to own the property "orders" that is an empty array.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(0);
        });
      });

      describe('$push:', function() {
        var db = PicoDB.Create()
          , doc
          ;

        it('Expects { a: 3 }, { $push: { quantity: { $each: ["x", "y", "z"], $position: 1 }, metrics: { orders: { $each: [1, 2 ]}, values: { $each: ["x", "y", "z"], $slice: -3 }}, , type: { $each: ["zzz"]}} to return 1 document.', function(done) {
          db.insertOne({ a: 3, quantity: ['a', 'b', 'c'], metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' }}}, function() {
            db.updateOne({ a: 3 }, { $push: { quantity: { $each: ['x', 'y', 'z'], $position: 1 }, metrics: { orders: { $each: [1, 2 ]}, ratings: { values: { $each: ['x', 'y', 'z'], $slice: -3 }, type: { $position: 3 }}, type: { $each: ['zzz']}}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array');
        });

        it('Expects this array to have 6 elements.', function() {
          expect(doc.quantity.length).to.be.equal(6);
        });

        it('Expects the first element to be "a"', function() {
          expect(doc.quantity[0]).to.be.equal('a');
        });

        it('Expects the second element to be "x"', function() {
          expect(doc.quantity[1]).to.be.equal('x');
        });

        it('Expects the third element to be "y"', function() {
          expect(doc.quantity[2]).to.be.equal('y');
        });

        it('Expects the fourth element to be "z"', function() {
          expect(doc.quantity[3]).to.be.equal('z');
        });

        it('Expects the fifth element to be "b"', function() {
          expect(doc.quantity[4]).to.be.equal('b');
        });

        it('Expects the sixth element to be "c"', function() {
          expect(doc.quantity[5]).to.be.equal('c');
        });

        it('Expects this document to own the property "metrics.orders" that is an array.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array');
        });

        it('Expects this array to have 4 elements.', function() {
          expect(doc.metrics.orders.length).to.be.equal(4);
        });

        it('Expects the first element to be "x"', function() {
          expect(doc.metrics.orders[0]).to.be.equal('x');
        });

        it('Expects the second element to be "y"', function() {
          expect(doc.metrics.orders[1]).to.be.equal('y');
        });

        it('Expects the third element to be "1"', function() {
          expect(doc.metrics.orders[2]).to.be.equal(1);
        });

        it('Expects the third element to be "2"', function() {
          expect(doc.metrics.orders[3]).to.be.equal(2);
        });

        it('Expects this document to own the property "metrics.ratings.values" that is an array.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array');
        });

        it('Expects this array to have 3 elements.', function() {
          expect(doc.metrics.ratings.values.length).to.be.equal(3);
        });

        it('Expects the first element to be "x"', function() {
          expect(doc.metrics.ratings.values[0]).to.be.equal('x');
        });

        it('Expects the second element to be "y"', function() {
          expect(doc.metrics.ratings.values[1]).to.be.equal('y');
        });

        it('Expects the third element to be "z"', function() {
          expect(doc.metrics.ratings.values[2]).to.be.equal('z');
        });

        it('Expects this document to own the property "metrics.ratings.type" that is a string with a value equal to "aaa".', function() {
          expect(doc).to.have.deep.property('metrics.ratings.type').that.is.an('string').that.is.equal('aaa');
        });

        it('Expects { a: 5 }, { $push: { quantity: "x", metrics: { orders: [1, 2 ], ratings: { values: 1 }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 5, quantity: ['a', 'b', 'c'], metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' }}}, function() {
            db.updateOne({ a: 5 }, { $push: { quantity: 'x', metrics: { orders: [1, 2 ], ratings: { values: 1 }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an array.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array');
        });

        it('Expects this array to have 4 elements.', function() {
          expect(doc.quantity.length).to.be.equal(4);
        });

        it('Expects the fourth element to be "x"', function() {
          expect(doc.quantity[3]).to.be.equal('x');
        });

        it('Expects this document to own the property "orders" that is an array.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array');
        });

        it('Expects this array to have 3 elements.', function() {
          expect(doc.metrics.orders.length).to.be.equal(3);
        });

        it('Expects the third element to be an array with 2 elements.', function() {
          expect(doc.metrics.orders[2]).to.be.an('array').that.have.lengthOf(2);
        });

        it('Expects the first element to be equal to "1".', function() {
          expect(doc.metrics.orders[2][0]).to.be.equal(1);
        });

        it('Expects the second element to be equal to "2".', function() {
          expect(doc.metrics.orders[2][1]).to.be.equal(2);
        });

        it('Expects this document to own the property "values" that is an array with 4 elements.', function() {
          expect(doc).to.have.deep.property('metrics.ratings.values').that.is.an('array').that.have.lengthOf(4);
        });

        it('Expects the fourth element to be equal to "1".', function() {
          expect(doc.metrics.ratings.values[3]).to.be.equal(1);
        });

        it('Expects { a: 7 }, { { a: 7 }, { $push: { quantity: { $each: ["x"], $slice: 0 }, metrics: { orders: { $each: ["z"], $slice: 1 }}}} to return 1 document.', function(done) {
          db.insertOne({ a: 7, quantity: ['a', 'b', 'c'], metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' }}}, function() {
            db.updateOne({ a: 7 }, { $push: { quantity: { $each: ['x'], $slice: 0 }, metrics: { orders: { $each: ['z'], $slice: 1 }}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantity" that is an empty array.', function() {
          expect(doc).to.have.property('quantity').that.is.an('array').that.have.lengthOf(0);
        });

        it('Expects this document to own the property "metrics.orders" that is an array with 1 element.', function() {
          expect(doc).to.have.deep.property('metrics.orders').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects { { a: 7 }, { $push: { quantities: { $each: ["x"] }, metrics: { orders: { ratings: { newvalues: { $each: ["x", "y"] }}}}}} to return 1 document.', function(done) {
          db.insertOne({ a: 7, quantity: ['a', 'b', 'c'], metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' }}}, function() {
            db.updateOne({ a: 7 }, { $push: { quantities: { $each: ['x'] }, metrics: { orders: { ratings: { newvalues: { $each: ['x', 'y'] }}}}}}, function(err, docs) {
              doc = docs[0];
              expect(docs).to.have.lengthOf(1);
              done();
            });
          });
        });

        it('Expects this document to own the property "quantities" that is an array with 1 element.', function() {
          expect(doc).to.have.property('quantities').that.is.an('array').that.have.lengthOf(1);
        });

        it('Expects this document to own the property "newvalues" that is an array with 2 elements.', function() {
          expect(doc).to.have.deep.property('metrics.orders.ratings.newvalues').that.is.an('array').that.have.lengthOf(2);
        });

      });

    });
  });

  describe('The method updateMany:', function() {
    var db = PicoDB.Create();

    it('Expects the method with an undefined database not to throw any error.', function() {
      db.updateMany({});
    });

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
