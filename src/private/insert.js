/** **************************************************************************
 *
 * An embedded library providing functions to insert new documents into the db.
 *
 * insert.js is just a literal object that contains a set of static methods. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _schema                     returns the db model,
 *  . _isNewId                    checks that this 'id' is new,
 *  . _insert                     inserts the new documents into the db,
 *
 *
 * Public Static Methods:
 *  . schema                      returns the db model,
 *  . insert                      inserts the new documents into the db,
 *
 *
 * @namespace    P.Insert
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* global P, _ */
/* eslint-disable one-var, semi-style, no-underscore-dangle */

'use strict';

(function() {
  // IIFE

  // -- Module path


  // -- Local modules
  var Event = P.Event
    ;


  // -- Local constants


  // -- Local variables


  // -- Private Functions ----------------------------------------------------

  /**
   * Returns the db model.
   *
   * @function ()
   * @private
   * @param {}            -,
   * @returns {Object}    returns the db object model,
   * @since 0.0.1
   */
  function _schema() {
    return {
      data: []
    };
  }

  /**
   * Checks that this 'id' is new.
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      the database object,
   * @param {String}      the new id,
   * @returns {Boolean}   returns true if the id is new, false otherwise,
   * @since 0.0.0
   */
  function _isNewId(db, id) {
    var status = true
      , i
      ;

    for (i = 0; i < db.data.length; i++) {
      if (db.data[i]._id === id) {
        status = false;
        break;
      }
    }

    return status;
  }

  /**
   * Inserts the new documents into the db.
   *
   * @function (arg1, arg2, arg3, arg4, arg5)
   * @private
   * @param {Object}        the database object,
   * @param {Object}        the eventQ,
   * @param {Array/Object}  the new document(s),
   * @param {Object}        the settings,
   * @param {Function}      the function to call at the completion,
   * @returns {}            -,
   * @since 0.0.1
   */
  function _insert(db, eventQ, docs, options, callback) {
    var arr
      , docOut
      , id
      , i
      ;
    // Embed a single document in an array to get a generic process.
    arr = [];
    if (!_.isArray(docs) && _.isObject(docs)) {
      arr.push(docs);
    } else {
      arr = docs;
    }

    // Parse all the documents:
    docOut = [];
    for (i = 0; i < arr.length; i++) {
      if (_.isObject(arr[i])) {
        if (arr[i]._id) {
          // Do not duplicate doc!
          if (_isNewId(db, arr[i]._id)) {
            // Do not copy the references. Create new objects!
            db.data.push(_.extend({}, arr[i]));
            // Do not pass references to the db. Provide a copy instead!
            docOut.push(_.extend({}, arr[i]));
            if (!options.many) {
              break;
            }
          }
        } else {
          id = _.token();
          db.data.push(_.extend({ _id: id }, arr[i]));
          docOut.push(_.extend({ _id: id }, arr[i]));
          if (!options.many) {
            break;
          }
        }
      }
    }

    // Fire an event and execute the callback:
    Event.fire(eventQ, 'change', docOut);
    Event.fire(eventQ, 'insert', docOut);
    if (callback) {
      callback(null, docOut);
    }
  }


  // -- Public Static Methods ------------------------------------------------

  P.Insert = {

    /**
     * Returns the db model.
     *
     * @method ()
     * @public
     * @param {}          -,
     * @returns {Object}  returns the db object model,
     * @since 0.0.0
     */
    schema: function() {
      return _schema();
    },

    /**
     * Inserts the new documents into the db.
     *
     * @method (arg1, arg2, arg3, arg4, arg5)
     * @public
     * @param {Object}        the context object,
     * @param {Boolean}       true if many, false if one,
     * @param {Array/Object}  the new document(s),
     * @param {Object}        the optional settings,
     * @param {Function}      the function to call at the completion,
     * @returns {}            -,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    insert: function(_this, many, docs, options, callback) {
      var db     = _this.db
        , eventQ = _this.eventQ
        ;

      // Check if there is a callback function:
      if (callback && !_.isFunction(callback)) {
        callback = undefined;
      } else if (!callback && !_.isFunction(options)) {
        callback = undefined;
      } else if (!callback && _.isFunction(options)) {
        callback = options;
        options = {};
      }

      // Check if options is an object:
      if (_.isArray(options) || !_.isObject(options)) {
        options = {};
      }

      // Insert if it is a valid document:
      options.many = many;
      if (_.isArray(docs) || _.isObject(docs)) {
        _insert(db, eventQ, docs, options, callback);
      }
    }
    /* eslint-enable no-param-reassign */
  };
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
