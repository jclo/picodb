/**
 * picodb.js is the entry point of PicoDB. All the public methods are defined in
 * this file.
 *
 * @namespace _
 * @functions -
 * @exports   -
 * @author    -
 * @since     0.0.1
 * @version   -
 */

/**
 * Private functions:
 *  . -                         -,
 *
 * Public methods:
 *  . count                     counts the documents into the db that match,
 *  . deleteMany                deletes the documents into the db that match,
 *  . deleteOne                 deletes the first (the oldest) document into the db that matches,
 *  . insertMany                inserts an array of documents into the db,
 *  . insertOne                 inserts a single document into the db,
 *  . updateMany                updates many documents into the db,
 *  . updateOne                 updates many documents into the db,
 *  . find                      finds the searched documents,
 *  . toArray                   returns the found documents in an array,
 *  . addEventListener          registers the specified listener on the event it's called on,
 *  . addOneTimeEventListener   registers the specified listener on the event it's called on for a one-time event,
 *  . removeEventListener       removes the event listener previously registered with addEventListener,
 *  . on                        alias on addEventListener,
 *  . one                       alias on addOneTimeEventListener,
 *  . off                       alias on removeEventListener,
 */
/* eslint-disable no-param-reassign, vars-on-top, no-unused-expressions, no-eval */

'use strict';

// -- Private Functions ------------------------------------------------------


// -- Public -----------------------------------------------------------------

/**
* Creates and returns the object PicoDB.
* (Prototypal Instantiation Pattern)
*
* @constructor ()
* @public
* @param {}           -,
* @returns {Object}   returns PicoDB object,
* @since 0.0.0
*/
PicoDB = function() {
  var obj = Object.create(PicoDBMethods);
  // Adds the database container & attaches it a schema:
  obj.db = _insert._schema();
  // Adds an eventQ:
  obj.eventQ = _event.setEventListenerList();
  return obj;
};

// Saves the previous value of the PicoDB variable, so that it can be
// restored later on, if noConflict is used.
previousPicoDB = root.PicoDB;

// Runs PicoDB in noConflict mode, returning the PicoDB variable to its
// previous owner. Returns a reference to this PicoDB object.
/* istanbul ignore next */
PicoDB.noConflict = function() {
  root.PicoDB = previousPicoDB;
  return this;
};

// Current version of the library:
PicoDB.VERSION = '{{lib:version}}';
/* eslint-enable no-param-reassign */


// -- Public Methods ---------------------------------------------------------

