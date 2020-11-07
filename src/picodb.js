/** ************************************************************************
 *
 * A tiny in-memory database (MongoDB like) that stores JSON documents.
 *
 * This is the entry point of the library where is defined the constructor
 * and the attached methods.
 *
 * picodb.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . PicoDB                    creates and returns the PicoDB object,
 *
 *
 * Private Static Methods:
 *  . _setTestMode                returns internal objects for testing purpose,
 *
 *
 * Public Static Methods:
 *  . noConflict                  returns a reference to this PicoDB object,
 *  . plug                        attaches a plugin library,
 *
 *
 * Public Methods:
 *  . whoami                      returns the library name and version,
 *  . insertOne                   inserts a single document,
 *  . insertMany                  inserts an array of documents,
 *  . find                        finds the searched documents,
 *  . toArray                     returns the found documents in an array,
 *  . count                       counts the documents into the db that match,
 *  . updateOne                   updates one document,
 *  . updateMany                  updates many documents,
 *  . deleteOne                   deletes the first (the oldest) doc. that matches,
 *  . deleteMany                  deletes the documents into the db that match,
 *  . addEventListener            registers the specified listener,
 *  . addOneTimeEventListener     registers the specified listener for once,
 *  . removeEventListener         removes the event registered listener,
 *  . on                          alias on addEventListener,
 *  . one                         alias on addOneTimeEventListener,
 *  . off                         alias on removeEventListener,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global root */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import _ from './lib/_';
import C from './private/count';
import D from './private/delete';
import F from './private/find';
import I from './private/insert';
import U from './private/update';
import P from './lib/plugin';
import G from './private/geo';


// -- Local Constants
// Saves the previous value of the library variable, so that it can be
// restored later on, if noConflict is used.
const previousPicoDB = root.PicoDB
    ;


// -- Local Variables
let methods
  ;


// -- Public ---------------------------------------------------------------

/**
 * Returns the PicoDB object.
 * (Prototypal Instantiation Pattern)
 *
 * @constructor ()
 * @public
 * @param {}                -,
 * @returns {Object}        returns the PicoDB object,
 * @since 0.0.0
 */
const PicoDB = function() {
  const obj = Object.create(methods);
  obj._library = {
    name: '{{lib:name}}',
    version: '{{lib:version}}',
  };

  // Creates a cursor.
  obj._cursor = F.initCursor();

  // Creates the database container and attaches to it a schema.
  obj._db = I.schema();

  // Creates a messenger object.
  const M = P.get('messenger');
  obj._mess = M ? M() : null;
  return obj;
};

// Attaches constants to PicoDB that provide name and version of the lib.
PicoDB.NAME = '{{lib:name}}';
PicoDB.VERSION = '{{lib:version}}';


// -- Private Static Methods -----------------------------------------------

/**
 * Returns the internal objects for testing purpose.
 * (must not be deleted)
 *
 * @method ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns a list of internal objects,
 * @since 0.0.0
 */
PicoDB._setTestMode = function() {
  return [G, P, _];
};


// -- Public Static Methods ------------------------------------------------

/**
 * Returns a reference to this PicoDB object.
 * (must not be deleted)
 *
 * Nota:
 * Running PicoDB in noConflict mode, returns the PicoDB variable to
 * its previous owner.
 *
 * @method ()
 * @public
 * @param {}                -,
 * @returns {Object}        returns the PicoDB object,
 * @since 0.0.0
 */
PicoDB.noConflict = function() {
  /* eslint-disable-next-line no-param-reassign */
  root.PicoDB = previousPicoDB;
  return this;
};

/**
 * Attaches a plugin library.
 *
 * @method (arg1)
 * @public
 * @param {Object}          the plugin library,
 * @returns {Boolean}       returns true if it succeeds,
 * @since 0.0.0
 */
PicoDB.plugin = function(plug) {
  return P.plugin(plug);
};


// -- Public Methods -------------------------------------------------------

methods = {

  /**
   * Returns the library name and version.
   * (must not be deleted)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the library name and version,
   * @since 0.0.0
   */
  whoami() {
    return this._library;
  },

  /**
   * Inserts a single document into the db.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Object}        the document to insert,
   * @param {Object}        the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  insertOne(...args) {
    return I.insert(this._db, this._mess, false, ...args);
  },

  /**
   * Inserts an array of documents into the db.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Array}         the documents to insert,
   * @param {Object}        the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  insertMany(...args) {
    return I.insert(this._db, this._mess, true, ...args);
  },

  /**
   * Finds the searched documents.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the query object,
   * @param {Object}        the projection object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  find(...args) {
    F.find(this._cursor, ...args);
    return this;
  },

  /**
   * Returns the found documents in an array.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  toArray(callback) {
    return F.toArray(this._db, this._cursor, callback);
  },

  /**
   * Counts the documents into the db that match.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Object}        the query object,
   * @param {Options}       the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  count(...args) {
    return C.count(this._db, ...args);
  },

  /**
   * Updates many documents into the db.
   *
   * @method (arg1, arg2, [arg3], [arg4])
   * @public
   * @param {Object}        the query object,
   * @param {object}        the items to update,
   * @param {Object}        the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  updateOne(...args) {
    return U.update(this._db, this._mess, false, ...args);
  },

  /**
   * Updates many documents into the db.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {Object}        the query object,
   * @param {object}        the items to update,
   * @param {Object}        the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  updateMany(...args) {
    return U.update(this._db, this._mess, true, ...args);
  },

  /**
   * Deletes the first (the oldest) document into the db that matches.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Object}        the object to found,
   * @param {Options}       the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  deleteOne(...args) {
    return D.delete(this._db, this._mess, false, ...args);
  },

  /**
   * Deletes the documents into the db that match.
   *
   * @method (arg1, [arg2], [arg3])
   * @public
   * @param {Object}        the object to found,
   * @param {Options}       the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  deleteMany(...args) {
    return D.delete(this._db, this._mess, true, ...args);
  },

  /**
   * Registers the specified listener on the event it's called on.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the event,
   * @param {function}      the event listener,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  addEventListener(ename, listener) {
    if (this._mess) {
      this._mess.subscribe(ename, listener);
      return this;
    }
    /* eslint-disable-next-line no-console */
    console.log('warning: the plugin @mobilabs/messenger isn\'t installed!');
    return this;
  },

  /**
   * Registers the specified listener on the event for once.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the event,
   * @param {function}      the event listener,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  addOneTimeEventListener(ename, listener) {
    if (this._mess) {
      this._mess.subscribeOnce(ename, listener);
      return this;
    }
    /* eslint-disable-next-line no-console */
    console.log('warning: the plugin @mobilabs/messenger isn\'t installed!');
    return this;
  },

  /**
   * Removes the event listener previously registered with addEventListener.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the event,
   * @param {function}      the event listener,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  removeEventListener(ename, listener) {
    if (this._mess) {
      this._mess.unsubscribe(ename, listener);
    }
    return this;
  },

  /**
   * Registers the specified listener on the event it's called on.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the event,
   * @param {function}      the event listener,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  on(ename, listener) {
    return this.addEventListener(ename, listener);
  },

  /**
   * Registers the specified listener on the event for once.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the event,
   * @param {function}      the event listener,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  one(ename, listener) {
    return this.addOneTimeEventListener(ename, listener);
  },

  /**
   * Removes the event listener previously registered with addEventListener.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the name of the event,
   * @param {function}      the event listener,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  off(ename, listener) {
    return this.removeEventListener(ename, listener);
  },
};


// -- Export
export default PicoDB;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
