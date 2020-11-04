/** ************************************************************************
 *
 * Extracts the requested document(s) from the database.
 *
 * find.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _initCursor                 returns the default cursor object,
 *  . _getArgs                    returns the filtered arguments,
 *  . _toArray                    returns the found documents,
 *  . _find                       creates the cursor w.r.t to the query & proj,
 *
 *
 * Public Static Methods:
 *  . initCursor                  returns the default cursor object,
 *  . find                        creates the cursor w.r.t to the query & proj,
 *  . toArray                     returns the found documents,
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
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import _ from '../lib/_';
import P from './projection';
import Q from './query';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Returns the default cursor object.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns the default cursor object,
 * @since 0.0.0
 */
function _initCursor() {
  return {
    query: {},
    projection: {
      type: null,
      value: null,
    },
  };
}

/**
 * Returns the filtered arguments.
 *
 * @function (arg1, [arg2])
 * @private
 * @param {object}          the query filter,
 * @param {object}          the passed-in options,
 * @returns {Array}         returns an array with the filtered arguments,
 * @since 0.0.0
 */
function _getArgs(...args) {
  return [
    _.isLiteralObject(args[0]) ? args[0] : {},
    _.isLiteralObject(args[1]) ? args[1] : {},
  ];
}

/**
 * Returns the found documents.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the db object,
 * @param {Object}          the cursor object,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _toArray(db, cursor, callback) {
  if (!cursor.query) {
    callback('This query isn\'t a valid Cursor query object');
    return;
  }

  // Parse the database:
  const sop = Q.isHavingSpecialOperator(cursor.query);
  const docs = [];
  for (let i = 0; i < db.data.length; i++) {
    if (Q.isMatch(db.data[i], cursor.query, sop)) {
      P.add(docs, db.data[i], cursor.projection);
    }
  }
  callback(null, docs);
}

/**
 * Creates the cursor w.r.t to the query filter and the projection.
 *
 * @function (arg1, arg2, [arg3])
 * @private
 * @param {Object}          the cursor object,
 * @param {Object}          the query filter,
 * @param {Object}          the projection,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _find(cursor, query, projection) {
  cursor.query = query;
  cursor.projection.type = P.isProjectionTypeInclude(projection);
  cursor.projection.value = P.setProjection(projection, cursor.projection.type);
}
/* eslint-enable no-param-reassign */


// -- Public Static Methods ------------------------------------------------

const FA = {

  /**
   * Returns the default cursor.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the default cursor,
   * @since 0.0.0
   */
  initCursor() {
    return _initCursor();
  },

  /**
   * Creates the cursor w.r.t to the query filter and the projection.
   *
   * @method (arg1, arg2, [arg3])
   * @public
   * @param {Object}        the cursor object,
   * @param {Object}        the query filter,
   * @param {Object}        the projection,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  find(cursor, ...args) {
    const [query, projection] = _getArgs(...args);
    _find(cursor, query, projection);
    return this;
  },

  /**
   * Returns the found documents.
   *
   * @method (arg1, arg2, [arg3])
   * @public
   * @param {Object}        the cursor object,
   * @param {Object}        the query filter,
   * @param {Object}        the projection,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  toArray(db, cursor, cb) {
    const callback = _.isFunction(cb) ? cb : null;

    return new Promise((resolve, reject) => {
      _toArray(db, cursor, (err, resp) => {
        if (err) {
          reject(err);
          if (callback) callback(err);
        } else {
          resolve(resp);
          if (callback) callback(null, resp);
        }
      });
    });
  },
};


// -- Export
export default FA;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
