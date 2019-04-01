/** **************************************************************************
 *
 * A micro subset of the Overslash library.
 *
 * overslash.js is just a literal object that contains a set of static methods. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 * Public Functions:
 *  . isUndefined            is a given variable undefined?,
 *  . isNull                 is a given value null?,
 *  . isBoolean              is a given value a boolean?
 *  . isString               is a given value a string?
 *  . isNumber               is a given value a number?
 *  . isNaN                  is a given value NaN?
 *  . isOdd                  is a given value an odd number?
 *  . isObject               is a given variable an object?
 *  . isFunction             is a given variable a function?
 *  . isArray                is a given value an array?
 *  . isMath                 is a given value a Math object?
 *  . isDate                 is a given value a Date?
 *  . isEmpty                is a given array, string or object empty?
 *  . clone                  clones a literal object or an array,
 *  . extend                 extends a given object with all the properties in passed-in obj,
 *  . keys                   retrieves all the names of the object's own enumerable properties,
 *  . forPropIn              Parses all the names of the object's own enumerable properties,
 *  . contains               returns true if the array contains the passed-in value,
 *  . share                  returns the list of the elements the passed-in arrays have in common,
 *  . token                  returns a unique string pattern in base 36 ([0-9a-z]),
 *
 *
 * @namespace    _
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************ */
/* eslint-disable one-var, semi-style */
/* eslint-disable no-void, no-restricted-syntax, no-prototype-builtins,
  no-param-reassign */

'use strict';

/* istanbul ignore next */
_ = {

  // --- Primitives types ----------------------------------------------------

  /**
   * Is a given variable undefined?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isUndefined: function(obj) {
    return obj === undefined;
  },

  /**
   * Is a given value null?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isNull: function(obj) {
    return obj === null;
  },

  /**
   * Is a given value a boolean?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isBoolean: function(obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
  },

  /**
   * Is a given value a string?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isString: function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  },

  /**
   * Is a given value a number?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isNumber: function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
  },

  /**
   * Is a given value NaN?
   * (NaN is the only number which does not equal itself)
   * (copied from: http://underscorejs.org)
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isNaN: function(obj) {
    return this.isNumber(obj) && obj !== +obj;
  },

  /**
   * Is a given value an odd number?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true (odd), false (even) or undefined (not a number),
   * @since 0.0.0
   */
  isOdd: function(obj) {
    var n = obj % 2;
    return obj === parseFloat(obj) ? !!n : void 0;
  },


  // --- Object types --------------------------------------------------------

  /**
   * Is a given variable an object?
   * (copied from: http://underscorejs.org)
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isObject: function(obj) {
    var type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
  },

  /**
   * Is a given variable a function?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isFunction: function(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  },

  /**
   * Is a given value an array?
   * (Delegates to ECMA5's native Array.isArray.)
   * (copied from: http://underscorejs.org)
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isArray: Array.isArray || /* istanbul ignore next */ function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },

  /**
   * Is a given value a Math object?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isMath: /* istanbul ignore next */ function(obj) {
    return Object.prototype.toString.call(obj) === '[object Math]';
  },

  /**
   * Is a given value a Date?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isDate: function(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  },

  /**
   * Is a given array, string or object empty?
   *
   * @function (arg1)
   * @public
   * @param {Object}      the object to test,
   * @returns {Boolean}   returns true or false,
   * @since 0.0.0
   */
  isEmpty: function(obj) {
    var key;
    if (obj === null) return true;
    if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
    // Check that the object has no enumerable own-properties.
    // If ECMAScript 5 support only: 'return Object.keys(obj).length === 0;'
    // Otherwise, parse all properties.
    for (key in obj) if (obj.hasOwnProperty(key)) return false;
    return true;
  },


  // --- Operations on Objects (optional) ------------------------------------

  /**
   * Clones a literal object or an array.
   *
   * @function(arg1)
   * @public
   * @param {Object}    the objec to clone,
   * @returns {Object}  returns the cloned object,
   * @since 0.0.0
   */
  clone: function(obj) {
    var clone = this.isArray(obj) ? [] : {}
      , prop
      ;

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

  /**
   * Extends a given object with all the properties in passed-in object(s).
   * (copied from: http://underscorejs.org and added recursivity)
   *
   * @function (arg1)
   * @public
   * @param {Object}      the objects to merge,
   * @returns {Object}    the resulting object,
   * since 0.0.0
   */
  extend: function(obj) {
    var source
      , prop
      , i
      ;

    if (!this.isObject(obj)) return obj;

    for (i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (!this.isArray(arguments[i][prop]) && this.isObject(arguments[i][prop])) {
          obj[prop] = obj[prop] !== undefined ? obj[prop] : {};
          this.extend(obj[prop], arguments[i][prop]);
        } else if (hasOwnProperty.call(source, prop)) {
          obj[prop] = this.isArray(source[prop]) ? this.clone(source[prop]) : source[prop];
        }
      }
    }
    return obj;
  },

  /**
   * Retrieves all the names of the object's own enumerable properties.
   * (ECMAScript 5 only).
   *
   * @function (arg1)
   * @public
   * @param {Object}      the input object,
   * @returns {Array}     returns the names of the keys,
   * @since 0.0.0
   */
  keys: function(obj) {
    return Object.keys(obj);
  },

  /**
   * Parses all the names of the object's own enumerable properties.
   * (replace for...in statement).
   * (ECMAScript 5 only).
   *
   * @function (arg1 arg2)
   * @public
   * @param {Object}      the input object,
   * @returns {Array}     returns the names of the keys,
   * @since 0.0.0
   */
  forPropIn: function(obj, callback) {
    // var keys = _.keys(obj);
    this.keys(obj).forEach(function(key) {
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key);
      }
    });
  },


  // --- Operations on Arrays (optional) -------------------------------------

  /**
   * Returns true if the array contains the passed-in value.
   *
   * Note:
   * The array must be a first-level only array.
   *
   * @function(arg1, arg2)
   * @public
   * @param {Object}    the array,
   * @param {Number/string} the passed-in value,
   * @returns {Boolean} returns true if the array contains the value,
   * @since 0.0.0
   */
  contains: function(list, value) {
    // jreturn list.indexOf(value) === -1 ? false : true;
    return list.indexOf(value) !== -1;
  },

  /**
   * Returns the list of the elements the passed-in arrays have in common.
   *
   * @function (arg)
   * @public
   * @param {Array}       n arrays to compare,
   * @returns {Array}     returns the list of elements in common or empty,
   * @since 0.1
   */
  share: function(array) {
    var result = []
      , item
      , i
      , j
      ;

    for (i = 0; i < array.length; i++) {
      item = array[i];
      if (!this.contains(result, item)) {
        for (j = 1; j < arguments.length; j++) {
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


  // --- Operations on Functions (optional) ----------------------------------


  // --- Utility (optional) --------------------------------------------------

  /**
   * Returns a unique string pattern in base 36 ([0-9a-z]).
   *
   * @function ()
   * @public
   * @param {}            -,
   * @returns {String}    returns a random string,
   * @since 0.0.0
   */
  token: function() {
    return Math.random().toString(36).substr(2);
  }
};

/* eslint-enable no-void, no-restricted-syntax, no-prototype-builtins,
  no-param-reassign */

/* eslint-enable one-var, semi-style */
