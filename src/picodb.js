/** **************************************************************************
 *
 * A tiny in-memory database (MongoDB like) that stores JSON documents.
 *
 * This is the entry point of the library where is defined the constructor
 * and the attached methods.
 *
 * picodb.js.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . none,
 *
 * Constructor:
 *  . PicoDB                      creates the database object,
 *
 *
 * Public Methods:
 *  . count                       counts the documents into the db that match,
 *  . deleteMany                  deletes the documents into the db that match,
 *  . deleteOne                   deletes the first (the oldest) doc. that matches,
 *  . insertMany                  inserts an array of documents,
 *  . insertOne                   inserts a single document,
 *  . updateMany                  updates many documents,
 *  . updateOne                   updates one document,
 *  . find                        finds the searched documents,
 *  . toArray                     returns the found documents in an array,
 *  . addEventListener            registers the specified listener,
 *  . addOneTimeEventListener     registers the specified listener for once,
 *  . removeEventListener         removes the event registered listener,
 *  . on                          alias on addEventListener,
 *  . one                         alias on addOneTimeEventListener,
 *  . off                         alias on removeEventListener,
 *
 *
 * @namespace    PicoDB
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* global P */
/* eslint-disable one-var, semi-style */

'use strict';

(function() {
  // IIFE

  // -- Module path
  var Event  = P.Event
    , Insert = P.Insert
    , Count  = P.Count
    , Delete = P.Delete
    , Update = P.Update
    , Find   = P.Find
    ;


  // -- Local modules


  // -- Local constants
  var methods
    , previousPicoDB
    ;


  // -- Local variables


  // -- Public ---------------------------------------------------------------

  /**
  * Creates and returns the object PicoDB.
  * (Prototypal Instantiation Pattern)
  *
  * @constructor ()
  * @public
  * @param {}             -,
  * @returns {Object}     returns PicoDB object,
  * @since 0.0.0
  */
  PicoDB = function() {
    var obj = Object.create(methods);
    // Adds the database container & attaches it a schema:
    obj.db = Insert.schema();
    // Adds an eventQ:
    obj.eventQ = Event.setEventListenerList();
    return obj;
  };

  // Saves the previous value of the PicoDB variable, so that it can be
  // restored later on, if noConflict is used.
  previousPicoDB = root.PicoDB;

  // Runs PicoDB in noConflict mode, returning the PicoDB variable to its
  // previous owner. Returns a reference to this PicoDB object.
  /* istanbul ignore next */
  PicoDB.noConflict = function() {
    /* eslint-disable-next-line no-param-reassign */
    root.PicoDB = previousPicoDB;
    return this;
  };

  // Current version of the library:
  PicoDB.VERSION = '{{lib:version}}';


  // -- Public Methods -------------------------------------------------------

  methods = {

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
      /* eslint-disable-next-line no-eval */
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
      Count.count(this, query, options, callback);
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
      Delete.delete(this, true, filter, options, callback);
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
      Delete.delete(this, false, filter, options, callback);
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
      Insert.insert(this, true, docs, options, callback);
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
      Insert.insert(this, false, doc, options, callback);
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
      Update.update(this, true, query, update, options, callback);
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
      Update.update(this, false, query, update, options, callback);
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
      Find.find(this, query, projection);
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
      Find.toArray(this, callback);
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
      Event.addEventListener(this.eventQ, type, listener);
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
      Event.addOneTimeEventListener(this.eventQ, type, listener);
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
      Event.removeEventListener(this.eventQ, type, listener);
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
}());
/* eslint-enable one-var, semi-style */
