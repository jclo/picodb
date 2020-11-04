/** ************************************************************************
 *
 * Updates the requested documents into the database.
 *
 * update.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _getArgs                    returns the filtered arguments,
 *  . _pull                       processes the $pull operator,
 *  . _push                       processes the $push operator,
 *  . _apply                      applies the requested update to the document,
 *  . _replace                    replaces the document content,
 *  . _applyTime                  updates or adds the time fields to the document,
 *  . _updateThisDoc              updates this document,
 *  . _update                     updates the requested document(s),
 *
 *
 * Public Static Methods:
 *  . update                      updates the requested document(s),
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
  // query, update, options, callback
  switch (args.length) {
    case 1:
      // must be callback
      if (_.isFunction(args[0])) {
        return [null, null, {}, args[0]];
      }
      return [null, null, {}, null];

    case 2:
      // must be query, update or query, callback
      if (_.isLiteralObject(args[0])) {
        if (_.isLiteralObject(args[1])) {
          return [args[0], args[1], {}, null];
        }
        if (_.isFunction(args[1])) {
          return [null, null, {}, args[1]];
        }
        return [null, null, {}, null];
      }
      if (_.isFunction(args[1])) {
        return [null, null, {}, args[1]];
      }
      return [null, null, {}, null];

    case 3:
      // must be query, update, options or query, update, callback
      if (_.isLiteralObject(args[0]) && _.isLiteralObject(args[1])) {
        if (_.isLiteralObject(args[2])) {
          return [args[0], args[1], args[2], null];
        }
        if (_.isFunction(args[2])) {
          return [args[0], args[1], {}, args[2]];
        }
        return [args[0], args[1], {}, null];
      }
      if (_.isFunction(args[2])) {
        return [null, null, {}, args[2]];
      }
      return [null, null, {}, null];


    case 4:
      // must be query, update, options, callback
      if (_.isLiteralObject(args[0]) && _.isLiteralObject(args[1])) {
        if (_.isLiteralObject(args[2])) {
          if (_.isFunction(args[3])) {
            return [args[0], args[1], args[2], args[3]];
          }
          return [args[0], args[1], args[2], null];
        }
        if (_.isFunction(args[3])) {
          return [args[0], args[1], {}, args[3]];
        }
        return [args[0], args[1], {}, null];
      }
      if (_.isFunction(args[3])) {
        return [null, null, {}, args[3]];
      }
      return [null, null, {}, null];

    default:
      return [null, null, {}, null];
  }
}

/**
 * Processes the $pull operator.
 * ({ $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } })
 *
 * Note: this function mutates the argument `obj`.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination document,
 * @param {Object}          the source document,
 * @returns {Object}        the modified document,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, no-param-reassign, dot-notation, no-continue */
