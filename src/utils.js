  /**
   * utils.js is an embedded library providing useful functional
   * programming helpers.
   *
   * @namespace _
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.1
   * @version   -
   */

  // Initialize the library.
  var _ = {};

  /**
   * Functions:
   *
   *  . isUndefined       is a given variable undefined?
   *  . isNull            is a given value null?
   *  . isBoolean         is a given value a boolean?
   *  . isString          is a given value a string?
   *  . isNumber          is a given value a number?
   *  . isNaN             is a given value NaN?
   *  . isOdd             is a given value an odd number?
   *  . isObject          is a given variable an object?
   *  . isMath            is a given value a Math object?
   *  . isDate            is a given value a Date?
   *  . isArray           is a given value an array?
   *  . isFunction        is a given variable a function?
   *  . isEmpty           is a given array, string or object empty?
   *  . contains          returns true if the value is present in the list,
   *  . clone             clones an object (array or object literal),
   *  . keys              retrieves all the names of the object's own enumerable properties,
   *  . extend            extends a given object with in passed-in object(s),
   *  . token             returns a unique 16 chars string token,
   */
  /* istanbul ignore next */
  _ = {

    /**
     * Is a given variable undefined?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
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
     * @returns {Boolean}   true or false,
     * since 0.1
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
     * @returns {Boolean}   true or false,
     * since 0.1
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
     * @returns {Boolean}   true or false,
     * since 0.1
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
     * @returns {Boolean}   true or false,
     * since 0.1
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
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isNaN: function(obj) {
      return _.isNumber(obj) && obj !== +obj;
    },

    /**
     * Is a given value an odd number?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true (odd), false (even) or undefined (not a number),
     * since 0.1
     */
    isOdd: function(obj) {
      var n = obj % 2;
      return obj === parseFloat(obj) ? !!n : void 0;
    },

    /**
     * Is a given variable an object?
     * (copied from: http://underscorejs.org)
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isObject: function(obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    },

    /**
     * Is a given value a Math object?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isMath: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Math]';
    },

    /**
     * Is a given value a Date?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isDate: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Date]';
    },

    /**
     * Is a given value an array?
     * (Delegates to ECMA5's native Array.isArray.)
     * (copied from: http://underscorejs.org)
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isArray: Array.isArray || function(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },

    /**
     * Is a given variable a function?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    },

    /**
     * Is a given array, string or object empty?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   true or false,
     * since 0.1
     */
    isEmpty: function(obj) {
      if (obj === null) return true;
      if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
      // Check that the object has no enumerable own-properties.
      // If ECMAScript 5 support only: 'return Object.keys(obj).length === 0;'
      // Otherwise, parse all properties.
      for (var key in obj) if (obj.hasOwnProperty(key)) return false;
      return true;
    },

    /**
     * Returns true if the value is present in the list.
     *
     * @function (arg1)
     * @public
     * @param {Array}       the list,
     * @param {}            the value in the list,
     * @returns {Boolean}   returns true if the value is present, false otherwise,
     * @since 0.1
     */
    contains: function(list, value) {
      return list.indexOf(value) === -1 ? false : true;
    },

    /**
     * Clones an object (array or object literal).
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to clone,
     * @returns {Object}    the cloned object,
     * since 0.1
     */
    clone: function(obj) {
      var clone, prop;

      if (!_.isObject(obj))
        return null;

      if (_.isArray(obj)) clone = []; else clone = {};
      for (prop in obj)
        if (_.isObject(obj[prop]))
          clone[prop] = _.clone(obj[prop]);
        else
        clone[prop] = obj[prop];

      return clone;
    },

    /**
     * Retrieves all the names of the object's own enumerable properties.
     * (ECMAScript 5 only).
     *
     * @function (arg1)
     * @public
     * @param {Object}      the input object,
     * @returns {Array}     the names of the keys,
     * @since 0.1
     */
    keys: function(obj) {
      return Object.keys(obj);
    },

    /**
     * Extends a given object with all the properties in passed-in object(s).
     * (copied from: http://underscorejs.org and added recursivity)
     *
     * @function (arg1)
     * @public
     * @param {Object}      the objects to merge,
     * @returns {Object}    the resulting object,
     * since 0.1
     */
    extend: function(obj) {
      if (!_.isObject(obj)) return obj;
      var source, prop;
      for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
          // Check that 'prop' value is not an object.
          if (_.isObject(arguments[i][prop])) {
            // It is an object. Apply recursivity.
            if (obj[prop] === undefined) { obj[prop] = {}; }
            _.extend(obj[prop], arguments[i][prop]);
          } else {
            if (hasOwnProperty.call(source, prop)) {
              obj[prop] = source[prop];
            }
          }
        }
      }
      return obj;
    },

    /**
     * Returns a unique string pattern in base 36 ([0-9a-z])
     *
     * @function ()
     * @public
     * @param {}            -,
     * @returns {String}    returns a random string,
     * @since 0.1
     */
    token: function() {
      return Math.random().toString(36).substr(2);
    }

  };