PicoDBMethods = {

  /**
   * Exports the reference to an internal library.
   *
   * Nota:
   * This function is private but accessible from outside! It is required for
   * testing internal libraries.
   *
   * @method (arg1)
   * @private
   * @param {String}    the name of the internal library,
   * @returns {Object}  the reference to the library,
   * @since 0.0.1
   */
  _export: function(name) {
    return eval(name);
  },

  /**
   * Counts the documents into the db that match.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}     the query object,
   * @param {Options}    the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  count: function(query, options, callback) {
    // Return silently if the database isn't initialized or
    // if they are too few arguments:
    if (!this.db || arguments.length < 1) {
      return;
    }
    _count.count(this, query, options, callback);
  },

  /**
   * Deletes the documents into the db that match.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}     the object to found,
   * @param {Options}    the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  deleteMany: function(filter, options, callback) {
    // Return silently if the database isn't initialized or
    // if they are too few arguments:
    if (!this.db || arguments.length < 1) {
      return;
    }
    _delete.delete(this, true, filter, options, callback);
  },

  /**
   * Deletes the first (the oldest) document into the db that matches.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}     the object to found,
   * @param {Options}    the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  deleteOne: function(filter, options, callback) {
    // Return silently if the database isn't initialized or
    // if they are too few arguments:
    if (!this.db || arguments.length < 1) {
      return;
    }
    _delete.delete(this, false, filter, options, callback);
  },

  /**
   * Inserts an array of documents into the db.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Array}      the documents to insert,
   * @param {Object}     the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  insertMany: function(docs, options, callback) {
    // Return silently if they are too few arguments:
    if (arguments.length < 1) {
      return;
    }
    _insert.insert(this, true, docs, options, callback);
  },

  /**
   * Inserts a single document into the db.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}     the document to insert,
   * @param {Object}     the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  insertOne: function(doc, options, callback) {
    // Return silently if they are too few arguments:
    if (arguments.length < 1) {
      return;
    }
    _insert.insert(this, false, doc, options, callback);
  },

  /**
   * Updates many documents into the db.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {Object}     the query object,
   * @param {object}     the items to update,
   * @param {Object}     the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  updateMany: function(query, update, options, callback) {
    // Return silently if the database isn't initialized or
    // if they are too few arguments:
    if (!this.db || arguments.length < 2) {
      return;
    }
    _update.update(this, true, query, update, options, callback);
  },

  /**
   * Updates many documents into the db.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {Object}     the query object,
   * @param {object}     the items to update,
   * @param {Object}     the optional settings,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  updateOne: function(query, update, options, callback) {
    // Return silently if the database isn't initialized or
    // if they are too few arguments:
    if (!this.db || arguments.length < 2) {
      return;
    }
    _update.update(this, false, query, update, options, callback);
  },

  /**
   * Finds the searched documents.
   *
   * @method (arg1)
   * @public
   * @param {Object}     the query object,
   * @param {Object}     the projection object,
   * @returns {Object}   returns this,
   * @since 0.0.1
   */
  /* eslint-disable no-param-reassign */
  find: function(query, projection) {
    query = query || {};
    projection = projection || {};

    // Searches documents that match the query:
    _find.find(this, query, projection);
    return this;
  },
  /* eslint-enable no-param-reassign */

  /**
   * Returns the found documents in an array.
   *
   * @method (arg1)
   * @public
   * @param {Object}     the function to call at completion to retrieve the
   *                     found documents,
   * @returns {}         -,
   * @since 0.0.1
   */
  toArray: function(callback) {
    _find.toArray(this, callback);
  },

  /**
   * Registers the specified listener on the event it's called on.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}    the type of event,
   * @param {function}  the event listener,
   * @returns {}        -,
   * @since 0.0.1
   */
  addEventListener: function(type, listener) {
    _event.addEventListener(this.eventQ, type, listener);
  },

  /**
   * Registers the specified listener on the event it's called on for a one-time event.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}    the type of event,
   * @param {function}  the event listener,
   * @returns {}        -,
   * @since 0.0.1
   */
  addOneTimeEventListener: function(type, listener) {
    _event.addOneTimeEventListener(this.eventQ, type, listener);
  },

  /**
   * Removes the event listener previously registered with addEventListener.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}    the type of event,
   * @param {function}  the event listener,
   * @returns {}        -,
   * @since 0.0.1
   */
  removeEventListener: function(type, listener) {
    _event.removeEventListener(this.eventQ, type, listener);
  },


  /**
   * Registers the specified listener on the event it's called on.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}    the type of event,
   * @param {function}  the event listener,
   * @returns {}        -,
   * @since 0.0.1
   */
  on: function(type, listener) {
    this.addEventListener(type, listener);
  },

  /**
   * Registers the specified listener on the event it's called on for a one-time event.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}    the type of event,
   * @param {function}  the event listener,
   * @returns {}        -,
   * @since 0.0.1
   */
  one: function(type, listener) {
    this.addOneTimeEventListener(type, listener);
  },

  /**
   * Removes the event listener previously registered with addEventListener.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}    the type of event,
   * @param {function}  the event listener,
   * @returns {}        -,
   * @since 0.0.1
   */
  off: function(type, listener) {
    this.removeEventListener(type, listener);
  }
};

/* eslint-enable no-param-reassign, vars-on-top, no-unused-expressions, no-eval */
