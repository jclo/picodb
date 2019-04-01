/** ****************************************************************************
 * PicoDB v0.12.0beta1
 *
 * A tiny in-memory database (MongoDB like) that stores JSON documents.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2019 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * ************************************************************************** */
// Based on UMDLib template v0.8.3
// ESLint declarations
/* global define */
/* eslint strict: ["error", "function"] */
/* eslint-disable one-var, semi-style */
(function(root, factory) {
  'use strict';

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([''], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
  } else {
    // Browser globals.
    /* eslint-disable no-param-reassign */
    root.PicoDB = factory(root);
    /* eslint-enable no-param-reassign */
  }
}(this, function(root) {
  'use strict';

  // These are the global variables accessible everywhere inside this module.
  // 'PicoDB' is the variable that defines this library and it is the only
  // variable accessible outside this module.
  // '_' is an object that gives access to an embedded small utility library.
  // And, 'P' is an object that exports public methods from the IIFE module
  // in which they are defined.
  var PicoDB
    , P = {}
    , _
    ;

  /* eslint-enable one-var, semi-style */

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


  /** **************************************************************************
   *
   * An embedded library that implements functions to manage custom events.
   *
   * event.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _isValidEvent               checks if the event and the event handler are valid,
   *
   *
   * Public Static Methods:
   *  . setEventListenerList        returns the event list template,
   *  . fire                        fires the given event,
   *  . addEventListener            adds an Event Listener,
   *  . addOneTimeEventListener     adds an Event Listener that could be fired once,
   *  . removeEventListener         removes an Event Listener from the event list,
   *
   *
   * @namespace    P.Event
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path

    // -- Local modules

    // -- Local constants

    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Checks if the event and the event handler are valid.
     *
     * @function(arg1, arg2, arg3)
     * @private
     * @param {Object}      the event list,
     * @param {String}      the event type,
     * @param {Function}    the event handler,
     * @returns {Boolean}   returns true if the event and the handler are valid,
     *                      otherwise false,
     * @since 0.0.0
     */
    function _isValidEvent(event, type, listener) {
      // if (event.hasOwnProperty(type) && typeof listener === 'function')
      if ({}.hasOwnProperty.call(event, type) && typeof listener === 'function') {
        return true;
      }
      return false;
    }


    // -- Public Static Methods ------------------------------------------------

    P.Event = {

      /**
       * Returns the event list template.
       *
       * @method()
       * @public
       * @param {}          -,
       * @returns {Object}  returns the event list,
       * @since 0.0.0
       */
      setEventListenerList: function() {
        return {
          // Event when a document is added,
          insert: {
            listeners: [],
            listenersOnce: []
          },
          // Event when a document is updated,
          update: {
            listeners: [],
            listenersOnce: []
          },
          // Event when a document is removed,
          delete: {
            listeners: [],
            listenersOnce: []
          },
          // Event when the database is modified,
          change: {
            listeners: [],
            listenersOnce: []
          }
        };
      },

      /**
       * Fires the given event.
       *
       * @method(arg1, arg2, arg3)
       * @public
       * @param {Object}    the event list,
       * @param {String}    the name of the event,
       * @param {Object}    the payload,
       * @returns {}        -,
       * @since 0.0.0
       */
      fire: function(eventList, event, payload) {
        var i
          ;

        // is this event a valid one?
        /* istanbul ignore next */
        if (!eventList[event]) {
          return;
        }

        // Fire listeners:
        for (i = 0; i < eventList[event].listeners.length; i++) {
          eventList[event].listeners[i](payload);
        }

        // Fire listeners once:
        for (i = 0; i < eventList[event].listenersOnce.length; i++) {
          eventList[event].listenersOnce[i](payload);
        }
        // Remove the event handlers:
        eventList[event].listenersOnce.splice(0, eventList[event].listenersOnce.length);
      },

      /**
       * Adds an Event Listener.
       *
       * @method(arg1, arg2, arg3)
       * @public
       * @param {Object}    the event list,
       * @param {String}    the type of event,
       * @param {Function}  the event handler,
       * @returns {}        -,
       * @since 0.0.0
       */
      addEventListener: function(eventList, type, listener) {
        // Is type an event and listener a function?
        if (!_isValidEvent(eventList, type, listener)) {
          return;
        }

        // Save the listener:
        eventList[type].listeners.push(listener);
      },

      /**
       * Adds an Event Listener that could be fired once.
       *
       * @method(arg1, arg2, arg3)
       * @public
       * @param {Object}    the event list,
       * @param {String}    the type of event,
       * @param {Function}  the event handler,
       * @returns {}        -,
       * @since 0.0.0
       */
      addOneTimeEventListener: function(eventList, type, listener) {
        // Is type an event and listener a function?
        if (!_isValidEvent(eventList, type, listener)) {
          return;
        }

        // Save the listener:
        eventList[type].listenersOnce.push(listener);
      },

      /**
       * Removes an Event Listener from the event list.
       *
       * @method(arg1, arg2, arg3)
       * @public
       * @param {Object}    the event list,
       * @param {String}    the type of event,
       * @param {Function}  the event handler,
       * @returns {}        -,
       * @since 0.0.0
       */
      removeEventListener: function(eventList, type, listener) {
        var index
          ;

        // Is type an event and listener a function?
        if (!_isValidEvent(eventList, type, listener)) {
          return;
        }

        // Remove the listener:
        index = eventList[type].listeners.indexOf(listener);
        if (index >= 0) {
          eventList[type].listeners.splice(index, 1);
        }
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * An embedded library providing functions to make Geospatial queries.
   *
   * geo.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _lawOfHaversines            returns the distance between two points on earth,
   *  . _lawOfCosines               returns the distance between two points on earth,
   *  . _equirectangularProjection  returns the distance between two points on earth,
   *  . _getDistanceOnEarth         returns the distance between two points on earth
   *  . _isPointInPolygon2          checks if the point is inside the polygon,
   *  . _isPointInPolygon           checks if the point is inside the polygon,
   *  . _isGeometryInsideGeoObject  checks if the geo. is inside a Multi. or Polygon,
   *  . _toPolygonCoordinates       embeds Point, LineString and Polygon,
   *  . _box                        checks if the Geo matches the $geoWithin $box,
   *  . _polygon                    checks if the Geo matches the $geoWithin $polygon,
   *  . _center                     checks if the Geo matches the $geoWithin $center,
   *  . _centerSphere               checks if the Geo matches the $geoWithin $centerSphere,
   *  . _within                     checks if the Geo matches the $geoWithin $geometry,
   *  . _interLineString            checks if the Geo Line intersects the $geoIntersects polygon,
   *  . _interPolygon               checks if the Geo Polygon intersects the $geoIntersects polygon,
   *  . _intersects                 checks if the Geo object intersects the $geoIntersects polygon.
   *  . _isPointNear                checks if the Geo Point matches the condition of distance,
   *  . _geoNear                    checks if the Geo object matches the $near query,
   *  . _geoWithin                  checks if the Geo object matches the $geoWithin query,
   *  . _geoIntersects              checks if the Geo object matches the $geoIntersects query,
   *  . _near                       checks if the Geo object matches the $near query.
   *  . _query                      decodes the GeoSpatial query.
   *
   *
   * Public Static Methods:
   *  . lawOfHaversines             returns the distance between two points on Earth,
   *  . lawOfCosines                returns the distance between two points on Earth,
   *  . equirectangularProjection   returns the distance between two points on Earth,
   *  . query                       processes the GeoSpatial query,
   *
   *
   * @namespace    P.Geo
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P, _ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Returns the distance between two points on Earth using the law of haversines.
     *
     * `haversine` formula to calculate the great-circle distance between
     * two points:
     *
     *   a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
     *   c = 2 ⋅ atan2( √a, √(1−a) )
     *   d = R ⋅ c
     *
     *   where φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination point,
     * @param {Object}      the source point,
     * @returns {Boolean}   returns the distance between the two points in meters,
     * @since 0.0.0
     */
    function _lawOfHaversines(obj, source) {
      var λ1 = source.coordinates[0]
        , λ2 = obj.coordinates[0]
        , Δλ = (λ2 - λ1) * (Math.PI / 180)
        , φ1 = source.coordinates[1] * (Math.PI / 180)
        , φ2 = obj.coordinates[1] * (Math.PI / 180)
        , Δφ = (φ2 - φ1)
        , R  = 6371e3
        , a
        , c
        ;

      a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
          + Math.cos(φ1) * Math.cos(φ2)
          * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    }

    /**
     * Returns the distance between two points on Earth using the law of cosines.
     *
     * Formula:
     *   d = acos( sin φ1 ⋅ sin φ2 + cos φ1 ⋅ cos φ2 ⋅ cos Δλ ) ⋅ R
     *
     * Nota:
     * This formula is slightly faster than the law of haversines while offering
     * a similar accuracy on distances greater than a few dozen meters.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination point,
     * @param {Object}      the source point,
     * @returns {Boolean}   returns the distance between the two points in meters,
     * @since 0.0.0
     */
    function _lawOfCosines(obj, source) {
      var λ1 = source.coordinates[0]
        , λ2 = obj.coordinates[0]
        , Δλ = (λ2 - λ1) * (Math.PI / 180)
        , φ1 = source.coordinates[1] * (Math.PI / 180)
        , φ2 = obj.coordinates[1] * (Math.PI / 180)
        , R  = 6371e3
        ;

      return Math.acos(Math.sin(φ1) * Math.sin(φ2)
        + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
    }

    /**
     * Returns the distance between two points on Earth using the Equirectangular projection.
     *
     * Formula:
     *   y = Δφ
     *   d = R ⋅ √x² + y²
     *
     * Nota:
     * This formula is faster than the law of cosines and the law of the haversines
     * but is less accurante on distances greater than a few hundred kilometers.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination point,
     * @param {Object}      the source point,
     * @returns {Boolean}   returns the distance between the two points in meters,
     * @since 0.0.0
     */
    function _equirectangularProjection(obj, source) {
      var λ1 = source.coordinates[0] * (Math.PI / 180)
        , λ2 = obj.coordinates[0] * (Math.PI / 180)
        , φ1 = source.coordinates[1] * (Math.PI / 180)
        , φ2 = obj.coordinates[1] * (Math.PI / 180)
        , R  = 6371e3
        , x
        , y
        ;

      x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2);
      y = φ2 - φ1;
      return Math.sqrt(x * x + y * y) * R;
    }

    /**
     * Returns the distance between two points on Earth.
     *
     * Nota:
     * This function can rely on three algorithms to compute the distance from
     * two points on Earth: the law of haversines, the law of cosines and
     * the Equirectangular projection. The law of cosines is the currently used.
     *
     * These alogithms are taken from here:
     *   . http://www.movable-type.co.uk/scripts/latlong.html
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination point,
     * @param {Object}      the source point,
     * @returns {Boolean}   returns the distance between the two points in meters,
     * @since 0.0.0
     */
    function _getDistanceOnEarth(obj, source) {
      return _lawOfCosines(obj, source);
    }

    /**
     * Checks if the point is inside the polygon.
     *
     * The algorithm, determining the inclusion of a point P in a 2D planar polygon,
     * is based on the crossing number method.
     * This method counts the number of times a ray starting from the point P
     * crosses the polygon boundary edges. The point is outside when this
     * 'crossing number' is even; otherwise, when it is odd, the point is inside.
     * This method is sometimes referred to as the 'even-odd' test.
     * See here: http://geomalgorithms.com/a03-_inclusion.html#wn_PinPolygon()
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the coordinates of the point,
     * @param {Object}      the coordinates of the polygon,
     * @returns {Boolean}   returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.1
     */
    /* eslint-disable-next-line */
    /* istanbul ignore next */ function _isPointInPolygon2(point, polygon) {
      var intersections
        , vertex1
        , vertex2
        , xinter
        , i
        ;

      // Check if the point is on a vertex:
      for (i = 0; i < polygon.length; i++) {
        if (point[0] === polygon[i][0] && point[1] === polygon[i][1]) {
          return 'vertex';
        }
      }

      // Check if the point is inside the polygon or on the boundary:
      intersections = 0;

      for (i = 1; i < polygon.length; i++) {
        vertex1 = polygon[i - 1];
        vertex2 = polygon[i];

        // Check if the point is on an horizontal boundary:
        if (vertex1[1] === vertex2[1] && vertex1[1] === point[1]
            && point[0] > Math.min(vertex1[0], vertex2[0])
            && point[0] < Math.max(vertex1[0], vertex2[0])) {
          return 'boundary';
        }

        if (point[1] > Math.min(vertex1[1], vertex2[1])
            && point[1] <= Math.max(vertex1[1], vertex2[1])
            && point[0] <= Math.max(vertex1[0], vertex2[0])
            && vertex1[1] !== vertex2[1]) {
          /* eslint-disable-next-line */
          xinter = (point[1] - vertex1[1]) * (vertex2[0] - vertex1[0]) / (vertex2[1] - vertex1[1]) + (vertex1[0]);
          // Check if the point is on a boundary other than the horizontal one:
          if (xinter === point[0]) {
            return 'boundary';
          }

          if (vertex1[0] === vertex2[0] || point[0] <= xinter) {
            intersections += 1;
          }
        }
      }
      return intersections % 2 !== 0 ? 'inside' : 'outside';
    }

    /**
     * Checks if the point is inside the polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the coordinates of the point,
     * @param {Object}      the coordinates of the polygon,
     * @returns {Boolean}   returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.0
     */
    function _isPointInPolygon(point, polygon) {
      var cn = 0
        , vt
        , i
        ;

      for (i = 0; i < polygon.length - 1; i++) {
        if (((polygon[i][1] <= point[1]) && (polygon[i + 1][1] > point[1]))
            || ((polygon[i][1] > point[1]) && (polygon[i + 1][1] <= point[1]))) {
          // compute  the actual edge-ray intersect x-coordinate:
          vt = (point[1] - polygon[i][1]) / (polygon[i + 1][1] - polygon[i][1]);
          if (point[0] < polygon[i][0] + vt * (polygon[i + 1][0] - polygon[i][0])) {
            cn += 1;
          }
        }
      }
      return cn % 2 !== 0;
    }

    /**
     * Checks if the GeoJSON geometry is inside a Multipolygon or Polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Array}       the GeoJSON geometry,
     * @param {Object}      the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}   returns true if the point is inside the Multipolygon/polygon,
     *                      false otherwise,
     @ @throws {Object}     throws an error if the type isn't 'Multipolygon' or 'Polygon',
     * @since 0.0.0
     */
    function _isGeometryInsideGeoObject(obj, source) {
      var breakloop
        , i
        , j
        , k
        , l
        ;

      switch (source.type) {
        // The point is considered as inside a Multipolygon if it inside of
        // one ring of one polygon.
        case 'MultiPolygon':
          for (i = 0; i < obj.length; i++) {
            for (j = 0; j < obj[i].length; j++) {
              for (k = 0; k < source.coordinates.length; k++) {
                breakloop = false;
                for (l = 0; l < source.coordinates[k].length; l++) {
                  if (_isPointInPolygon(obj[i][j], source.coordinates[k][l])) {
                    breakloop = true;
                    break;
                  }
                }
                if (breakloop) {
                  break;
                }
              }
              if (!breakloop) {
                return false;
              }
            }
          }
          return true;

        // The point is considered as inside a Polygon if it inside of
        // one ring of the polygon.
        case 'Polygon':
          for (i = 0; i < obj.length; i++) {
            for (j = 0; j < obj[i].length; j++) {
              breakloop = false;
              for (k = 0; k < source.coordinates.length; k++) {
                if (_isPointInPolygon(obj[i][j], source.coordinates[k])) {
                  breakloop = true;
                  break;
                }
              }
              if (!breakloop) {
                return false;
              }
            }
          }
          return true;

        /* istanbul ignore next */
        default:
          throw new Error('Geo._within: the GeoSpatial $geoWihin operator with a $geometry.type "' + source.type + '" is unknown!');
      }
    }

    /**
     * Embeds Point, LineString and Polygon coordinates inside a 'Polygon' like coordinate array.
     *
     * @function (arg1)
     * @private
     * @param {Object}      the GeoJSON object,
     * @returns {Array}     returns the embbedded coordinates,
     * @since 0.0.0
     */
    function _toPolygonCoordinates(obj) {
      switch (obj.type) {
        case 'Point':
          return [[obj.coordinates]];
        case 'LineString':
          return [obj.coordinates];
        case 'Polygon':
          return obj.coordinates;
        case 'MultiPoint':
          return [obj.coordinates];
        case 'MultiLineString':
          return obj.coordinates;

        /* istanbul ignore next */
        default:
          throw new Error('Geo._toPolygonCoordinates: the GeoJSON type "' + obj.type + '" is not supported!');
      }
    }

    /**
     * Checks if the GeoJSON object matches the $geoWithin $box query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $geoWithin/$box query,
     * @returns {Boolean}   returns true if the point is inside the box, false otherwise,
     * @since 0.0.0
     */
    function _box(obj, box) {
      var c
        , p
        ;

      c = [[
        [box[0][0], box[0][1]],
        [box[1][0], box[0][1]],
        [box[1][0], box[1][1]],
        [box[0][0], box[1][1]]
      ]];

      p = {
        type: 'Polygon',
        coordinates: c
      };

      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), p);
    }

    /**
     * Checks if the GeoJSON object matches the $geoWithin $polygon query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $geoWithin/$polygon query,
     * @returns {Boolean}   returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.0
     */
    function _polygon(obj, polygon) {
      var p
        ;

      // The polygon must be closed (last point === first point).
      p = {
        type: 'Polygon',
        coordinates: [polygon, [polygon[0][0], polygon[0][1]]]
      };

      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), p);
    }

    /**
     * Checks if the GeoJSON object matches the $geoWithin $center query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}   returns true if the point is inside the circle, false otherwise,
     * @since 0.0.0
     */
    function _center(obj, center) {
      var d
        ;

      /* eslint-disable-next-line */
      d = Math.sqrt(Math.pow((center[0][0] - obj.coordinates[0]), 2) + Math.pow((center[0][1] - obj.coordinates[1]), 2));
      return d < center[1];
    }

    /**
     * Checks if the GeoJSON object matches the $geoWithin $centerSphere query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}   returns true if the point is inside the sphere, false otherwise,
     * @since 0.0.0
     */
    function _centerSphere(obj, centerSphere) {
      var d
        ;

      /* eslint-disable-next-line */
      d = Math.sqrt(Math.pow((centerSphere[0][0] - obj.coordinates[0]), 2) + Math.pow((centerSphere[0][1] - obj.coordinates[1]), 2));
      return d < (centerSphere[1] / Math.PI * 180);
    }

    /**
     * Checks if the GeoJSON object matches the $geoWithin $geometry query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}   returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.0
     */
    function _within(obj, source) {
      switch (obj.type) {
        case 'Point':
          return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

        case 'LineString':
          return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

        case 'Polygon':
          return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

        case 'MultiPoint':
          return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

        case 'MultiLineString':
          return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

        /* istanbul ignore next */
        case 'MultiPolygon':
          return false;

        /* istanbul ignore next */
        case 'GeometryCollection':
          return false;

        /* istanbul ignore next */
        default:
          return false;
      }
    }

    /**
     * Checks if the GeoJSON type LineString intersects the $geoIntersects polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @since 0.0.0
     */
    function _interLineString(obj, source) {
      var inside
        , outside
        , breakloop
        , i
        , j
        ;

      // It matches if one point of the LineString, at least, is inside the polygon
      // and one point, at least, is outside the polygon.
      for (i = 0; i < obj.coordinates.length; i++) {
        for (j = 0; j < source.coordinates.length; j++) {
          breakloop = false;
          if (_isPointInPolygon(obj.coordinates[i], source.coordinates[j])) {
            inside = true;
            breakloop = true;
            // Abort as soon as we have found one point inside and one point ouside!
            if (inside && outside) {
              return true;
            }
            break;
          }
        }
        if (!breakloop) {
          outside = true;
          if (inside && outside) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * Checks if the GeoJSON type Polygon intersects the $geoIntersects polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @since 0.0.1
     */
    function _interPolygon(obj, source) {
      var inside
        , outside
        , breakloop
        , i
        , j
        , k
        ;

      for (i = 0; i < obj.coordinates.length; i++) {
        for (j = 0; j < obj.coordinates[i].length; j++) {
          for (k = 0; k < source.coordinates.length; k++) {
            breakloop = false;
            if (_isPointInPolygon(obj.coordinates[i][j], source.coordinates[k])) {
              inside = true;
              breakloop = true;
              // Abort as soon as we have found one point inside and one point ouside!
              if (inside && outside) {
                return true;
              }
              break;
            }
          }
          if (!breakloop) {
            outside = true;
            if (inside && outside) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /**
     * Checks if the GeoJSON object intersects the $geoIntersects polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @since 0.0.0
     */
    function _intersects(obj, source) {
      switch (obj.type) {
        // Point can't intersect a polygon.
        /* istanbul ignore next */
        case 'Point':
          return false;

        // LineString could intersect a polygon.
        case 'LineString':
          return _interLineString(obj, source);

        // Polygon could intersect a polygon.
        case 'Polygon':
          return _interPolygon(obj, source);

        // MultiPoint can't intersect a polygon.
        /* istanbul ignore next */
        case 'MultiPoint':
          return false;

        // MultiLineString could intersect a polygon.
        /* istanbul ignore next */
        case 'MultiLineString':
          return false;

        // MultiPolygon could intersect a polygon.
        /* istanbul ignore next */
        case 'MultiPolygon':
          return false;

        // ???
        /* istanbul ignore next */
        case 'GeometryCollection':
          return false;

        /* istanbul ignore next */
        default:
          return false;
      }
    }

    /**
     * Checks if the GeoJSON Point matches the condition of distance from the central point.
     *
     * @function (arg1, arg2, arg3, arg4)
     * @private
     * @param {Object}      the GeoJSON Point,
     * @param {Object}      the GeoSpatial $near query,
     * @param {Number}      the minimal distance from the central point in meters,
     * @param {Number}      the maximal distance from the central point in meters,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @since 0.0.0
     */
    function _isPointNear(obj, source, max, min) {
      var d
        ;

      // Always true is max and min are not defined!
      if (max === undefined && min === undefined) {
        return true;
      }

      // Always false if max is lower then min!
      if (max < min) {
        return false;
      }

      // Compute the earth distance:
      d = _getDistanceOnEarth(obj, source);

      // Return true if min <= d <= max (if min or max is undefined, the
      // associated condition is true).
      /* eslint-disable-next-line */
      return (!min || d >= min ? true : false) && (!max || d <= max ? true : false) ? true : false;
    }

    /**
     * Checks if the GeoJSON object matches the $near query.
     *
     * @function (arg1, arg2, arg3, arg4)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $near query,
     * @param {Number}      the minimal distance from the central point in meters,
     * @param {Number}      the maximal distance from the central point in meters,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @since 0.0.0
     */
    function _geoNear(obj, source, max, min) {
      switch (obj.type) {
        case 'Point':
          return _isPointNear(obj, source, max, min);

        default:
          return false;
      }
    }

    /**
     * Checks if the GeoJSON object matches the $geoWithin query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial $geoWithin query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @throws {Object}     throws an error if the GeoSpatial operator isn't recognized,
     * @since 0.0.0
     */
    function _geoWithin(obj, source) {
      var op = _.keys(source)[0]
        ;

      /* istanbul ignore next */
      if (!_.isObject(source)) {
        return false;
      }

      switch (op) {
        case '$geometry':
          return _within(obj, source.$geometry);

        case '$box':
          return _box(obj, source.$box);

        case '$polygon':
          return _polygon(obj, source.$polygon);

        case '$center':
          return _center(obj, source.$center);

        case '$centerSphere':
          return _centerSphere(obj, source.$centerSphere);

        /* istanbul ignore next */
        default:
          throw new Error('Geo._geoWithin: the GeoSpatial $geoWihin operator "' + op + '" is unknown!');
      }
    }

    /**
     * Checks if the GeoJSON object matches the $geoIntersects query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @throws {Object}     throws an error if the GeoSpatial operator isn't recognized,
     * @since 0.0.0
     */
    function _geoIntersects(obj, source) {
      /* istanbul ignore next */
      if (!{}.hasOwnProperty.call(source, '$geometry')) {
        return false;
      }

      switch (source.$geometry.type) {
        case 'Polygon':
          return _intersects(obj, source.$geometry);

        /* istanbul ignore next */
        default:
          throw new Error('Geo._geoIntersects: the GeoSpatial $geoIntersects type "' + source.$geometry.type + '" is not supported!');
      }
    }

    /**
     * Checks if the GeoJSON object matches the $near query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @since 0.0.0
     */
    function _near(obj, source) {
      // if (!source.hasOwnProperty(('$geometry')))
      if (!{}.hasOwnProperty.call(source, '$geometry')) {
        return false;
      }

      switch (source.$geometry.type) {
        case 'Point':
          return _geoNear(obj, source.$geometry, source.$maxDistance, source.$minDistance);

        default:
          return false;
      }
    }

    /**
     * Decodes the GeoSpatial query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the GeoJSON object,
     * @param {Object}      the GeoSpatial query,
     * @returns {Boolean}   returns true if the query is successful, false otherwise,
     * @throws {Object}     throws an error if the GeoSpatial operator isn't recognized,
     * @since 0.0.0
     */
    function _query(obj, source) {
      var status
        ;

      _.forPropIn(source, function(prop) {
        switch (prop) {
          case '$geoWithin':
            status = _geoWithin(obj, source[prop]);
            break;

          case '$geoIntersects':
            status = _geoIntersects(obj, source[prop]);
            break;

          case '$near':
            status = _near(obj, source[prop]);
            break;

          /* istanbul ignore next */
          case '$nearSphere':
            status = false;
            break;

          /* istanbul ignore next */
          default:
            throw new Error('Geo._query: the Geo Operator "' + prop + '" is unknown!');
        }
      });
      return status;
    }


    // -- Public Static Methods ------------------------------------------------

    P.Geo = {

      /**
       * Returns the distance between two points on Earth using the law of haversines.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the destination point,
       * @param {Object}      the source point,
       * @returns {Boolean}   returns the distance between the two points in meters,
       * @since 0.0.0
       */
      lawOfHaversines: function(obj, source) {
        return _lawOfHaversines(obj, source);
      },

      /**
       * Returns the distance between two points on Earth using the law of cosines.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the destination point,
       * @param {Object}      the source point,
       * @returns {Boolean}   returns the distance between the two points in meters,
       * @since 0.0.0
       */
      lawOfCosines: function(obj, source) {
        return _lawOfCosines(obj, source);
      },

      /**
       * Returns the distance between two points on Earth using the Equirectangular projection.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the destination point,
       * @param {Object}      the source point,
       * @returns {Boolean}   returns the distance between the two points in meters,
       * @since 0.0.0
       */
      equirectangularProjection: function(obj, source) {
        return _equirectangularProjection(obj, source);
      },

      /**
       * Processes the GeoSpatial query.
       *
       * @function (arg1, arg2)
       * @private
       * @param {Object}     the GeoJSON object,
       * @param {Object}     the GeoSpatial query,
       * @returns {Boolean}  returns true if the query is successful, false otherwise,
       * @since 0.0.1
       */
      query: function(obj, source) {
        return _query(obj, source);
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * An embedded library providing functions to format the output format
   * of a query.
   *
   * project.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _include                    returns a doc. based on an include projection,
   *  . _exclude                    returns a doc. based on an exclude projection,
   *
   *
   * Public Static Methods:
   *  . setProjection               sets the projection value,
   *  . isProjectionTypeInclude     returns the type of projection,
   *  . add                         adds elements of the document to doc,
   *
   *
   * @namespace    P.Project
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P, _ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Returns an excerpt of the selected document based on an include projection.
     *
     * Note:
     * It includes the fields listed in the projection with a value of 1. the
     * unknown fields or the fields with a value other than 1 are ignored.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}      the selected document,
     * @param {Object}      the projection to apply,
     * @param {Object}      the initial value of the document excerpt,
     * @returns {Object}    the excerpt of the selected document,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    function _include(obj, source, data) {
      _.forPropIn(source, function(prop) {
        if (obj[prop]) {
          if (_.isObject(source[prop])) {
            data[prop] = {};
            _include(obj[prop], source[prop], data[prop]);
          } else if (source[prop] === 1) {
            if (_.isObject(obj[prop])) {
              data[prop] = _.clone(obj[prop]);
            } else if (obj[prop]) {
              data[prop] = obj[prop];
            }
          }
        }
      });
      return data;
    }
    /* eslint-enable no-param-reassign */

    /**
     * Returns an excerpt of the selected document based on an exclude projection.
     *
     * Note:
     * It excludes the fields listed in the projection with a value of 0. The
     * unspecified fields are kept.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}      the selected document,
     * @param {Object}      the projection to apply,
     * @param {Object}      the initial value of the document excerpt,
     * @returns {Object}    the excerpt of the selected document,
     * @since 0.0.1
     */
    /* eslint-disable no-param-reassign */
    function _exclude(obj, source, data) {
      _.forPropIn(obj, function(prop) {
        if (source[prop] !== undefined) {
          if (_.isObject(source[prop])) {
            data[prop] = {};
            _exclude(obj[prop], source[prop], data[prop]);
          }
        } else if (_.isObject(obj[prop])) {
          data[prop] = _.clone(obj[prop]);
        } else {
          data[prop] = obj[prop];
        }
      });
      return data;
    }
    /* eslint-enable no-param-reassign */


    // -- Public Static Methods ------------------------------------------------

    P.Project = {

      /**
       * Sets the projection value.
       *
       * Note:
       * If it is an include projection, the _id field is explicitely defined in
       * the projection.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}    the projection,
       * @param {Boolean}   the current type,
       * @returns {Object}  the updated projection,
       * @since 0.0.0
       */
      setProjection: function(projection, type) {
        if (!type) {
          return projection;
        }

        if (projection._id !== undefined) {
          return projection;
        }
        return _.extend({ _id: 1 }, projection);
      },

      /**
       * Returns the type of projection.
       *
       * Note:
       * If one 'field' is equal to 1, it's an include projection. It means that
       * only the fields defined in the projection, and equal to 1, are included
       * in the output.
       *
       * By default, '_id' is included except if it is explicitely defined to be
       * excluded in the projection (_id: 0).
       *
       * If all the fields in the projection are equal to 0, it's an exclude
       * projection. It means that only these fields are removed from the output.
       *
       * @method (arg1)
       * @public
       * @param {Object}    the projection,
       * @returns {Boolean} true if it is an include projection, false otherwise,
       * @since 0.0.0
       */
      /* eslint-disable no-restricted-syntax */
      isProjectionTypeInclude: function(projection) {
        var prop
          ;

        for (prop in projection) {
          if (_.isObject(projection[prop])) {
            if (this.isProjectionTypeInclude(projection[prop])) {
              return true;
            }
          } else if (projection[prop]) {
            return true;
          }
        }
        return false;
      },
      /* eslint-enable no-restricted-syntax */

      /**
       * Adds elements of the document to doc in accordance with projection.
       *
       * Note: this function mutates the argument `doc`.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}    the current list of documents already selected,
       * @param {Object}    the current document,
       * @param {Object}    the projection object,
       * @returns {}        -,
       * @since 0.0.0
       */
      add: function(doc, data, projection) {
        // If projection is empty means no filtering of the output!
        if (_.isEmpty(projection.value)) {
          doc.push(_.clone(data));
        } else if (projection.type) {
          doc.push(_include(data, projection.value, {}));
        } else {
          doc.push(_exclude(data, projection.value, {}));
        }
      }
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * An embedded library providing functions to query the documents into the db.
   *
   * query.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _isHavingNotOperator        returns object keys of the not operators if any,
   *  . _isHavingOrOperator         returns the query array if $or operator,
   *  . _isHavingSpecialOperator    returns special operators or false,
   *  . _isConditionTrue            checks if the document meets the condition,
   *  . _areConditionsTrue          checks if the document meets all the conditions,
   *  . _query                      checks if the document matches the query,
   *
   *
   * Public Static Methods:
   *  . isHavingSpecialOperator     returns an object if any special operators,
   *  . isMatch                     checks if the document matches,
   *
   *
   * @namespace    P.Query
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P, _ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules
    var Geo = P.Geo
      ;


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Returns object keys of the not ($ne, $nin) operators if any.
     *
     * @function (arg1)
     * @private
     * @param {Object}      the query object,
     * @returns {Array}     returns the list of objects keys for not operators or
     *                      false,
     * @since 0.0.0
     */
    /* eslint-disable no-loop-func, dot-notation */
    function _isHavingNotOperator(query) {
      var op = ['$ne', '$nin', '$not']
        , qar
        , not
        , re
        , x
        , i
        , j
        ;

      not = [];
      if (_.contains(_.keys(query), '$or')) {
        qar = query['$or'];
        for (i = 0; i < qar.length; i++) {
          _.forPropIn(qar[i], function(key) {
            for (j = 0; j < op.length; j++) {
              re = new RegExp('"\\' + op[j] + '":');
              x = JSON.stringify(qar[i]).match(re);
              if (x) {
                not.push(key);
              }
            }
          });
        }
      } else {
        _.forPropIn(query, function(key) {
          for (j = 0; j < op.length; j++) {
            re = new RegExp('"\\' + op[j] + '":');
            x = JSON.stringify(query[key]).match(re);
            if (x) {
              not.push(key);
            }
          }
        });
      }
      return not.length !== 0 ? not : false;
    }
    /* eslint-enable no-loop-func, dot-notation */

    /**
     * Returns the query array if $or operator.
     * (query: { $or: [ { a: { $eq: 1}}, { b: { $eq: 2 }}] })
     *
     * @function (arg1)
     * @private
     * @param {Object}      the query object,
     * @returns {Array}     returns the query array or false,
     * @since 0.0.0
     */
    /* eslint-disable dot-notation */
    function _isHavingOrOperator(query) {
      return (!query['$or'] || !_.isArray(query['$or'])) ? false : query['$or'];
    }
    /* eslint-enable dot-notation */

    /**
     * Returns special operators or false.
     *
     * @function (arg1)
     * @private
     * @param {Object}      the query object,
     * @returns {Object}    returns the special operators.
     * @since 0.0.0
     */
    function _isHavingSpecialOperator(query) {
      return {
        not: _isHavingNotOperator(query),
        or: _isHavingOrOperator(query)
      };
    }

    /**
     * Checks if the document meets the condition.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {String/Number}   the document value,
     * @param {Object}          the condition,
     * @param {String}          the query operator,
     * @returns {Boolean}       returns true if it matches, false otherwise,
     * @throws {Object}         throws an error if the condition operator isn't recognized,
     * @since 0.0.0
     */
    function _isConditionTrue(obj, source, op) {
      switch (op) {
        // Comparison Operators:
        case '$eq':
          return obj === source;

        case '$gt':
          return obj > source;

        case '$gte':
          return obj >= source;

        case '$lt':
          return obj < source;

        case '$lte':
          return obj <= source;

        case '$ne':
          return obj !== source;

        case '$in':
          return _.isArray(obj)
            ? !_.isEmpty(_.share(source, obj))
            : _.contains(source, obj);

        case '$nin':
          return _.isArray(obj)
            ? _.isEmpty(_.share(source, obj))
            : !_.contains(source, obj);

        // Logical Operators:
        case '$not':
          /* eslint-disable-next-line no-use-before-define */
          return !_areConditionsTrue(obj, source);

        // Element Operators:
        case '$exists':
          return source;

          // Evaluation Operators:
          // --

        // Geospatial Operators:
        case '$geoWithin':
          return Geo.query(obj, { $geoWithin: source });

        case '$geoIntersects':
          return Geo.query(obj, { $geoIntersects: source });

        case '$near':
          return Geo.query(obj, { $near: source });

        /* istanbul ignore next */
        case '$nearSphere':
          return Geo.query(obj, { $nearSphere: source });

          // Array Operators:
          // --

          // Bitwise Operators:
          // --

          // Comments Operators:
          // --


        /* istanbul ignore next */
        default:
          throw new Error('Query._isConditionTrue: the operator "' + op + '" is unknown!');
      }
    }

    /**
     * Checks if the document meets all the conditions.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {String/Number}   the document value,
     * @param {Object}          the conditions,
     * @returns {Boolean}       returns true if it matches, false otherwise,
     * @since 0.0.0
     */
    /* eslint-disable no-restricted-syntax */
    function _areConditionsTrue(obj, source) {
      var prop
        ;

      // Without an Operator:
      if (!_.isArray(source) && !_.isObject(source)) {
        if (obj === source) {
          return true;
        }
        return false;
      }

      // With an Operator:
      for (prop in source) {
        if (!_isConditionTrue(obj, source[prop], prop)) {
          return false;
        }
      }
      return true;
    }
    /* eslint-enable no-restricted-syntax */

    /**
     * Checks if the document matches the query.
     *
     * The query looks like:
     *   { field: value | condition(s), field: value | condition(s), etc. }
     *
     * Basic query:
     * The basic query is an object with a set of pair of field/conditions.
     * The implicit link between each pair is an AND. If one condition fails,
     * the whole query fails. Thus, as soon as the first field doesn't match
     * the condition, the process stops and return false.
     *
     * Special operators $ne, $nin, $not:
     * With these operators, the query is successful if the field matches the
     * condition or it doesn't exist.
     *
     * Special operator $or:
     * As said, the link between field/conditions is an implicit AND. With the
     * operator $or the implicit AND is replaced by an implicit OR.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}      the document,
     * @param {Object}      the query,
     * @param {Object}      the special operator object,
     * @returns {Boolean}   returns true if the conditions are met,
     * @since 0.0.0
     */
    /* eslint-disable no-shadow, no-restricted-syntax, no-continue, guard-for-in,
      no-else-return */
    function _query(obj, source, op) {
      var level = 0
        , rootKey
        ;

      // Parse the query object recursively and check if the document has the
      // field on which the test will apply or has/hasn't for the not
      // operators.
      function parse(obj, source) {
        var prop
          ;

        for (prop in source) {
          if (level === 0) {
            rootKey = prop;
          }

          if (!obj[prop]) {
            if (!op.not || !_.contains(op.not, rootKey)) {
              return false;
            } else if (op.or) {
              return true;
            }
            continue;
          }

          if (_.isObject(source[prop]) && !_.keys(source[prop])[0].match(/^\$/)) {
            level += 1;
            if (!parse(obj[prop], source[prop])) {
              level -= 1;
              if (!op.or) {
                return false;
              }
            } else if (op.or) {
              return true;
            }
          } else if (!_areConditionsTrue(obj[prop], source[prop])) {
            if (!op.or) {
              return false;
            }
          } else if (op.or) {
            return true;
          }
        }
        return !op.or;
      }

      return parse(obj, source);
    }


    // -- Public Static Methods ------------------------------------------------

    P.Query = {

      /**
       * Returns an object if any special operators.
       *
       * @method (arg1)
       * @public
       * @param {Object}    the query object,
       * @returns {Array}   returns the list of objects keys for not operators or
       *                    false,
       * @since 0.0.0
       */
      isHavingSpecialOperator: function(query) {
        return _isHavingSpecialOperator(query);
      },

      /**
       * Checks if the document matches.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}    the document,
       * @param {Object}    the query object,
       * @param {Object}    special operator object,
       * @returns {Boolean} returns true if the object matches, false otherwise,
       * @since 0.0.1
       */
      /* eslint-disable dot-notation */
      isMatch: function(doc, query, sop) {
        var i
          ;

        // Basic query:
        if (!sop.or) {
          return _query(doc, query, sop);
        }

        // Or query:
        for (i = 0; i < query['$or'].length; i++) {
          if (_query(doc, query['$or'][i], sop)) {
            return true;
          }
        }
        return false;
      }
      /* eslint-enable dot-notation */
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


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


  /** **************************************************************************
   *
   * An embedded library providing functions to delete documents into the db.
   *
   * delete.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _delete                     deletes the doc(s) into the db,
   *
   *
   * Public Static Methods:
   *  . delete                      deletes the doc(s) into the db,
   *
   *
   * @namespace    P.Delete
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P, _ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules
    var Event = P.Event
      , Query = P.Query
      ;


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Deletes the document(s) into the database that contain the filter object.
     *
     * @function(arg1, arg2, arg3, arg4, arg5)
     * @private
     * @param {Object}      the document database,
     * @param {Object}      the event object,
     * @param {Object}      the object to find into the document(s),
     * @param {Object}      the settings,
     * @param {Function}    the function to call at completion,
     * @return {}           -,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    function _delete(db, eventQ, filter, options, callback) {
      var sop = Query.isHavingSpecialOperator(filter)
        , removed
        , dblength
        , docOut
        , i
        ;

      // Return without doing anything if the filter isn't an object:
      // (or an object array)
      if (!_.isObject(filter) || _.isArray(filter)) {
        if (callback) {
          callback(null, null);
        }
        return;
      }

      // Is an empty object?
      if (_.isEmpty(filter)) {
        docOut = [];
        if (!options.many) {
          // Remove the first document only!
          removed = 1;
          docOut = db.data.splice(0, 1);
        } else {
          // Remove all the documents!
          removed = db.data.length;
          docOut = _.clone(db.data);
          db.data.length = 0;
        }

        // Fire an event and execute the callback:
        Event.fire(eventQ, 'change', docOut);
        Event.fire(eventQ, 'delete', docOut);
        if (callback) {
          callback(null, removed);
        }
        return;
      }

      // Parse the documents into the db one by one and check if the keys match:
      // (each time a document is deleted, the counter and the length size must
      // be reajusted. It could have been easier to parse the db from the last
      // to the first but in case of deleteOne it deletes the most recent
      // instead of the oldest)
      removed = 0;
      docOut = [];
      dblength = db.data.length;
      // for (i = db.data.length - 1; i >= 0; i--) {
      for (i = 0; i < dblength; i++) {
        if (Query.isMatch(db.data[i], filter, sop)) {
          // Remove the document that matches:
          docOut.push(db.data.splice(i, 1));
          removed += 1;
          // Readjust db length after one item has been removed & reposition i:
          i -= 1;
          dblength -= 1;
          if (!options.many) {
            // Remove one document only!
            break;
          }
        }
      }

      // Fire an event and execute the callback:
      Event.fire(eventQ, 'change', docOut);
      Event.fire(eventQ, 'delete', docOut);
      if (callback) {
        callback(null, removed);
      }
      // return;
    }
    /* eslint-enable no-param-reassign */


    // -- Public Static Methods ------------------------------------------------

    P.Delete = {

      /**
       * Deletes the document(s) into the database that contain the filter object.
       *
       * @method(arg1, arg2, arg3, arg4, arg5)
       * @public
       * @param {Object}    the context,
       * @param {Boolean}   true if the whole docs must be parsed, false if it
       *                    should stop after the first match,
       * @param {Object}    the document database,
       * @param {Object}    the object to find into the document(s),
       * @param {Function}  the function to call at completion,
       * @return {}         -,
       * @since 0.0.1
       */
      /* eslint-disable no-param-reassign */
      delete: function(_this, many, filter, options, callback) {
        var db = _this.db
          , eventQ = _this.eventQ
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

        options.many = many;
        _delete(db, eventQ, filter, options, callback);
      }
      /* eslint-enable no-param-reassign */

    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


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


  /** **************************************************************************
   *
   * An embedded library providing functions to insert new documents into the db.
   *
   * insert.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _schema                     returns the db model,
   *  . _isNewId                    checks that this 'id' is new,
   *  . _insert                     inserts the new documents into the db,
   *
   *
   * Public Static Methods:
   *  . schema                      returns the db model,
   *  . insert                      inserts the new documents into the db,
   *
   *
   * @namespace    P.Insert
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P, _ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules
    var Event = P.Event
      ;


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Returns the db model.
     *
     * @function ()
     * @private
     * @param {}            -,
     * @returns {Object}    returns the db object model,
     * @since 0.0.1
     */
    function _schema() {
      return {
        data: []
      };
    }

    /**
     * Checks that this 'id' is new.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the database object,
     * @param {String}      the new id,
     * @returns {Boolean}   returns true if the id is new, false otherwise,
     * @since 0.0.0
     */
    function _isNewId(db, id) {
      var status = true
        , i
        ;

      for (i = 0; i < db.data.length; i++) {
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
     * @param {Object}        the database object,
     * @param {Object}        the eventQ,
     * @param {Array/Object}  the new document(s),
     * @param {Object}        the settings,
     * @param {Function}      the function to call at the completion,
     * @returns {}            -,
     * @since 0.0.1
     */
    function _insert(db, eventQ, docs, options, callback) {
      var arr
        , docOut
        , id
        , i
        ;
      // Embed a single document in an array to get a generic process.
      arr = [];
      if (!_.isArray(docs) && _.isObject(docs)) {
        arr.push(docs);
      } else {
        arr = docs;
      }

      // Parse all the documents:
      docOut = [];
      for (i = 0; i < arr.length; i++) {
        if (_.isObject(arr[i])) {
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
            id = _.token();
            db.data.push(_.extend({ _id: id }, arr[i]));
            docOut.push(_.extend({ _id: id }, arr[i]));
            if (!options.many) {
              break;
            }
          }
        }
      }

      // Fire an event and execute the callback:
      Event.fire(eventQ, 'change', docOut);
      Event.fire(eventQ, 'insert', docOut);
      if (callback) {
        callback(null, docOut);
      }
    }


    // -- Public Static Methods ------------------------------------------------

    P.Insert = {

      /**
       * Returns the db model.
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Object}  returns the db object model,
       * @since 0.0.0
       */
      schema: function() {
        return _schema();
      },

      /**
       * Inserts the new documents into the db.
       *
       * @method (arg1, arg2, arg3, arg4, arg5)
       * @public
       * @param {Object}        the context object,
       * @param {Boolean}       true if many, false if one,
       * @param {Array/Object}  the new document(s),
       * @param {Object}        the optional settings,
       * @param {Function}      the function to call at the completion,
       * @returns {}            -,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      insert: function(_this, many, docs, options, callback) {
        var db     = _this.db
          , eventQ = _this.eventQ
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

        // Insert if it is a valid document:
        options.many = many;
        if (_.isArray(docs) || _.isObject(docs)) {
          _insert(db, eventQ, docs, options, callback);
        }
      }
      /* eslint-enable no-param-reassign */
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * An embedded library providing functions to update documents into the db.
   *
   * update.js is just a literal object that contains a set of static methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _pull                       processes the $pull operator,
   *  . _push                       processes the $push operator,
   *  . _apply                      applies the requested update to the document,
   *  . _replace                    replaces the document content,
   *  . _applyTime                  updates or adds the time fields to the document,
   *  . _updateThisDoc              updates this document,
   *  . _update                     updates one or several documents,
   *
   *
   * Public Static Methods:
   *  . update                      updates one or several documents,
   *
   *
   * @namespace    P.Update
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P, _ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants


    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Processes the $pull operator.
     * ({ $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } })
     *
     * Note: this function mutates the argument `obj`.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination document,
     * @param {Object}      the source document,
     * @returns {Object}    the modified document,
     * @since 0.0.0
     */
    /* eslint-disable no-restricted-syntax, no-param-reassign, dot-notation, no-continue */
    function _pull(obj, source) {
      var prop
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
            op = _.keys(source[prop])[0];
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
                throw new Error('Update._pull: the operator "' + op + '" is not supported!');
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
     *
     * Note: this function mutates the argument `obj`.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination document,
     * @param {Object}      the source document,
     * @returns {Object}    the modified document,
     * @since 0.0.0
     */
    /* eslint-disable no-restricted-syntax, no-param-reassign, dot-notation, no-continue */
    function _push(obj, source) {
      var prop
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
     *
     * Note: this function mutates the argument `obj`.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}      the destination document,
     * @param {Object}      the source document,
     * @param {String}      the Update Operator,
     * @returns {Object}    the modified document,
     * @throws {Object}     throws an error if the operator is unknown,
     * @since 0.0.0
     */
    /* eslint-disable no-restricted-syntax, no-param-reassign, dot-notation */
    function _apply(obj, source, op) {
      var prop
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
              throw new Error('Update._apply: the operator "' + op + '" is unknown!');
          }
        }
      }
      return obj;
    }
    /* eslint-enable no-restricted-syntax, no-param-reassign, dot-notation */

    /**
     * Replaces the document content.
     *
     * Note: this function mutates the argument `obj`.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination document,
     * @param {Object}      the source document,
     * @returns {Object}    the modified document,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    function _replace(obj, source) {
      var keys = _.keys(obj)
        , i
        ;

      // Delete all the properties of 'obj', except '_id':
      for (i = 0; i < keys.length; i++) {
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
     *
     * Note: this function mutates the argument `obj`.
     *
     * If the type is 'timestamp' sets the timestamp. Otherwise sets the date.
     * The source document has the following form:
     * $currentDate: { lastModified: true, cancellation: { date: { $type: 'timestamp' }}
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the destination document,
     * @param {Object}      the source document,
     * @returns {Object}    the modified document,
     * @since 0.0.0
     */
    /* eslint-disable no-restricted-syntax, no-param-reassign */
    function _applyTime(obj, source) {
      var prop
        , subprop
        ;

      for (prop in source) {
        if ({}.hasOwnProperty.call(source, prop)) {
          subprop = _.keys(source[prop])[0];
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
     *
     * Note: this function mutates the argument `doc`.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the document to update,
     * @param {Object}      the 'fields' to be updated and their new values,
     * @returns {Object}    the modified document,
     * @throws {Object}     throws an error if the operator is unknown or not supported,
     * @since 0.0.0
     */
    /* eslint-disable dot-notation */
    function _updateThisDoc(doc, update) {
      var keys = _.keys(update)
        ;

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
          throw new Error('The Update Operator "' + keys[0] + '" isn\'t supported!');
      }
    }
    /* eslint-enable dot-notation */

    /**
     * Updates one or several documents.
     *
     * @function (arg1, arg2, arg3, arg4, arg5, arg6)
     * @private
     * @param {Object}      the database object,
     * @param {Object}      the query object,
     * @param {Object}      the 'fields' to be updated,
     * @param {Options}     the settings,
     * @param {Function}    the function to call at completion,
     * @returns {}          -,
     * @since 0.0.0
     */
    function _update(db, eventQ, query, update, options, callback) {
      var sop = P.Query.isHavingSpecialOperator(query)
        , docOut
        , i
        ;

      // Test if query seems valid:
      if (_.isArray(query) || _.isFunction(query) || !_.isObject(query)) {
        if (callback) {
          callback('filter is not a valid object!');
        }
        return;
      }

      // Test if update seems valid:
      if (_.isArray(update) || _.isFunction(update) || !_.isObject(update)) {
        if (callback) {
          callback('update is not a valid object!');
        }
        return;
      }

      // Parse the doc db:
      docOut = [];
      for (i = 0; i < db.data.length; i++) {
        if (P.Query.isMatch(db.data[i], query, sop)) {
          _updateThisDoc(db.data[i], update);
          // Do not copy the references. Clone the object instead!
          docOut.push(_.extend({}, db.data[i]));
          if (!options.many) {
            break;
          }
        }
      }

      // Fire an event and execute callback:
      P.Event.fire(eventQ, 'change', docOut);
      P.Event.fire(eventQ, 'update', docOut);
      if (callback) {
        callback(null, docOut);
      }
    }


    // -- Public Static Methods ------------------------------------------------

    P.Update = {

      /**
       * Updates one or several documents.
       *
       * @function (arg1, arg2, arg3, arg4, arg5, arg6)
       * @public
       * @param {Object}    the context object,
       * @param {Boolean}   true if all the matching documents should be updated,
       *                    false if only the first matching document should be,
       * @param {Object}    the query object,
       * @param {Object}    the 'fields' to be updated,
       * @param {Options}   the optional settings,
       * @param {Function}  the function to call at completion,
       * @returns {}        -,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      update: function(_this, many, query, update, options, callback) {
        var db = _this.db
          , eventQ = _this.eventQ
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

        // Try to update the document:
        options.many = many;
        _update(db, eventQ, query, update, options, callback);
      }
      /* eslint-enable no-param-reassign */
    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * A tiny in-memory database (MongoDB like) that stores JSON documents.
   *
   * This is the entry point of the library where is defined the constructor
   * and the attached methods.
   *
   * picodb.js.js is built upon the Prototypal Instantiation pattern. It
   * returns an object by calling its constructor. It doesn't use the new
   * keyword.
   *
   * Private Functions:
   *  . none,
   *
   * Constructor:
   *  . PicoDB                      creates the database object,
   *
   *
   * Public Methods:
   *  . count                       counts the documents into the db that match,
   *  . deleteMany                  deletes the documents into the db that match,
   *  . deleteOne                   deletes the first (the oldest) doc. that matches,
   *  . insertMany                  inserts an array of documents,
   *  . insertOne                   inserts a single document,
   *  . updateMany                  updates many documents,
   *  . updateOne                   updates one document,
   *  . find                        finds the searched documents,
   *  . toArray                     returns the found documents in an array,
   *  . addEventListener            registers the specified listener,
   *  . addOneTimeEventListener     registers the specified listener for once,
   *  . removeEventListener         removes the event registered listener,
   *  . on                          alias on addEventListener,
   *  . one                         alias on addOneTimeEventListener,
   *  . off                         alias on removeEventListener,
   *
   *
   * @namespace    PicoDB
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* global P */
  /* eslint-disable one-var, semi-style */

  (function() {
    // IIFE

    // -- Module path
    var Event  = P.Event
      , Insert = P.Insert
      , Count  = P.Count
      , Delete = P.Delete
      , Update = P.Update
      , Find   = P.Find
      ;


    // -- Local modules


    // -- Local constants
    var methods
      , previousPicoDB
      ;


    // -- Local variables


    // -- Public ---------------------------------------------------------------

    /**
    * Creates and returns the object PicoDB.
    * (Prototypal Instantiation Pattern)
    *
    * @constructor ()
    * @public
    * @param {}             -,
    * @returns {Object}     returns PicoDB object,
    * @since 0.0.0
    */
    PicoDB = function() {
      var obj = Object.create(methods);
      // Adds the database container & attaches it a schema:
      obj.db = Insert.schema();
      // Adds an eventQ:
      obj.eventQ = Event.setEventListenerList();
      return obj;
    };

    // Saves the previous value of the PicoDB variable, so that it can be
    // restored later on, if noConflict is used.
    previousPicoDB = root.PicoDB;

    // Runs PicoDB in noConflict mode, returning the PicoDB variable to its
    // previous owner. Returns a reference to this PicoDB object.
    /* istanbul ignore next */
    PicoDB.noConflict = function() {
      /* eslint-disable-next-line no-param-reassign */
      root.PicoDB = previousPicoDB;
      return this;
    };

    // Current version of the library:
    PicoDB.VERSION = '0.12.0beta1';


    // -- Public Methods -------------------------------------------------------

    methods = {

      /**
       * Exports the reference to an internal library.
       *
       * Nota:
       * This function is private but accessible from outside! It is required for
       * testing internal libraries.
       *
       * @method (arg1)
       * @private
       * @param {String}    the name of the internal library,
       * @returns {Object}  the reference to the library,
       * @since 0.0.1
       */
      _export: function(name) {
        /* eslint-disable-next-line no-eval */
        return eval(name);
      },

      /**
       * Counts the documents into the db that match.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}     the query object,
       * @param {Options}    the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      count: function(query, options, callback) {
        // Return silently if the database isn't initialized or
        // if they are too few arguments:
        if (!this.db || arguments.length < 1) {
          return;
        }
        Count.count(this, query, options, callback);
      },

      /**
       * Deletes the documents into the db that match.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}     the object to found,
       * @param {Options}    the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      deleteMany: function(filter, options, callback) {
        // Return silently if the database isn't initialized or
        // if they are too few arguments:
        if (!this.db || arguments.length < 1) {
          return;
        }
        Delete.delete(this, true, filter, options, callback);
      },

      /**
       * Deletes the first (the oldest) document into the db that matches.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}     the object to found,
       * @param {Options}    the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      deleteOne: function(filter, options, callback) {
        // Return silently if the database isn't initialized or
        // if they are too few arguments:
        if (!this.db || arguments.length < 1) {
          return;
        }
        Delete.delete(this, false, filter, options, callback);
      },

      /**
       * Inserts an array of documents into the db.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Array}      the documents to insert,
       * @param {Object}     the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      insertMany: function(docs, options, callback) {
        // Return silently if they are too few arguments:
        if (arguments.length < 1) {
          return;
        }
        Insert.insert(this, true, docs, options, callback);
      },

      /**
       * Inserts a single document into the db.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {Object}     the document to insert,
       * @param {Object}     the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      insertOne: function(doc, options, callback) {
        // Return silently if they are too few arguments:
        if (arguments.length < 1) {
          return;
        }
        Insert.insert(this, false, doc, options, callback);
      },

      /**
       * Updates many documents into the db.
       *
       * @method (arg1, arg2, arg3, arg4)
       * @public
       * @param {Object}     the query object,
       * @param {object}     the items to update,
       * @param {Object}     the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      updateMany: function(query, update, options, callback) {
        // Return silently if the database isn't initialized or
        // if they are too few arguments:
        if (!this.db || arguments.length < 2) {
          return;
        }
        Update.update(this, true, query, update, options, callback);
      },

      /**
       * Updates many documents into the db.
       *
       * @method (arg1, arg2, arg3, arg4)
       * @public
       * @param {Object}     the query object,
       * @param {object}     the items to update,
       * @param {Object}     the optional settings,
       * @param {Function}   the function to call at completion,
       * @returns {}         -,
       * @since 0.0.1
       */
      updateOne: function(query, update, options, callback) {
        // Return silently if the database isn't initialized or
        // if they are too few arguments:
        if (!this.db || arguments.length < 2) {
          return;
        }
        Update.update(this, false, query, update, options, callback);
      },

      /**
       * Finds the searched documents.
       *
       * @method (arg1)
       * @public
       * @param {Object}     the query object,
       * @param {Object}     the projection object,
       * @returns {Object}   returns this,
       * @since 0.0.1
       */
      /* eslint-disable no-param-reassign */
      find: function(query, projection) {
        query = query || {};
        projection = projection || {};

        // Searches documents that match the query:
        Find.find(this, query, projection);
        return this;
      },
      /* eslint-enable no-param-reassign */

      /**
       * Returns the found documents in an array.
       *
       * @method (arg1)
       * @public
       * @param {Object}     the function to call at completion to retrieve the
       *                     found documents,
       * @returns {}         -,
       * @since 0.0.1
       */
      toArray: function(callback) {
        Find.toArray(this, callback);
      },

      /**
       * Registers the specified listener on the event it's called on.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the type of event,
       * @param {function}  the event listener,
       * @returns {}        -,
       * @since 0.0.1
       */
      addEventListener: function(type, listener) {
        Event.addEventListener(this.eventQ, type, listener);
      },

      /**
       * Registers the specified listener on the event it's called on for a one-time event.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the type of event,
       * @param {function}  the event listener,
       * @returns {}        -,
       * @since 0.0.1
       */
      addOneTimeEventListener: function(type, listener) {
        Event.addOneTimeEventListener(this.eventQ, type, listener);
      },

      /**
       * Removes the event listener previously registered with addEventListener.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the type of event,
       * @param {function}  the event listener,
       * @returns {}        -,
       * @since 0.0.1
       */
      removeEventListener: function(type, listener) {
        Event.removeEventListener(this.eventQ, type, listener);
      },


      /**
       * Registers the specified listener on the event it's called on.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the type of event,
       * @param {function}  the event listener,
       * @returns {}        -,
       * @since 0.0.1
       */
      on: function(type, listener) {
        this.addEventListener(type, listener);
      },

      /**
       * Registers the specified listener on the event it's called on for a one-time event.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the type of event,
       * @param {function}  the event listener,
       * @returns {}        -,
       * @since 0.0.1
       */
      one: function(type, listener) {
        this.addOneTimeEventListener(type, listener);
      },

      /**
       * Removes the event listener previously registered with addEventListener.
       *
       * @method (arg1, arg2)
       * @public
       * @param {String}    the type of event,
       * @param {function}  the event listener,
       * @returns {}        -,
       * @since 0.0.1
       */
      off: function(type, listener) {
        this.removeEventListener(type, listener);
      }
    };
  }());
  /* eslint-enable one-var, semi-style */


  // Returns the library name:
  return PicoDB;
}));
