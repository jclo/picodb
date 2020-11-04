/** ************************************************************************
 *
 * A micro subset of the Overslash library plus some extras.
 *
 * _.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _normalize                  normalizes from { 'a.b': 1 } to { a: { b: 1 }},
 *
 *
 * Public Static Methods:
 *  . isUndefined                 is a given variable undefined?,
 *  . isNull                      is a given value null?,
 *  . isBoolean                   is a given value a boolean?
 *  . isString                    is a given value a string?
 *  . isNumber                    is a given value a number?
 *  . isNaN                       is a given value NaN?
 *  . isOdd                       is a given value an odd number?
 *
 *  . isObject                    is a given variable an object?
 *  . isLiteralObject             Is a given variable a literal object?
 *  . isFunction                  is a given variable a function?
 *  . isArray                     is a given value an array?
 *  . isEmpty                     is a given array, string or object empty?
 *
 *  . clone                       clones a literal object or an array,
 *  . extend                      extends a given object with all the properties,
 *  . keys                        retrieves all the names of the object's,
 *  . forPropIn                   parses all the names of the object's,
 *
 *  . contains                    returns true if the array contains the passed-in value,
 *  . share                       returns the list of the elements in common,
 *
 *  . token                       returns a unique string pattern in base 36,
 *
 *  . normalize                   normalizes from { 'a.b': 1 } to { a: { b: 1 }},
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


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Normalizes an object from { 'a.b': 1 } to { a: { b: 1 }}.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the object,
 * @returns {Object}        returns the normalized object,
 * @since 0.0.0
 */
function _normalize(obj) {
  const nobj = {};
  Object.keys(obj).forEach((prop) => {
    if (prop.includes('.')) {
      const props = prop.split('.');
      let iobj = nobj;
      for (let i = 0; i < props.length; i++) {
        if (i < (props.length - 1)) {
          iobj[props[i]] = {};
          iobj = iobj[props[i]];
        } else if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          iobj[props[i]] = _normalize(obj[prop]);
        } else {
          iobj[props[i]] = obj[prop];
        }
      }
    } else if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
      nobj[prop] = _normalize(obj[prop]);
    } else {
      nobj[prop] = obj[prop];
    }
  });
  return nobj;
}


// -- Public Static Methods ------------------------------------------------