function _pull(obj, source) {
  let prop
    , key
    , match
    , index
    , op
    , arr
    , i
    ;

  for (prop in source) {
    // subprop = _.keys(source[prop]);
    if (_.isObject(source[prop]) && !_.isArray(obj[prop])) {
      if (obj[prop]) {
        _pull(obj[prop], source[prop]);
      }
    } else if (hasOwnProperty.call(source, prop)) {
      // If it doesn't exist or it isn't an array, go next:
      if (!obj[prop] || !_.isArray(obj[prop])) {
        continue;
      }

      // Boolean, Number or String, remove value:
      // (source be equivalent to: orders: 'y')
      if (typeof source[prop] === 'boolean' || typeof source[prop] === 'number' || typeof source[prop] === 'string') {
        index = obj[prop].indexOf(source[prop]);
        if (index > -1) {
          obj[prop].splice(index, 1);
        }
        continue;
      }

      // Object on Array, remove matching objects from array:
      // source be equivalent to: quantity: { a: 1, b: 2 })
      if (_.isObject(source[prop]) && !_.keys(source[prop])[0].match(/^\$/)) {
        // Parse objects:
        for (i = obj[prop].length - 1; i >= 0; i--) {
          if (!_.isObject(obj[prop][i])) {
            break;
          }

          // Do they match?
          match = true;
          for (key in source[prop]) {
            if (obj[prop][i][key] !== source[prop][key]) {
              match = false;
              break;
            }
          }
          if (match) {
            obj[prop].splice(i, 1);
          }
        }
        continue;
      }

      // Object, execute condition:
      // (source be equivalent to: ratings: { values: { $nin: ['cd'] })
      if (_.isObject(source[prop])) {
        [op] = _.keys(source[prop]);
        switch (op) {
          case '$eq':
            index = obj[prop].indexOf(source[prop]['$eq']);
            if (index > -1) {
              obj[prop].splice(index, 1);
            }
            break;

          case '$gt':
            for (i = obj[prop].length - 1; i >= 0; i--) {
              if (obj[prop][i] > source[prop]['$gt']) {
                obj[prop].splice(i, 1);
              }
            }
            break;

          case '$gte':
            for (i = obj[prop].length - 1; i >= 0; i--) {
              if (obj[prop][i] >= source[prop]['$gte']) {
                obj[prop].splice(i, 1);
              }
            }
            break;

          case '$lt':
            for (i = obj[prop].length - 1; i >= 0; i--) {
              if (obj[prop][i] < source[prop]['$lt']) {
                obj[prop].splice(i, 1);
              }
            }
            break;

          case '$lte':
            for (i = obj[prop].length - 1; i >= 0; i--) {
              if (obj[prop][i] <= source[prop]['$lte']) {
                obj[prop].splice(i, 1);
              }
            }
            break;

          case '$ne':
            for (i = obj[prop].length - 1; i >= 0; i--) {
              if (obj[prop][i] !== source[prop]['$ne']) {
                obj[prop].splice(i, 1);
              }
            }
            break;

          case '$in':
            if (!_.isArray(source[prop]['$in'])) {
              break;
            }

            for (i = 0; i < source[prop]['$in'].length; i++) {
              index = obj[prop].indexOf(source[prop]['$in'][i]);
              if (index > -1) {
                obj[prop].splice(index, 1);
              }
            }
            break;

          case '$nin':
            if (!_.isArray(source[prop]['$nin'])) {
              break;
            }

            arr = [];
            for (i = 0; i < source[prop]['$nin'].length; i++) {
              index = obj[prop].indexOf(source[prop]['$nin'][i]);
              if (index > -1) {
                arr.push(source[prop]['$nin'][i]);
              }
            }
            obj[prop] = _.clone(arr);
            break;

          /* istanbul ignore next */
          default:
            throw new Error(
              `Update._pull: the operator "${op}" is not supported!`,
            );
        }
        continue;
      }
    }
  }
  return obj;
}
/* eslint-enable no-restricted-syntax, no-param-reassign, dot-notation, no-continue */

/**
 * Processes the $push operator.
 * (this function mutates the argument `obj`).
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination document,
 * @param {Object}          the source document,
 * @returns {Object}        returns the modified document,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, no-param-reassign, dot-notation, no-continue */
function _push(obj, source) {
  let prop
    , subprop
    , position
    , slice
    , i
    ;

  for (prop in source) {
    if (!{}.hasOwnProperty.call(source, prop)) {
      continue;
    }

    subprop = _.keys(source[prop]);
    if (!_.isArray(source[prop]) && _.isObject(source[prop]) && /* !_.contains(subprop, '$each') */ !subprop[0].match(/^\$/)) {
      if (!obj[prop]) {
        obj[prop] = {};
      }
      _push(obj[prop], source[prop]);
    } else if (hasOwnProperty.call(source, prop)) {
      if (!obj[prop]) {
        obj[prop] = [];
      }

      // Boolean, Number or String:
      if (typeof source[prop] === 'boolean' || typeof source[prop] === 'number' || typeof source[prop] === 'string') {
        obj[prop].push(source[prop]);
        continue;
      }

      // Array:
      if (_.isArray(source[prop])) {
        obj[prop].push(_.clone(source[prop]));
        continue;
      }

      // Object with Update Operator Modifiers: $each, $sort, $position
      if (_.isObject(source[prop]) && _.isArray(source[prop]['$each'])) {
        // Position in the array to insert elements:
        position = source[prop]['$position'];
        if (position === undefined || typeof position !== 'number' || position < 0) {
          position = obj[prop].length;
        }

        // Slice:
        slice = source[prop]['$slice'];
        if (slice === undefined || typeof position !== 'number') {
          slice = null;
        }

        // Update the array from position:
        for (i = source[prop]['$each'].length - 1; i >= 0; i--) {
          obj[prop].splice(position, 0, source[prop]['$each'][i]);
        }

        // Slice the array
        if (slice > 0) {
          obj[prop].splice(slice, obj[prop].length - slice);
        } else if (slice === 0) {
          obj[prop].length = 0;
        } else if (slice < 0) {
          obj[prop].splice(0, obj[prop].length + slice);
        }
      }
    }
  }
  return obj;
}
/* eslint-enable no-restricted-syntax, no-param-reassign, dot-notation, no-continue */

