/** **************************************************************************
 *
 * An embedded library providing functions to find documents into the db.
 *
 * find.js is just a literal object that contains a set of static methods. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _initCursor                 initializes the Cursor object,
 *  . _process                    processes the search,
 *
 *
 * Public Static Methods:
 *  . find                        find the documents,
 *  . toArray                     returns the found documents,
 *
 *
 * @namespace    P.Find
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
  var Query   = P.Query
    , Project = P.Project
    ;


  // -- Local constants


  // -- Local variables


  // -- Private Functions ----------------------------------------------------

  /**
   * Initializes the Cursor object.
   *
   * @function ()
   * @private
   * @param {}           -,
   * @returns {Object}   the cursor object to attach to the database,
   * @since 0.0.1
   */
  function _initCursor() {
    return {
      query: {},
      projection: {
        type: null,
        value: null
      }
    };
  }

  /**
   * Processes the search.
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}     the database object,
   * @param {Function}   the function to call at completion,
   * @returns {}         -,
   * @since 0.0.1
   */
  function _process(dbO, callback) {
    var query      = dbO.cursor.query
      , projection = dbO.cursor.projection
      , db         = dbO.db
      , sop        = Query.isHavingSpecialOperator(query)
      , docs
      , i
      ;

    // Return an error if query is considered as not valid:
    if (_.isArray(query) || _.isFunction(query) || !_.isObject(query)) {
      callback('This query isn\'t a valid Cursor query object');
      return;
    }

    // Parse the database:
    docs = [];
    for (i = 0; i < db.data.length; i++) {
      if (Query.isMatch(db.data[i], query, sop)) {
        Project.add(docs, db.data[i], projection);
      }
    }
    callback(null, docs);
  }


  // -- Public Static Methods ------------------------------------------------

  P.Find = {

    /**
     * Find documents.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}     the context object,
     * @param {Object}     the query object,
     * @param {Object}     the projection object,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    /* eslint-disable no-param-reassign */
    find: function(_this, query, projection) {
      var cursor;

      if (!_this.cursor) {
        _this.cursor = _initCursor();
      }
      cursor = _this.cursor;

      // Save the query and the projection:
      cursor.query = !_.isArray(query) && _.isObject(query)
        ? query
        : {};

      if (!_.isArray(projection) && _.isObject(projection)) {
        cursor.projection.type = Project.isProjectionTypeInclude(projection);
        cursor.projection.value = Project.setProjection(projection, cursor.projection.type);
      } else {
        cursor.projection.value = {};
      }
    }, /* eslint-enable no-param-reassign */

    /**
     * Returns the found documents.
     *
     * @method (arg1, arg2)
     * @public
     * @param {Object}     the context object,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    toArray: function(_this, callback) {
      // If callback isn't a function, return silently:
      if (!_.isFunction(callback)) {
        return;
      }

      // Process the find query:
      _process(_this, callback);
    }
  };
}());
/* eslint-enable one-var, semi-style, no-underscore-dangle */
