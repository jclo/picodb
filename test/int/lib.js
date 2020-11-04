// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants
// Number of owned custom properties added by your library,
// number of owned and inherited properties added by your library (instance),
// number of items returned by '_setTestMode'.
const LIBPROPS = 1
    , OWNPROPS = 3
    , INHPROPS = 15
    , TESTMODE = 2
    ;


// -- Local Variables


// -- Main
module.exports = function(PicoDB, libname, version, type) {
  describe('PicoDB introspection:', () => {
    describe('Test the nature of PicoDB:', () => {
      it('Expects PicoDB to be a function.', () => {
        expect(PicoDB).to.be.a('function');
      });

      it(`Expects PicoDB to own ${4 + LIBPROPS} custom properties.`, () => {
        expect(Object.keys(PicoDB)).to.be.an('array').that.has.lengthOf(4 + LIBPROPS);
      });


      // -- This section must not be modified --
      // NAME, VERSION, _library, _setTestMode, noConflict
      describe('Check the owned generic custom properties:', () => {
        it(`Expects PicoDB to own the property "NAME" whose value is "${libname}".`, () => {
          expect(PicoDB).to.own.property('NAME').that.is.equal(libname);
        });

        it(`Expects PicoDB to own the property "VERSION" whose value is "${version}".`, () => {
          expect(PicoDB).to.own.property('VERSION');
        });

        it('Expects PicoDB to own the property "_setTestMode" that is a function.', () => {
          expect(PicoDB).to.own.property('_setTestMode').that.is.a('function');
        });

        it('Expects PicoDB to own the property "noConflict" that is a function.', () => {
          expect(PicoDB).to.own.property('noConflict').that.is.a('function');
        });

        describe('Test the owned generic custom properties:', () => {
          it(`Expects the property "_setTestMode" to return an array with ${TESTMODE} item(s).`, () => {
            expect(PicoDB._setTestMode()).to.be.an('array').that.has.lengthOf(TESTMODE);
          });

          it('Expects the property "noConflict" to return a function.', () => {
            expect(PicoDB.noConflict()).to.be.a('function');
          });
        });


        // -- This section must  be adapted --
        // Add here the owned properties added by your library.
        // plugin
        describe('Check the owned specific custom properties:', () => {
          it('Expects PicoDB to own the property "plugin" that is a function.', () => {
            expect(PicoDB).to.own.property('plugin').that.is.a('function');
          });

          describe('Test the owned specific custom properties:', () => {
            it('Expects PicoDB the property ... to be completed or ... removed!', () => {
              expect(true).to.be.equal(true);
            });
          });
        });
      });
    });


    describe('Test PicoDB constructor:', () => {
      if (type === 'with new') {
        it('Expects PicoDB() without the operator "new" to throw an error.', () => {
          try {
            PicoDB();
          } catch (e) {
            expect(e.message).to.be.a('string').that.is.equal('PicoDB needs to be called with the new keyword!');
          }
        });
      }

      const o = type === 'with new' ? new PicoDB() : PicoDB();
      const op = Object.getOwnPropertyNames(o);
      const io = Object.keys(Object.getPrototypeOf(o));

      it('Expects the function PicoDB to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it(`Expects PicoDB object to own ${1 + OWNPROPS} property(ies).`, () => {
        expect(op).to.be.an('array').that.has.lengthOf(1 + OWNPROPS);
      });


      // -- This section must not be modified --
      // _library
      describe('Check the owned generic properties:', () => {
        it('Expects PicoDB object to own the property "_library" that is an object.', () => {
          expect(o).to.own.property('_library').that.is.an('object');
        });

        describe('Test the owned generic properties:', () => {
          it('Expects the property "_library" to own two properties.', () => {
            expect(Object.keys(o._library)).to.be.an('array').that.has.lengthOf(2);
          });
          it(`Expects the property "_library" to own the property "name" whose value is "${libname}".`, () => {
            expect(o._library).to.own.property('name').that.is.equal(libname);
          });
          it(`Expects the property "_library" to own the property "version" whose value is "${version}".`, () => {
            expect(o._library).to.own.property('version').that.is.equal(version);
          });
        });


        // -- This section must be adapted --
        // Add here the owned properties added by your library.
        // [ '_cursor', '_db', '_mess' ]
        describe('Check the owned specific custom properties:', () => {
          it('Expects PicoDB to own the property "_cursor" that is an object.', () => {
            expect(o).to.own.property('_cursor').that.is.an('object');
          });

          it('Expects PicoDB to own the property "_db" that is an object.', () => {
            expect(o).to.own.property('_db').that.is.an('object');
          });

          it('Expects PicoDB to own the property "_mess" that is a null.', () => {
            expect(o).to.own.property('_mess').that.is.a('null');
          });

          describe('Test the owned specific custom properties:', () => {
            it('Expects the property "_db" to own two properties.', () => {
              expect(Object.keys(o._db)).to.be.an('array').that.has.lengthOf(2);
            });
            it('Expects the property "_db" to own the property "_silent" that is a null.', () => {
              expect(o._db).to.own.property('_silent').that.is.a('null');
            });
            it('Expects the property "_db" to own the property "data" that is an empty array.', () => {
              expect(o._db).to.own.property('data').that.is.an('array').that.has.lengthOf(0);
            });
          });
        });
      });

      // -- This section must not be modified --
      // whoami
      describe('Check the inherited generic properties:', () => {
        it(`Expects PicoDB object to inherit ${1 + INHPROPS} property(ies).`, () => {
          expect(io).to.be.an('array').that.has.lengthOf(1 + INHPROPS);
        });

        it('Expects PicoDB object to inherit the property "whoami" that is a function.', () => {
          expect(o).to.have.property('whoami').that.is.a('function');
        });

        describe('Test the inherited generic properties:', () => {
          it('Expects the property "whoami" to return an object.', () => {
            expect(o.whoami()).to.be.an('object');
          });
          it('Expects this object to own two properties.', () => {
            expect(Object.keys(o.whoami())).to.be.an('array').that.has.lengthOf(2);
          });
          it(`Expects this object to own the property "name" whose value is "${libname}".`, () => {
            expect(o.whoami()).to.own.property('name').that.is.equal(libname);
          });
          it(`Expects this object to own the property "version" whose value is "${version}".`, () => {
            expect(o.whoami()).to.own.property('version').that.is.equal(version);
          });
        });
      });

      // -- This section must be adapted --
      // Replace here 'getString' and 'getArray' by the inherited properties
      // added by your library.
      // ['count', 'deleteMany', 'deleteOne', 'insertMany', 'insertOne',
      // 'updateMany', 'updateOne', 'find', 'toArray', 'addEventListener',
      // 'addOneTimeEventListener', 'removeEventListener', 'on', 'one', 'off']
      describe('Check the inherited specific properties:', () => {
        it('Expects PicoDB object to inherit the property "count" that is a function.', () => {
          expect(o).to.have.property('count').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "deleteMany" that is a function.', () => {
          expect(o).to.have.property('deleteMany').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "deleteOne" that is a function.', () => {
          expect(o).to.have.property('deleteOne').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "insertMany" that is a function.', () => {
          expect(o).to.have.property('insertMany').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "insertOne" that is a function.', () => {
          expect(o).to.have.property('insertOne').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "updateMany" that is a function.', () => {
          expect(o).to.have.property('updateMany').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "updateOne" that is a function.', () => {
          expect(o).to.have.property('updateOne').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "find" that is a function.', () => {
          expect(o).to.have.property('find').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "toArray" that is a function.', () => {
          expect(o).to.have.property('toArray').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "addEventListener" that is a function.', () => {
          expect(o).to.have.property('addEventListener').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "addOneTimeEventListener" that is a function.', () => {
          expect(o).to.have.property('addOneTimeEventListener').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "removeEventListener" that is a function.', () => {
          expect(o).to.have.property('removeEventListener').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "on" that is a function.', () => {
          expect(o).to.have.property('on').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "one" that is a function.', () => {
          expect(o).to.have.property('one').that.is.a('function');
        });
        it('Expects PicoDB object to inherit the property "off" that is a function.', () => {
          expect(o).to.have.property('off').that.is.a('function');
        });

        describe('Test the inherited specific properties:', () => {
          it('Expects the property ... to be done ... later on!".', () => {
            expect(true).to.be.equal(true);
          });
        });
      });
    });
  });
};