/**
 * Applies the requested update to the document.
 * (this function mutates the argument `obj`)
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the destination document,
 * @param {Object}          the source document,
 * @param {String}          the Update Operator,
 * @returns {Object}        the modified document,
 * @throws {Object}         throws an error if the operator is unknown,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, no-param-reassign, dot-notation */
function _apply(obj, source, op) {
  let prop
    , i
    , j
    ;

  for (prop in source) {
    if (!_.isArray(source[prop]) && _.isObject(source[prop])) {
      if (!obj[prop] && (op === '$rename' || op === '$unset' || op === '$pop')) {
        break;
      } else if (!obj[prop]) {
        obj[prop] = {};
      }
      _apply(obj[prop], source[prop], op);
    } else if (hasOwnProperty.call(source, prop)) {
      // if (_.isArray(source[prop]))
      // obj[prop] = _.clone(source[prop]);
      // else
      switch (op) {
        // Field Operators:
        case '$inc':
          if (typeof obj[prop] === 'number') {
            obj[prop] += source[prop];
          } else {
            obj[prop] = source[prop];
          }
          break;

        case '$mul':
          if (typeof obj[prop] === 'number') {
            obj[prop] *= source[prop];
          } else {
            obj[prop] = 0;
          }
          break;

        case '$rename':
          if (obj[prop]) {
            obj[source[prop]] = obj[prop];
            delete obj[prop];
          }
          break;

        case '$set':
          if (_.isArray(source[prop])) {
            obj[prop] = _.clone(source[prop]);
          } else {
            obj[prop] = source[prop];
          }
          break;

        case '$unset':
          if (obj[prop]) {
            delete obj[prop];
          }
          break;

        case '$min':
          if (!obj[prop] || (typeof obj[prop] === 'number' && source[prop] < obj[prop])) {
            obj[prop] = source[prop];
          }
          break;

        case '$max':
          if (!obj[prop] || (typeof obj[prop] === 'number' && source[prop] > obj[prop])) {
            obj[prop] = source[prop];
          }
          break;

        // Array Operators:
        case '$pop':
          if (_.isArray(obj[prop])) {
            if (source[prop] === 1) {
              obj[prop].pop();
            } else if (source[prop] === -1) {
              obj[prop].shift();
            }
          }
          break;

        case '$pullAll':
          if (_.isArray(obj[prop]) && _.isArray(source[prop])) {
            for (i = 0; i < source[prop].length; i++) {
              for (j = obj[prop].length - 1; j >= 0; j--) {
                if (obj[prop][j] === source[prop][i]) {
                  obj[prop].splice(j, 1);
                }
              }
            }
          }
          break;

        /* istanbul ignore next */
        default:
          throw new Error(
            `Update._apply: the operator "${op}" is unknown!`,
          );
      }
    }
  }
  return obj;
}
/* eslint-enable no-restricted-syntax, no-param-reassign, dot-notation */

/**
 * Replaces the document content.
 * (this function mutates the argument `obj`)
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination document,
 * @param {Object}          the source document,
 * @returns {Object}        returns the modified document,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _replace(obj, source) {
  const keys = _.keys(obj);

  // Delete all the properties of 'obj', except '_id':
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== '_id') {
      delete obj[keys[i]];
    }
  }

  // Update 'obj' with the properties of 'source':
  return _.extend(obj, source);
}
/* eslint-enable no-param-reassign */

/**
 * Updates or adds the time fields to the document.
 * (this function mutates the argument `obj`)
 *
 * If the type is 'timestamp' sets the timestamp. Otherwise sets the date.
 * The source document has the following form:
 * $currentDate: { lastModified: true, cancellation: { date: { $type: 'timestamp' }}
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination document,
 * @param {Object}          the source document,
 * @returns {Object}        returns the modified document,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax, no-param-reassign */
