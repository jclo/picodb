/** ************************************************************************
 *
 * Deletes the requested documents from the database.
 *
 * delete.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _getArgs                    returns the filtered arguments,
 *  . _delete                     deletes the requested documents from the db,
 *
 *
 * Public Static Methods:
 *  . _delete                     deletes the requested documents from the db,
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
  // filter, options, callback
  switch (args.length) {
    case 1:
      // must be filter or callback
      if (_.isLiteralObject(args[0])) {
        return [args[0], {}, null];
      }
      if (_.isFunction(args[0])) {
        return [null, {}, args[0]];
      }
      return [null, {}, null];

    case 2:
      // must be filter, options or filter, callback
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
        return [null, null, args[1]];
      }
      return [null, null, null];

    case 3:
      // must be filter, options, callback
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
        return [null, null, args[2]];
      }
      return [null, null, null];

    default:
      return [null, null, null];
  }
}

/**
 * Deletes the requested documents from the db.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6)
 * @private
 * @param {object}          the db object,
 * @param {object}          the messenger object,
 * @param {Boolean}         deletes one or many,
 * @param {Object}          the query filter,
 * @param {object}          the passed-in options,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _delete(db, mess, many, filter, options, callback) {
  if (!filter) {
    callback(null, 0);
    return;
  }

  let docOut = []
    , removed
    , dblength
    ;

  // Parse the documents into the db one by one and check if the keys match:
  // (each time a document is deleted, the counter and the length size must
  // be reajusted. It could have been easier to parse the db from the last
  // to the first but in case of deleteOne it deletes the most recent
  // instead of the oldest)
  const sop = Q.isHavingSpecialOperator(filter);
  docOut = [];
  removed = 0;
  dblength = db.data.length;
  // for (i = db.data.length - 1; i >= 0; i--) {
  for (let i = 0; i < dblength; i++) {
    if (Q.isMatch(db.data[i], filter, sop)) {
      // Remove the document that matches:
      docOut.push(db.data.splice(i, 1)[0]);
      removed += 1;
      // Readjust db length after one item has been removed & reposition i:
      i -= 1;
      dblength -= 1;
      if (!many) {
        // Remove one document only!
        break;
      }
    }
  }

  // Fire an event and execute the callback:
  if (mess) {
    mess.publish('delete', docOut);
    mess.publish('change', docOut);
  }
  callback(null, removed);
}


// -- Public Static Methods ------------------------------------------------

const Delete = {

  /**
   * Deletes the requested documents from the db.
   *
   * @method (arg1, arg2, arg3, arg4, arg5, arg6)
   * @public
   * @param {object}          the db object,
   * @param {object}          the messenger object,
   * @param {Boolean}         deletes one or many,
   * @param {Object}          the query filter,
   * @param {object}          the passed-in options,
   * @param {Function}        the function to call at the completion,
   * @returns {Object}        returns a promise,
   * @since 0.0.0
   */
  delete(db, mess, many, ...args) {
    const [filter, options, callback] = _getArgs(...args);

    return new Promise((resolve, reject) => {
      _delete(db, mess, many, filter, options, (err, resp) => {
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
export default Delete;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
