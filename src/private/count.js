/** ************************************************************************
 *
 * Counts the number of documents into the db w.r.t. the filter.
 *
 * count.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _getArgs                    returns the filtered arguments,
 *  . _count                      counts the number of the documents in the db,
 *
 *
 * Public Static Methods:
 *  . _count                      counts the number of the documents in the db,
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
import Q from './query';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Returns the filtered arguments.
 *
 * @function (arg1, [arg2], [arg3])
 * @private
 * @param {object}          the query filter,
 * @param {object}          the passed-in options,
 * @param {Function}        the function to call at the completion,
 * @returns {Array}         returns an array with the filtered arguments,
 * @since 0.0.0
 */
function _getArgs(...args) {
  // query, options, callback
  switch (args.length) {
    case 1:
      // must be query
      if (_.isLiteralObject(args[0])) {
        return [args[0], {}, null];
      }
      if (_.isFunction(args[0])) {
        return [null, {}, args[0]];
      }
      return [null, {}, args[0]];

    case 2:
      // must be query, options or query, callback
      if (_.isLiteralObject(args[0])) {
        if (_.isLiteralObject(args[1])) {
          return [args[0], args[1], null];
        }
        if (_.isFunction(args[1])) {
          return [args[0], {}, args[1]];
        }
        return [args[0], {}, null];
      }
      if (_.isFunction(args[1])) {
        return [null, {}, args[1]];
      }
      return [null, {}, null];

    case 3:
      // must be query, options, callback
      if (_.isLiteralObject(args[0])) {
        if (_.isLiteralObject(args[1])) {
          if (_.isFunction(args[2])) {
            return [args[0], args[1], args[2]];
          }
          return [args[0], args[1], null];
        }
        if (_.isFunction(args[2])) {
          return [args[0], {}, args[2]];
        }
        return [args[0], {}, null];
      }
      if (_.isFunction(args[2])) {
        return [null, {}, args[2]];
      }
      return [null, {}, args[2]];

    default:
      return [null, {}, null];
  }
}

/**
 * Counts the number of the documents contained in the db.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the db,
 * @param {Object}          the query filter,
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _count(db, query, options, callback) {
  if (!query) {
    callback(null, 0);
    return;
  }

  const sop = Q.isHavingSpecialOperator(query);
  let count = 0;
  for (let i = 0; i < db.data.length; i++) {
    if (Q.isMatch(db.data[i], query, sop)) {
      count += 1;
    }
  }
  callback(null, count);
}


// -- Public Static Methods ------------------------------------------------

const Count = {

  /**
   * Counts the number of the documents contained in the db
   *
   * @method (arg1, arg2, arg3, [arg4])
   * @public
   * @param {Object}        the database object,
   * @param {Object}        the query filter object,
   * @param {Object}        the optional settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  count(db, ...args) {
    const [query, options, callback] = _getArgs(...args);

    return new Promise((resolve, reject) => {
      _count(db, query, options, (err, resp) => {
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
export default Count;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
