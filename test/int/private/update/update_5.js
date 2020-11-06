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
  describe('Array Operators:', () => {
    describe('$pop:', () => {
      const db = PicoDB();

      const docu = [{
        a: 3,
        quantity: ['a', 'b', 'c'],
        metrics: {
          orders: ['x', 'y'],
          ratings: {
            values: ['ab', 'cd', 'ef'],
            type: 'aaa',
            newfield: [0],
          },
        },
      }];

      let ndoc;

      // Fill the db:
      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.updateOne({ a: 3} { $pop: { quantity: 1, metrics: { orders: 1, ratings: { values: -1, type: 2, newfield: 3 }}}}) to return 1 document.', async () => {
        /* eslint-disable-next-line max-len */
        const resp = await db.updateOne({ a: 3 }, { $pop: { quantity: 1, metrics: { orders: 1, ratings: { values: -1, type: 2, newfield: 3 } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.an('array');
      });

      it('Expects this property to contain two values.', () => {
        expect(ndoc.quantity.length).is.equal(2);
      });

      it(('Expects the first value to be "a".'), () => {
        expect(ndoc.quantity[0]).is.equal('a');
      });

      it(('Expects the second value to be "b".'), () => {
        expect(ndoc.quantity[1]).is.equal('b');
      });

      it('Expects this document to own the property "metrics.orders" that is an array.', () => {
        expect(ndoc.metrics).to.have.deep.ownProperty('orders').that.is.an('array');
      });

      it('Expects this property to contain one value.', () => {
        expect(ndoc.metrics.orders.length).is.equal(1);
      });

      it(('Expects this value to be "x".'), () => {
        expect(ndoc.metrics.orders[0]).is.equal('x');
      });

      it('Expects this document to own the property "metrics.ratings.values" that is an array.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('values').that.is.an('array');
      });

      it('Expects this property to contain two values.', () => {
        expect(ndoc.metrics.ratings.values.length).is.equal(2);
      });

      it(('Expects the first value to be "cd".'), () => {
        expect(ndoc.metrics.ratings.values[0]).is.equal('cd');
      });

      it(('Expects the second value to be "ef".'), () => {
        expect(ndoc.metrics.ratings.values[1]).is.equal('ef');
      });

      it('Expects this document to own the property "type" that is an string with the value equal to "aaa".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.an('string').that.is.equal('aaa');
      });
    });


    describe('$pullAll:', () => {
      const db = PicoDB();

      const docu = [{
        a: 1,
        quantity: ['a', 'b', 'c', 'd', 'e', 'b', 'c', 'a', 'f'],
        metrics: { orders: [4, 5, 6], ratings: { values: [7, 8, 9], type: 'aaa' } },
      }];

      let ndoc;

      // Fill the db:
      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 1 }, { $pullAll: { quantity: ["a", "b", "c"], metrics: { orders: [5, 7], ratings: { values: [0, "a"] }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 1 }, { $pullAll: { quantity: ['a', 'b', 'c'], metrics: { orders: [5, 7], ratings: { values: [0, 'a'], type: 'bbb' } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 3 elements.', () => {
        expect(ndoc).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(3);
      });

      it('Expects the first element to be equal to "d"', () => {
        expect(ndoc.quantity[0]).to.be.equal('d');
      });

      it('Expects the second element to be equal to "e"', () => {
        expect(ndoc.quantity[1]).to.be.equal('e');
      });

      it('Expects the thrid element to be equal to "f"', () => {
        expect(ndoc.quantity[2]).to.be.equal('f');
      });

      it('Expects this document to own the property "orders" that is an array with 2 elements.', () => {
        expect(ndoc.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(2);
      });

      it('Expects the first element to be equal to "4"', () => {
        expect(ndoc.metrics.orders[0]).to.be.equal(4);
      });

      it('Expects the second element to be equal to "6"', () => {
        expect(ndoc.metrics.orders[1]).to.be.equal(6);
      });

      it('Expects this document to own the property "values" that is an array with 3 elements.', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(3);
      });

      it('Expects this document to own the property "type" that is an string with the value equal to "aaa".', () => {
        expect(ndoc.metrics.ratings).to.have.ownProperty('type').that.is.an('string').that.is.equal('aaa');
      });
    });


    describe('$pull:', () => {
      const db = PicoDB();

      const docu1 = [{
        a: 1,
        quantity: ['a', 'b', 'c'],
        metrics: { orders: [1, 2], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' } },
      }];

      let ndoc1;

      // Fill the db:
      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu1);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 1 }, { $pull: { extra: { field: "x" }, quantity: "b", metrics: { orders: 2, ratings: { values: "cd" }, type: "b" }}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 1 }, { $pull: { extra: { field: 'x' }, quantity: 'b', metrics: { orders: 2, ratings: { values: 'gh' }, type: 'b' } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc1] = resp;
      });

      it('Expects this document not to own the property "extra".', () => {
        expect(ndoc1).not.to.have.ownProperty('extra');
      });

      it('Expects this document to own the property "quantity" that is an array with 2 elements.', () => {
        expect(ndoc1).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(2);
      });

      it('Expects the first element to be equal to "a"', () => {
        expect(ndoc1.quantity[0]).to.be.equal('a');
      });

      it('Expects the second element to be equal to "c"', () => {
        expect(ndoc1.quantity[1]).to.be.equal('c');
      });

      it('Expects this document to own the property "orders" that is an array with 1 element.', () => {
        expect(ndoc1.metrics).to.have.property('orders').that.is.an('array').that.have.lengthOf(1);
      });

      it('Expects the first element to be equal to "1"', () => {
        expect(ndoc1.metrics.orders[0]).to.be.equal(1);
      });

      it('Expects this document to own the property "values" that is an array with 3 elements.', () => {
        expect(ndoc1.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(3);
      });

      it('Expects the first element to be equal to "ab"', () => {
        expect(ndoc1.metrics.ratings.values[0]).to.be.equal('ab');
      });

      it('Expects the second element to be equal to "cd"', () => {
        expect(ndoc1.metrics.ratings.values[1]).to.be.equal('cd');
      });

      it('Expects the third element to be equal to "ef"', () => {
        expect(ndoc1.metrics.ratings.values[2]).to.be.equal('ef');
      });

      it('Expects this document to own the property "type" that is a string.', () => {
        expect(ndoc1.metrics.ratings).to.have.ownProperty('type').that.is.a('string');
      });

      it('Expects this string to be equal to "aaa"', () => {
        expect(ndoc1.metrics.ratings.type).to.be.equal('aaa');
      });


      // Add a new item to the db:
      const docu2 = [{
        a: 2,
        quantity: [{ a: 1, b: 2, c: 3 }, { a: 1, b: 3 }],
        metrics: {
          orders: 3,
          ratings: { values: [{ a: 1, b: 2 }, { a: 1, b: 1 }], type: [{ a: 2 }, 'aaa'] },
        },
      }];
      let ndoc2;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu2);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 2 }, { $pull: { quantity: { a: 1, b: 2 }, metrics: { orders: { a: 1 }, ratings: { values: { a: 1, b: 1 }, type: { a: 1, b: 2 }}}}} to return 1 document.', async () => {
        /* eslint-disable-next-line max-len */
        const resp = await db.updateOne({ a: 2 }, { $pull: { quantity: { a: 1, b: 2 }, metrics: { orders: { a: 1 }, ratings: { values: { a: 1, b: 1 }, type: { a: 1, b: 2 } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc2] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 1 element.', () => {
        expect(ndoc2).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(1);
      });

      it('Expects the first element to be an object with the property a that is equal to 1.', () => {
        expect(ndoc2.quantity[0]).to.be.an('object').that.have.property('a').that.is.equal(1);
      });

      it('Expects the second element to be an object with the property b that is equal to 3.', () => {
        expect(ndoc2.quantity[0]).to.be.an('object').that.have.property('b').that.is.equal(3);
      });

      it('Expects this document to own the property "orders" that is equal to 3.', () => {
        expect(ndoc2.metrics).to.have.ownProperty('orders').that.is.equal(3);
      });

      it('Expects this document to own the property "values" that is an array with 1 element.', () => {
        expect(ndoc2.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(1);
      });

      it('Expects the first element to be an object with the property a that is equal to 1.', () => {
        expect(ndoc2.metrics.ratings.values[0]).to.be.an('object').that.have.property('a').that.is.equal(1);
      });

      it('Expects the first element to be an object with the property b that is equal to 2.', () => {
        expect(ndoc2.metrics.ratings.values[0]).to.be.an('object').that.have.property('b').that.is.equal(2);
      });


      // Add a new item to the db:
      const docu3 = [{
        a: 3,
        quantity: [1, 2, 3, 4, 5],
        metrics: {
          orders: [1, 2],
          ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' },
        },
      }];
      let ndoc3;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu3);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 3 }, { $pull: { quantity: { $eq: 5 }, metrics: { orders: { $gt: 1 }, ratings: { values: { $gte: 4 }, type: { $eq: "aaa" }}}}} to return 1 document.', async () => {
        /* eslint-disable-next-line max-len */
        const resp = await db.updateOne({ a: 3 }, { $pull: { quantity: { $eq: 5 }, metrics: { orders: { $eq: 3 }, ratings: { values: { $gt: 4 }, type: { $eq: 'aaa' } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc3] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 4 elements.', () => {
        expect(ndoc3).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(4);
      });

      it('Expects the fourth element of the array to be equal to 4.', () => {
        expect(ndoc3.quantity[3]).to.be.equal(4);
      });

      it('Expects this document to own the property "orders" that is an array with 2 elements.', () => {
        expect(ndoc3.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(2);
      });

      it('Expects this document to own the property "values" that is an array with 4 elements.', () => {
        expect(ndoc3.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(4);
      });

      it('Expects this document to own the property "type" that is an string with the value equal to "aaa".', () => {
        expect(ndoc3.metrics.ratings).to.have.ownProperty('type').that.is.an('string').that.is.equal('aaa');
      });


      // Add a new item to the db:
      const docu4 = [{
        a: 4,
        quantity: [1, 2, 3, 4, 5],
        metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' } },
      }];
      let ndoc4;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu4);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 4 }, { $pull: { quantity: { $gt: 5 }, metrics: { orders: { $gte: 2 }, ratings: { values: { $gte: 6 }, type: { $gt: "ccc"} }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 4 }, { $pull: { quantity: { $gt: 5 }, metrics: { orders: { $gte: 2 }, ratings: { values: { $gte: 6 }, type: { $gt: 'ccc' } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc4] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 5 elements.', () => {
        expect(ndoc4).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(5);
      });

      it('Expects this document to own the property "orders" that is an array with 1 element.', () => {
        expect(ndoc4.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(1);
      });

      it('Expects the first element of the array to be equal to 1.', () => {
        expect(ndoc4.metrics.orders[0]).to.be.equal(1);
      });

      it('Expects this document to own the property "values" that is an array with 5 elements.', () => {
        expect(ndoc4.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(5);
      });

      it('Expects this document to own the property "type" that is a string with the value "aaa".', () => {
        expect(ndoc4.metrics.ratings).to.have.ownProperty('type').that.is.a('string').that.is.equal('aaa');
      });

      // Add a new item to the db:
      const docu5 = [{
        a: 5,
        quantity: [1, 2, 3, 4, 5],
        metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' } },
      }];

      let ndoc5;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu5);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 5 }, { $pull: { quantity: { $lt: 3 }, metrics: { orders: { $lt: 0 }, ratings: { values: { $lte: 3 }, type: { $lte: "ccc"}  }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 5 }, { $pull: { quantity: { $lt: 3 }, metrics: { orders: { $lt: 0 }, ratings: { values: { $lte: 3 }, type: { $lte: 'ccc' } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc5] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 3 elements.', () => {
        expect(ndoc5).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(3);
      });

      it('Expects the first element of the array to be equal to 3.', () => {
        expect(ndoc5.quantity[0]).to.be.equal(3);
      });

      it('Expects this document to own the property "orders" that is an array with 2 elements.', () => {
        expect(ndoc5.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(2);
      });

      it('Expects this document to own the property "values" that is an array with 2 elements.', () => {
        expect(ndoc5.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(2);
      });

      it('Expects the first element of the array to be equal to 3.', () => {
        expect(ndoc5.quantity[0]).to.be.equal(3);
      });

      it('Expects this document to own the property "type" that is a string with the value "aaa".', () => {
        expect(ndoc5.metrics.ratings).to.have.ownProperty('type').that.is.a('string').that.is.equal('aaa');
      });


      // Add a new item to the db:
      const docu6 = [{
        a: 6,
        quantity: [1, 2, 3, 4, 5],
        metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' } },
      }];

      let ndoc6;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu6);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 6 }, { $pull: { quantity: { $ne: 3 }, metrics: { orders: { $ne: 0 }, ratings: { values: { $lte: 3 }, type: { $ne: "ccc" } }}}} to return 1 document..', async () => {
        const resp = await db.updateOne({ a: 6 }, { $pull: { quantity: { $ne: 3 }, metrics: { orders: { $ne: 0 }, ratings: { values: { $lte: 3 }, type: { $ne: 'ccc' } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc6] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 1 element.', () => {
        expect(ndoc6).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(1);
      });

      it('Expects the first element of the array to be equal to 3.', () => {
        expect(ndoc6.quantity[0]).to.be.equal(3);
      });

      it('Expects this document to own the property "type" that is a string with the value "aaa".', () => {
        expect(ndoc6.metrics.ratings).to.have.ownProperty('type').that.is.a('string').that.is.equal('aaa');
      });


      // Add a new item to the db:
      const docu7 = [{
        a: 7,
        quantity: ['a', 'b', 'c', 'd', 'e'],
        metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' } },
      }];

      let ndoc7;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu7);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 7 }, { $pull: { quantity: { $in: ["a", "b", "c"] }, metrics: { orders: { $in: [0] }, ratings: { values: { $in: 3 } }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 7 }, { $pull: { quantity: { $in: ['a', 'b', 'c'] }, metrics: { orders: { $in: [0] }, ratings: { values: { $in: 3 } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc7] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 2 elements.', () => {
        expect(ndoc7).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(2);
      });

      it('Expects the first element of the array to be equal to "d".', () => {
        expect(ndoc7.quantity[0]).to.be.equal('d');
      });

      it('Expects this document to own the property "orders" that is an array with 2 elements.', () => {
        expect(ndoc7.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(2);
      });


      // Add a new item to the db:
      const docu8 = [{
        a: 8,
        quantity: ['a', 'b', 'c', 'd', 'e'],
        metrics: { orders: [1, 2], ratings: { values: [1, 2, 3, 4, 5], type: 'aaa' } },
      }];

      let ndoc8;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu8);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 8 }, { $pull: { quantity: { $nin: ["a", "b", "c"] }, metrics: { orders: { $nin: [0] }, ratings: { values: { $nin: "aaa" } }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 8 }, { $pull: { quantity: { $nin: ['a', 'b', 'c'] }, metrics: { orders: { $nin: [0] }, ratings: { values: { $nin: 'aaa' } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc8] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array with 3 elements.', () => {
        expect(ndoc8).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(3);
      });

      it('Expects the first element of the array to be equal to "a".', () => {
        expect(ndoc8.quantity[0]).to.be.equal('a');
      });

      it('Expects the third element of the array to be equal to "c".', () => {
        expect(ndoc8.quantity[2]).to.be.equal('c');
      });

      it('Expects this document to own the property "orders" that is an empty array.', () => {
        expect(ndoc8.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(0);
      });
    });


    describe('$push:', () => {
      const db = PicoDB();

      const docu1 = [{
        a: 3,
        quantity: ['a', 'b', 'c'],
        metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' } },
      }];

      let ndoc1;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu1);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 3 }, { $push: { quantity: { $each: ["x", "y", "z"], $position: 1 }, metrics: { orders: { $each: [1, 2 ]}, values: { $each: ["x", "y", "z"], $slice: -3 }}, , type: { $each: ["zzz"]}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 3 }, { $push: { quantity: { $each: ['x', 'y', 'z'], $position: 1 }, metrics: { orders: { $each: [1, 2] }, ratings: { values: { $each: ['x', 'y', 'z'], $slice: -3 }, type: { $position: 3 } }, type: { $each: ['zzz'] } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc1] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array.', () => {
        expect(ndoc1).to.have.ownProperty('quantity').that.is.an('array');
      });

      it('Expects this array to have 6 elements.', () => {
        expect(ndoc1.quantity.length).to.be.equal(6);
      });

      it('Expects the first element to be "a"', () => {
        expect(ndoc1.quantity[0]).to.be.equal('a');
      });

      it('Expects the second element to be "x"', () => {
        expect(ndoc1.quantity[1]).to.be.equal('x');
      });

      it('Expects the third element to be "y"', () => {
        expect(ndoc1.quantity[2]).to.be.equal('y');
      });

      it('Expects the fourth element to be "z"', () => {
        expect(ndoc1.quantity[3]).to.be.equal('z');
      });

      it('Expects the fifth element to be "b"', () => {
        expect(ndoc1.quantity[4]).to.be.equal('b');
      });

      it('Expects the sixth element to be "c"', () => {
        expect(ndoc1.quantity[5]).to.be.equal('c');
      });

      it('Expects this document to own the property "metrics.orders" that is an array.', () => {
        expect(ndoc1.metrics).to.have.ownProperty('orders').that.is.an('array');
      });

      it('Expects this array to have 4 elements.', () => {
        expect(ndoc1.metrics.orders.length).to.be.equal(4);
      });

      it('Expects the first element to be "x"', () => {
        expect(ndoc1.metrics.orders[0]).to.be.equal('x');
      });

      it('Expects the second element to be "y"', () => {
        expect(ndoc1.metrics.orders[1]).to.be.equal('y');
      });

      it('Expects the third element to be "1"', () => {
        expect(ndoc1.metrics.orders[2]).to.be.equal(1);
      });

      it('Expects the third element to be "2"', () => {
        expect(ndoc1.metrics.orders[3]).to.be.equal(2);
      });

      it('Expects this document to own the property "metrics.ratings.values" that is an array.', () => {
        expect(ndoc1.metrics.ratings).to.have.ownProperty('values').that.is.an('array');
      });

      it('Expects this array to have 3 elements.', () => {
        expect(ndoc1.metrics.ratings.values.length).to.be.equal(3);
      });

      it('Expects the first element to be "x"', () => {
        expect(ndoc1.metrics.ratings.values[0]).to.be.equal('x');
      });

      it('Expects the second element to be "y"', () => {
        expect(ndoc1.metrics.ratings.values[1]).to.be.equal('y');
      });

      it('Expects the third element to be "z"', () => {
        expect(ndoc1.metrics.ratings.values[2]).to.be.equal('z');
      });

      it('Expects this document to own the property "metrics.ratings.type" that is a string with a value equal to "aaa".', () => {
        expect(ndoc1.metrics.ratings).to.have.ownProperty('type').that.is.an('string').that.is.equal('aaa');
      });


      // Add another value to db:
      const docu2 = [{
        a: 5,
        quantity: ['a', 'b', 'c'],
        metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' } },
      }];

      let ndoc2;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu2);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 5 }, { $push: { quantity: "x", metrics: { orders: [1, 2 ], ratings: { values: 1 }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 5 }, { $push: { quantity: 'x', metrics: { orders: [1, 2], ratings: { values: 1 } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc2] = resp;
      });

      it('Expects this document to own the property "quantity" that is an array.', () => {
        expect(ndoc2).to.have.ownProperty('quantity').that.is.an('array');
      });

      it('Expects this array to have 4 elements.', () => {
        expect(ndoc2.quantity.length).to.be.equal(4);
      });

      it('Expects the fourth element to be "x"', () => {
        expect(ndoc2.quantity[3]).to.be.equal('x');
      });

      it('Expects this document to own the property "orders" that is an array.', () => {
        expect(ndoc2.metrics).to.have.ownProperty('orders').that.is.an('array');
      });

      it('Expects this array to have 3 elements.', () => {
        expect(ndoc2.metrics.orders.length).to.be.equal(3);
      });

      it('Expects the third element to be an array with 2 elements.', () => {
        expect(ndoc2.metrics.orders[2]).to.be.an('array').that.have.lengthOf(2);
      });

      it('Expects the first element to be equal to "1".', () => {
        expect(ndoc2.metrics.orders[2][0]).to.be.equal(1);
      });

      it('Expects the second element to be equal to "2".', () => {
        expect(ndoc2.metrics.orders[2][1]).to.be.equal(2);
      });

      it('Expects this document to own the property "values" that is an array with 4 elements.', () => {
        expect(ndoc2.metrics.ratings).to.have.ownProperty('values').that.is.an('array').that.have.lengthOf(4);
      });

      it('Expects the fourth element to be equal to "1".', () => {
        expect(ndoc2.metrics.ratings.values[3]).to.be.equal(1);
      });


      // Add another value to db:
      const docu3 = [{
        a: 7,
        quantity: ['a', 'b', 'c'],
        metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' } },
      }];

      let ndoc3;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu3);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { a: 7 }, { { a: 7 }, { $push: { quantity: { $each: ["x"], $slice: 0 }, metrics: { orders: { $each: ["z"], $slice: 1 }}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 7 }, { $push: { quantity: { $each: ['x'], $slice: 0 }, metrics: { orders: { $each: ['z'], $slice: 1 } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc3] = resp;
      });

      it('Expects this document to own the property "quantity" that is an empty array.', () => {
        expect(ndoc3).to.have.ownProperty('quantity').that.is.an('array').that.have.lengthOf(0);
      });

      it('Expects this document to own the property "metrics.orders" that is an array with 1 element.', () => {
        expect(ndoc3.metrics).to.have.ownProperty('orders').that.is.an('array').that.have.lengthOf(1);
      });


      // Add another value to db:
      const docu4 = [{
        a: 7,
        quantity: ['a', 'b', 'c'],
        metrics: { orders: ['x', 'y'], ratings: { values: ['ab', 'cd', 'ef'], type: 'aaa' } },
      }];

      let ndoc4;

      it('Expects db.insertOne([...]) to return an array with all the documents.', async () => {
        const resp = await db.insertOne(docu4);
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects { { a: 7 }, { $push: { quantities: { $each: ["x"] }, metrics: { orders: { ratings: { newvalues: { $each: ["x", "y"] }}}}}} to return 1 document.', async () => {
        const resp = await db.updateOne({ a: 7 }, { $push: { quantities: { $each: ['x'] }, metrics: { orders: { ratings: { newvalues: { $each: ['x', 'y'] } } } } } });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
        [ndoc4] = resp;
      });

      it('Expects this document to own the property "quantities" that is an array with 1 element.', () => {
        expect(ndoc4).to.have.ownProperty('quantities').that.is.an('array').that.have.lengthOf(1);
      });

      it('Expects this document to own the property "newvalues" that is an array with 2 elements.', () => {
        expect(ndoc4.metrics.orders.ratings).to.have.ownProperty('newvalues').that.is.an('array').that.have.lengthOf(2);
      });
    });
  });
};
