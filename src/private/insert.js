/** ************************************************************************
 *
 * A set of functions to insert new documents into the db.
 *
 * insert.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _getArgs                    returns the filtered arguments,
 *  . _schema                     returns the db model,
 *  . _isNewId                    checks that this 'id' is new,
 *  . _process                    inserts the new documents into the db,
 *  . _insert                     inserts the new documents into the db,
 *
 *
 * Public Static Methods:
 *  . schema                      returns the db model,
 *  . insert                      inserts the new documents into the db,
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


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Returns the filtered arguments.
 *
 * @function (arg1, [arg2], arg3)
 * @private
 * @param {Array/Object}    the new document(s),
 * @param {Object}          the settings,
 * @param {Function}        the function to call at the completion,
 * @returns {Array}         returns the filtered arguments,
 * @since 0.0.0
 */
function _getArgs(...args) {
  // docs, options, callback
  switch (args.length) {
    case 1:
      // must be docs or fn
      if (_.isArray(args[0]) || _.isLiteralObject(args[0])) {
        return [args[0], {}, null];
      }
      if (_.isFunction(args[0])) {
        return [[], {}, args[0]];
      }
      return [[], {}, null];

    case 2:
      // must be docs, options or docs, callback
      if (_.isArray(args[0]) || _.isLiteralObject(args[0])) {
        if (_.isLiteralObject(args[1])) {
          return [args[0], args[1], null];
        }
        if (_.isFunction(args[1])) {
          return [args[0], {}, args[1]];
        }
        return [args[0], {}, null];
      }
      if (_.isFunction(args[1])) {
        return [[], {}, args[1]];
      }
      return [[], {}, null];

    case 3:
      // must be docs, options, callback
      if (_.isArray(args[0]) || _.isLiteralObject(args[0])) {
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
        return [[], {}, args[2]];
      }
      return [[], {}, null];

    default:
      return [[], {}, null];
  }
}

/**
 * Returns the db model.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns the db object model,
 * @since 0.0.0
 */
function _schema() {
  return {
    data: [],
  };
}

/**
 * Checks that this 'id' is new.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the database object,
 * @param {String}          the new id,
 * @returns {Boolean}       returns true if the id is new, false otherwise,
 * @since 0.0.0
 */
function _isNewId(db, id) {
  let status = true;
  for (let i = 0; i < db.data.length; i++) {
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
 * @param {Object}          the database object,
 * @param {Object}          the messenger object,
 * @param {Array/Object}    the new document(s),
 * @param {Object}          the settings,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _process(db, mess, docs, options, callback) {
  // Embed a single document in an array to get a generic process.
  let arr = [];
  if (_.isLiteralObject(docs)) {
    arr.push(docs);
  } else {
    arr = docs;
  }

  // Parse all the documents:
  const docOut = [];
  for (let i = 0; i < arr.length; i++) {
    if (_.isLiteralObject(arr[i])) {
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
        const id = _.token();
        db.data.push(_.extend({ _id: id }, arr[i]));
        docOut.push(_.extend({ _id: id }, arr[i]));
        if (!options.many) {
          // insert only the first document if many is false!
          break;
        }
      }
    }
  }

  // Fire an event and execute the callback:
  if (mess) {
    mess.publish('change', docOut);
    mess.publish('insert', docOut);
  }
  callback(null, docOut);
}

/**
 * Inserts the new documents into the db.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {Object}          the database object,
 * @param {Object}          the messenger object,
 * @param {Boolean}         true if many, false if one,
 * @param {Array/Object}    the new document(s),
 * @param {Object}          the settings,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _insert(db, mess, many, docs, options, callback) {
  // Insert if it is a valid document:
  options.many = many;
  if (many && _.isArray(docs)) {
    _process(db, mess, docs, options, callback);
    return;
  }
  if (!many && (_.isArray(docs) || _.isLiteralObject(docs))) {
    _process(db, mess, docs, options, callback);
    return;
  }
  callback(null, []);
}
/* eslint-enable no-param-reassign */


// -- Public Static Methods ------------------------------------------------

const Insert = {

  /**
   * Returns the db model.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the db object model,
   * @since 0.0.0
   */
  schema() {
    return _schema();
  },

  /**
   * Inserts the new documents into the db.
   *
   * @method (arg1, arg2, arg3, arg4, [arg5])
   * @public
   * @param {Object}        the database object,
   * @param {Object}        the messenger object,
   * @param {Boolean}       true if many, false if one,
   * @param {Array/Object}  the new document(s),
   * @param {Object}        the settings,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  insert(db, mess, many, ...args) {
    const [docs, options, callback] = _getArgs(...args);

    return new Promise((resolve, reject) => {
      _insert(db, mess, many, docs, options, (err, resp) => {
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
export default Insert;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