/* istanbul ignore next */
// This is just a copy paste of portions of the library '@mobilabs/overslash'.
// So, there is no need to test it.
const _ = {

  // --- Primitives types --------------------------------------------------

  /**
   * Is a given variable undefined?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isUndefined(obj) {
    return obj === undefined;
  },

  /**
   * Is a given value null?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isNull(obj) {
    return obj === null;
  },

  /**
   * Is a given value a boolean?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isBoolean(obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
  },

  /**
   * Is a given value a string?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  },

  /**
   * Is a given value a number?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
  },

  /**
   * Is a given value NaN?
   * (NaN is the only number which does not equal itself)
   * (copied from: http://underscorejs.org)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isNaN(obj) {
    return this.isNumber(obj) && obj !== +obj;
  },

  /**
   * Is a given value an odd number?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true (odd), false (even) or undefined (not a number),
   * @since 0.0.0
   */
  /* eslint-disable no-void */
  isOdd(obj) {
    const n = obj % 2;
    return obj === parseFloat(obj) ? !!n : void 0;
  },
  /* eslint-enable no-void */


  // --- Object types ------------------------------------------------------

  /**
   * Is a given variable an object?
   * (copied from: http://underscorejs.org)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isObject(obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
  },

  /**
   * Is a given variable a literal object?
   *
   * @method (arg1)
   * @private
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.3
   */
  isLiteralObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  /**
   * Is a given variable a function?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  },

  /**
   * Is a given value an array?
   * (Delegates to ECMA5's native Array.isArray.)
   * (copied from: http://underscorejs.org)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  /* istanbul ignore next */
  isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },

  /**
   * Is a given array, string or object empty?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  /* eslint-disable no-restricted-syntax, no-prototype-builtins */
  isEmpty(obj) {
    let key;
    if (obj === null) return true;
    if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
    // Check that the object has no enumerable own-properties.
    // If ECMAScript 5 support only: 'return Object.keys(obj).length === 0;'
    // Otherwise, parse all properties.
    for (key in obj) if (obj.hasOwnProperty(key)) return false;
    return true;
  },
  /* eslint-enable no-restricted-syntax, no-prototype-builtins */


  // --- Operations on Objects ---------------------------------------------

  /**
   * Clones a literal object or an array.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to clone,
   * @returns {Object}      returns the cloned object,
   * @since 0.0.0
   */
  /* eslint-disable no-void, no-restricted-syntax */
  clone(obj) {
    const clone = this.isArray(obj) ? [] : {};
    let prop;

    if (!this.isObject(obj)) return void 0;

    for (prop in obj) {
      if (this.isArray(obj[prop])) {
        clone[prop] = this.clone(obj[prop]);
      } else if (this.isObject(obj[prop])) {
        clone[prop] = this.extend(obj[prop]);
      } else {
        clone[prop] = obj[prop];
      }
    }
    return clone;
  },
  /* eslint-enable no-void, no-restricted-syntax */

  /**
   * Extends a given object with all the properties in passed-in object(s).
   * (copied from: http://underscorejs.org and added recursivity)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the objects to merge,
   * @returns {Object}      the resulting object,
   * @since 0.0.0
   */
  /* eslint-disable no-restricted-syntax, no-param-reassign, prefer-rest-params */
  extend(obj) {
    let source
      , prop
      ;

    if (!this.isObject(obj)) return obj;

    for (let i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (prop in source) {
        // if (!this.isArray(arguments[i][prop]) && this.isObject(arguments[i][prop])) {
        if (this.isLiteralObject(arguments[i][prop])) {
          obj[prop] = obj[prop] !== undefined ? obj[prop] : {};
          this.extend(obj[prop], arguments[i][prop]);
        } /* istanbul ignore next */ else if (hasOwnProperty.call(source, prop)) {
          obj[prop] = this.isArray(source[prop])
            ? this.clone(source[prop])
            : source[prop];
        }
      }
    }
    return obj;
  },
  /* eslint-enable no-restricted-syntax, no-param-reassign, prefer-rest-params */

  /**
   * Retrieves all the names of the object's own enumerable properties.
   * (ECMAScript 5 only).
   *
   * @method (arg1)
   * @public
   * @param {Object}      the input object,
   * @returns {Array}     returns the names of the keys,
   * @since 0.0.0
   */
  keys(obj) {
    return Object.keys(obj);
  },

  /**
   * Parses all the names of the object's own enumerable properties.
   * (replace for...in statement).
   * (ECMAScript 5 only).
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}      the input object,
   * @returns {Array}     returns the names of the keys,
   * @since 0.0.0
   */
  forPropIn(obj, callback) {
    // var keys = overslash.keys(obj);
    this.keys(obj).forEach((key) => {
      /* istanbul ignore next */
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key);
      }
    });
  },


  // -- Operations on Arrays -----------------------------------------------

  /**
   * Returns true if the array contains the passed-in value.
   *
   * Note:
   * The array must be a first-level only array.
   *
   * @method(arg1, arg2)
   * @public
   * @param {Object}        the array,
   * @param {Number/string} the passed-in value,
   * @returns {Boolean}     returns true if the array contains the value,
   * @since 0.0.0
   */
  contains(list, value) {
    return list.indexOf(value) !== -1;
  },

  /**
   * Returns the list of the elements the passed-in arrays have in common.
   *
   * @method (arg)
   * @public
   * @param {Array}       n arrays to compare,
   * @returns {Array}     returns the list of elements in common or empty,
   * @since 0.0.0
   */
  share(array) {
    const result = [];
    let item
      , i
      , j
      ;

    for (i = 0; i < array.length; i++) {
      item = array[i];
      if (!this.contains(result, item)) {
        for (j = 1; j < arguments.length; j++) {
          /* eslint-disable-next-line prefer-rest-params */
          if (!this.contains(arguments[j], item)) {
            break;
          }
        }
        if (j === arguments.length) {
          result.push(item);
        }
      }
    }
    return result;
  },


  // -- Miscellaneous ------------------------------------------------------

  /**
   * Returns a unique string pattern in base 36 ([0-9a-z]).
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns a random string,
   * @since 0.0.0
   */
  token() {
    return Math.random().toString(36).substr(2);
  },


  // -- Extra --------------------------------------------------------------

  /**
   * Normalizes an object from { 'a.b': 1 } to { a: { b: 1 }}.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object,
   * @returns {Object}      returns the normalized object,
   * @since 0.0.0
   */
  normalize(obj) {
    return _normalize(obj);
  },
};


// -- Export
export default _;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
