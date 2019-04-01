/** **************************************************************************
 *
 * An embedded library providing functions to count documents into the db.
 *
 * count.js is just a literal object that contains a set of static methods. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _count                      counts the number of documents,
 *
 *
 * Public Static Methods:
 *  . count                       counts the number of documents,
 *
 *
 * @namespace    P.Count
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
  var Query = P.Query
    ;


  // -- Local constants


  // -- Local variables


  // -- Private Functions ----------------------------------------------------

  /**
   * Counts the number of documents.
   *
   * @function (arg1, arg2, arg3, arg4)
   * @private
   * @param {Object}      the database object,
   * @param {Object}      the query object,
   * @param {Options}     the optional settings,
   * @param {Function}    the function to call at completion,
   * @returns {}          -,
   * @since 0.0.0
   */
  function _count(db, query, options, callback) {
    var sop = Query.isHavingSpecialOperator(query)
      , count
      , i
      ;

    // Test is query is valid:
    if (!_.isObject(query) || _.isArray(query) || _.isFunction(query)) {
      if (callback) {
        callback('query is not a valid object!', 0);
      }
      return;
    }

    // Parse the db and count:
    count = 0;
    for (i = 0; i < db.data.length; i++) {
      if (Query.isMatch(db.data[i], query, sop)) {
        count += 1;
        // console.log(db.data[i]);
      }
    }
    if (callback) {
      callback(null, count);
    }
  }


  // -- Public Static Methods ------------------------------------------------

  P.Count = {

    /**
     * Counts the number of documents.
     *
     * @method (arg1, arg2, arg3, arg4)
     * @public
     * @param {Object}    the context object,
     * @param {Object}    the query object,
     * @param {Options}   the optional settings,
     * @param {Function}  the function to call at completion,
     * @returns {}        -,
     * @since 0.0.1
     */
    /* eslint-disable no-param-reassign */
    count: function(_this, query, options, callback) {
      var db = _this.db
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

      // Try to count:
      _count(db, query, options, callback);
    }
    /* eslint-enable no-param-reassign */

  };
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