function _applyTime(obj, source) {
  let prop
    , subprop
    ;

  for (prop in source) {
    if ({}.hasOwnProperty.call(source, prop)) {
      [subprop] = _.keys(source[prop]);
      if (_.isObject(source[prop]) && subprop !== '$type') {
        if (!obj[prop]) {
          obj[prop] = {};
        }
        _applyTime(obj[prop], source[prop]);
      } else if (hasOwnProperty.call(source, prop)) {
        if (source[prop][subprop] === 'timestamp') {
          obj[prop] = Date.now();
        } else {
          obj[prop] = new Date().toISOString();
        }
      }
    }
  }
  return obj;
}
/* eslint-enable no-restricted-syntax, no-param-reassign */

/**
 * Updates this document.
 * (this function mutates the argument `doc`)
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the document to update,
 * @param {Object}          the 'fields' to be updated and their new values,
 * @returns {Object}        returns the modified document,
 * @throws {Object}         throws an error if the operator is unknown or not supported,
 * @since 0.0.0
 */
/* eslint-disable dot-notation */
function _updateThisDoc(doc, update) {
  const keys = _.keys(update);

  if (!keys[0].match(/^\$/)) {
    return _replace(doc, update);
  }

  switch (keys[0]) {
    // Field Operators:
    case '$inc':
      return _apply(doc, update['$inc'], '$inc');

    case '$mul':
      return _apply(doc, update['$mul'], '$mul');

    case '$rename':
      return _apply(doc, update['$rename'], '$rename');

    case '$set':
      return _apply(doc, update['$set'], '$set');

    case '$unset':
      return _apply(doc, update['$unset'], '$unset');

    case '$min':
      return _apply(doc, update['$min'], '$min');

    case '$max':
      return _apply(doc, update['$max'], '$max');

    case '$currentDate':
      return _applyTime(doc, update['$currentDate']);

    // Array Operators:
    case '$pop':
      return _apply(doc, update['$pop'], '$pop');

    case '$pullAll':
      return _apply(doc, update['$pullAll'], '$pullAll');

    case '$pull':
      return _pull(doc, update['$pull'], '$pull');

    case '$push':
      return _push(doc, update['$push'], '$push');

    /* istanbul ignore next */
    default:
      throw new Error(
        `The Update Operator "${keys[0]}" isn't supported!`,
      );
  }
}
/* eslint-enable dot-notation */

/**
 * Updates the requested document(s).
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6, arg7)
 * @private
 * @param {Object}          the db object,
 * @param {Object}          the messenger object,
 * @param {Boolean}         updates one or many documents,
 * @param {Object}          the query filter,
 * @param {Object}          the replacing document,
 * @param {Object}          the options,
 * @param {Function}        the function to call at the completion,
 * @returns {String}        -,
 * @since 0.0.0
 */
function _update(db, mess, many, query, update, options, callback) {
  if (!query || !update) {
    callback(null, []);
    return;
  }

  const sop    = Q.isHavingSpecialOperator(query)
      , docOut = []
      ;

  for (let i = 0; i < db.data.length; i++) {
    if (Q.isMatch(db.data[i], query, sop)) {
      _updateThisDoc(db.data[i], update);
      // Do not copy the references. Clone the object instead!
      docOut.push(_.extend({}, db.data[i]));
      if (!many) {
        break;
      }
    }
  }

  // Fire an event and execute the callback:
  if (mess) {
    mess.publish('update', docOut);
    mess.publish('change', docOut);
  } else if (!db._silent) {
    /* eslint-disable-next-line no-console */
    console.log('warning: the plugin @mobilabs/messenger isn\'t installed!');
  }
  callback(null, docOut);
}


// -- Public Static Methods ------------------------------------------------

const Update = {

  /**
   * Updates the requested document(s).
   *
   * @method (arg1, arg2, arg3, arg4, arg5, [arg6], [arg7])
   * @public
   * @param {Object}        the db object,
   * @param {Object}        the messenger object,
   * @param {Boolean}       updates one or many documents,
   * @param {Object}        the query filter,
   * @param {Object}        the replacing document,
   * @param {Object}        the options,
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  update(db, mess, many, ...args) {
    const [query, update, options, callback] = _getArgs(...args);

    return new Promise((resolve, reject) => {
      _update(db, mess, many, query, update, options, (err, resp) => {
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
export default Update;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
