// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules


// -- Local Modules
const { expect } = require('chai')
    ;


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(PicoDB, Messenger) {
  describe('Test event methods with the plugin installed:', () => {
    PicoDB.plugin({ messenger: Messenger });

    describe('Test events for the insert method:', () => {
      const db = PicoDB();

      let iresp
        , cresp
        ;

      it('Expects db.insertOne({ a: 1 }) to fire an "insert" event.', (done) => {
        db.one('insert', (resp) => {
          expect(resp).to.be.an('array');
          iresp = resp;
          done();
        });
        db.insertOne({ a: 1 });
      });

      it('Expects the event payload to be an array containing one document.', () => {
        expect(iresp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this document to own two properties.', () => {
        expect(Object.keys(iresp[0])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(iresp[0]).to.own.property('_id').that.is.a('string');
      });

      it('Expects this document to own the property "a" that is equal to 1.', () => {
        expect(iresp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });


      it('Expects db.insertOne({ a: 1 }) to fire a "change" event.', (done) => {
        db.on('change', (resp) => {
          expect(resp).to.be.an('array');
          cresp = resp;
          done();
        });
        db.insertOne({ a: 1 });
      });

      it('Expects the event payload to be an array containing one document.', () => {
        expect(cresp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this document to own two properties.', () => {
        expect(Object.keys(cresp[0])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(cresp[0]).to.own.property('_id').that.is.a('string');
      });

      it('Expects this document to own the property "a" that is equal to 1.', () => {
        expect(cresp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });
    });


    describe('Test events for the update methods:', () => {
      const db = PicoDB();

      let uresp
        , cresp
        ;

      it('Expects db.insertOne({ a: 1 }) to insert one document into the db.', async () => {
        const resp = await db.insertOne({ a: 1 });
        expect(resp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects db.updateOne({ a: 1 }, { a: 2 }) to fire an "update" event.', (done) => {
        db.one('update', (resp) => {
          expect(resp).to.be.an('array');
          uresp = resp;
          done();
        });
        db.updateOne({ a: 1 }, { a: 2 });
      });

      it('Expects the event payload to be an array containing one document.', () => {
        expect(uresp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this document to own two properties.', () => {
        expect(Object.keys(uresp[0])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(uresp[0]).to.own.property('_id').that.is.a('string');
      });

      it('Expects this document to own the property "a" that is equal to 2.', () => {
        expect(uresp[0]).to.own.property('a').that.is.a('number').that.is.equal(2);
      });

      it('Expects db.updateOne({ a: 2 }, { a: 1 }) to fire a "change" event.', (done) => {
        db.one('change', (resp) => {
          expect(resp).to.be.an('array');
          cresp = resp;
          done();
        });
        db.updateOne({ a: 2 }, { a: 1 });
      });

      it('Expects the event payload to be an array containing one document.', () => {
        expect(cresp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this document to own two properties.', () => {
        expect(Object.keys(cresp[0])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(cresp[0]).to.own.property('_id').that.is.a('string');
      });

      it('Expects this document to own the property "a" that is equal to 1.', () => {
        expect(cresp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });
    });


    describe('Test events for the delete methods:', () => {
      const db = PicoDB();

      let dresp
        , cresp
        ;

      it('Expects db.insertMany([{ a: 1 }, { b: 2 }]) to insert two documents into the db.', async () => {
        const resp = await db.insertMany([{ a: 1 }, { b: 2 }]);
        expect(resp).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects db.deleteOne({ a: 1 }) to fire a "delete" event.', (done) => {
        db.one('delete', (resp) => {
          expect(resp).to.be.an('array');
          dresp = resp;
          done();
        });
        db.deleteOne({ a: 1 });
      });

      it('Expects the event payload to be an array containing one document.', () => {
        expect(dresp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this document to own two properties.', () => {
        expect(Object.keys(dresp[0])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(dresp[0]).to.own.property('_id').that.is.a('string');
      });

      it('Expects this document to own the property "a" that is equal to 1.', () => {
        expect(dresp[0]).to.own.property('a').that.is.a('number').that.is.equal(1);
      });

      it('Expects db.deleteOne({ b: 2 }) to fire a "change" event.', (done) => {
        db.one('change', (resp) => {
          expect(resp).to.be.an('array');
          cresp = resp;
          done();
        });
        db.deleteOne({ b: 2 });
      });

      it('Expects the event payload to be an array containing one document.', () => {
        expect(cresp).to.be.an('array').that.has.lengthOf(1);
      });

      it('Expects this document to own two properties.', () => {
        expect(Object.keys(cresp[0])).to.be.an('array').that.has.lengthOf(2);
      });

      it('Expects this document to own the property "_id" that is a string.', () => {
        expect(cresp[0]).to.own.property('_id').that.is.a('string');
      });

      it('Expects this document to own the property "b" that is equal to 2.', () => {
        expect(cresp[0]).to.own.property('b').that.is.a('number').that.is.equal(2);
      });
    });

    describe('Test remove events :', () => {
      it('Expects db.off() to remove event listeners.', () => {
        const db = PicoDB();
        const resp = db.off('change');
        expect(resp).to.be.an('object');
      });
    });
  });
};
