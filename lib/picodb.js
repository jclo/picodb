/**
 * PicoDB v0.0.0
 *
 * @license
 * PicoDB is a tiny in-memory database that stores JSON documents.
 * Copyright (c) 2016 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 */
/**
 * PicoDB is a tiny in-memory database that aims to store documents running
 * both on the browser and on Node.js.
 *
 * PicoDB library is embedded inside a module pattern that exports the name
 * 'PicoDB' only.
 *
 *
 * @exports  PicoDB
 * @author   -
 * @version  0.0.0
 */
// ESLint declarations
/* global define */
/* eslint max-len: 0, curly: 0 */
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
    root.PicoDB = factory(root);
  }
}(this, function(root) {
  'use strict';
  var PicoDB
    , previousPicoDB
    ;

  // Saves the previous value of the PicoDB variable, so that it can be
  // restored later on, if noConflict is used.
  previousPicoDB = root.PicoDB;

  // Initializes PicoDB function.
  /* istanbul ignore next */
  PicoDB = function() {};

  // Runs PicoDB in noConflict mode, returning the PicoDB variable to its
  // previous owner. Returns a reference to this PicoDB object.
  /* istanbul ignore next */
  PicoDB.noConflict = function() {
    root.PicoDB = previousPicoDB;
    return this;
  };

  // Current version of the library.
  PicoDB.VERSION = '0.0.0';

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

 /**
   * event.js is an embedded library that implements functions to manage
   * custom events.
   *
   * @namespace _event
   * @functions _
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _event = {};

  /**
   * Private functions:
   *  . _isValidEvent             checks if the event and the event handler are valid,
   *
   * Public functions:
   *  . setEventListenerList      returns the event list template,
   *  . fire                      fires the given event,
   *  . addEventListener          adds an event listener,
   *  . addOneTimeEventListener   adds an Event Listener that could be fired once,
   *  . removeEventListener       removes an Event Listener from the event list,
   *
   * Aliases:
   *  . on                        addEventListener,
   *  . one                       addOneTimeEventListener,
   *  . off                       removeEventListener,
   */
  _event = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Checks if the event and the event handler are valid.
     *
     * @function(arg1, arg2, arg3)
     * @private
     * @param {Object}    the event list,
     * @param {String}    the event type,
     * @param {Function}  the event handler,
     * @returns {Boolean} returns true if the event and the handler are valid,
     *                    otherwise false,
     * @since 0.1
     */
    _isValidEvent: function(event, type, listener) {
      if (event.hasOwnProperty(type) && typeof listener === 'function')
        return true;
      else
        return false;
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Returns the event list template.
     *
     * @function()
     * @public
     * @param {}          -,
     * @returns {Object}  returns the event list,
     * @since 0.1
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
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the name of the event,
     * @param {Object}    the payload,
     * @returns {}        -,
     * @since 0.1
     */
    fire: function(eventList, event, payload) {
      var i
        ;

      // is this event a valid one?
      if (!eventList[event])
        return;

      // Fire listeners:
      for (i = 0; i < eventList[event].listeners.length; i++)
        eventList[event].listeners[i](payload);

      // Fire listeners once:
      for (i = 0; i < eventList[event].listenersOnce.length; i++)
        eventList[event].listenersOnce[i](payload);
      // Remove the event handlers:
      eventList[event].listenersOnce.splice(0, eventList[event].listenersOnce.length);

    },

    /**
     * Adds an Event Listener.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the type of event,
     * @param {Function}  the event handler,
     * @returns {}        -,
     * @since 0.1
     */
    addEventListener: function(eventList, type, listener) {

      // Is type an event and listener a function?
      if (!_event._isValidEvent(eventList, type, listener))
        return;

      // Save the listener:
      eventList[type].listeners.push(listener);

    },

    /**
     * Adds an Event Listener that could be fired once.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the type of event,
     * @param {Function}  the event handler,
     * @returns {}        -,
     * @since 0.1
     */
    addOneTimeEventListener: function(eventList, type, listener) {

      // Is type an event and listener a function?
      if (!_event._isValidEvent(eventList, type, listener))
        return;

      // Save the listener:
      eventList[type].listenersOnce.push(listener);

    },

    /**
     * Removes an Event Listener from the event list.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the type of event,
     * @param {Function}  the event handler,
     * @returns {}        -,
     * @since 0.1
     */
    removeEventListener: function(eventList, type, listener) {
      var index
        ;

      // Is type an event and listener a function?
      if (!_event._isValidEvent(eventList, type, listener))
        return;

      // Remove the listener:
      index = eventList[type].listeners.indexOf(listener);
      if (index >= 0)
        eventList[type].listeners.splice(index, 1);
    }

  };

  // Aliases:
  _event.on = _event.addEventListener;
  _event.one = _event.addOneTimeEventListener;
  _event.off = _event.removeEventListener;

  /**
   * query.js is an embedded library providing functions to query the documents
   * into the db.
   *
   * @namespace _query
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _query = {};

  /**
   * Private functions:
   *  . _isQueryOperator     checks if the object is a query operator,
   *  . _isMatch             checks if this document into the db contains the filter keys/values,
   *  . _isMatchOp           checks if the document value matches with the query value,
   *
   * Public functions:
   *  . isMatch              checks if the document matches,
   */
  _query = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Checks if the object is a query operator.
     *
     * @function (arg1)
     * @private
     * @param {Object}            a potential query operator,
     * @returns {String/Boolean}  returns the query operator or false,
     * @since 0.0.1
     */
    _isQueryOperator: function(obj) {
      var op = _.keys(obj)[0]
        , ops
        ;

      // Return false if undefined or null:
      if (!op || !op.match(/^\$/))
        return false;

      // Ok, the key starts with the symbol $. It's perhaps
      // a query operator:
      ops = ['$eq', '$gt', '$gte', '$lt', '$lte', '$ne', '$in', '$nin'];
      if (_.contains(ops, op))
        return op;
      else
        throw new Error('The query operator "' + op + '" isn\'t supported!');
    },

    /**
     * Checks if the document value matches with the query value.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {String}    the query operator,
     * @param {?}         the document value,
     * @param {?}         the query value,
     * @returns {Boolean} returns true if it matches, false otherwise,
     * @since 0.0.1
     */
    _isMatchOp: function(op, docValue, query) {

      switch (op) {

        // There is no operator. It means equality:
        case false:
          if (docValue === query) return true; else return false;

        case '$eq':
          if (docValue === query['$eq']) return true; else return false;

        case '$gt':
          if (docValue > query['$gt']) return true; else return false;

        case '$gte':
          if (docValue >= query['$gte']) return true; else return false;

        case '$lt':
          if (docValue < query['$lt']) return true; else return false;

        case '$lte':
          if (docValue <= query['$lte']) return true; else return false;

        default:
          throw new Error('_query._isMatchOp: must never occur!');
      }
    },

    /**
     * Checks if this document into the db contains the filter keys/values.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}    a set of key/value pairs,
     * @param {Object}    the document to analyze,
     * @returns {Boolean} returns true if all the key/values pairs are found,
     *                    false otherwise,
     * @since 0.0.1
     */
    _isMatch: function(doc, query) {

      // Parse the filter object recursively and check if
      // all items have identical counterparts into the
      // database. Comparison applies on boolean, string, number and arrays.
      function find(doc, query) {
        var keys
          , op
          ;

        for (keys in query) {
          if (!doc[keys]) {
            return false;
          }
          op = _query._isQueryOperator(query[keys]);
          if (_.isObject(query[keys]) && !op) {
            if (!find(doc[keys], query[keys]))
              return false;
          } else {
            //if ((doc[keys] !== query[keys]))
            if (!_query._isMatchOp(op, doc[keys], query[keys]))
              return false;
          }
        }
        return true;
      }

      return find(doc, query);
    },

    /* Public Functions ----------------------------------------------------- */

    /**
     * Checks if the document matches.
     *
     * @function (arg1, arg2)
     * @public
     * @param {Object}     the document,
     * @param {Object}     the query object,
     * @returns {Boolean}  returns true if the object matches, false otherwise,
     * @since 0.0.1
     */
    isMatch: function(doc, query) {
      return _query._isMatch(doc, query);
    }
  };

  /**
   * count.js is an embedded library providing functions to count documents
   * into the db.
   *
   * @namespace _count
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _count = {};

  /**
   * Private functions:
   *  . _count               counts the number of documents,
   *
   * Public functions:
   *  . count                counts the number of documents,
   */
  _count = {


    /* Private Functions ---------------------------------------------------- */

    /**
     * Counts the number of documents.
     *
     * @function (arg1, arg2, arg3, arg4)
     * @private
     * @param {Object}     the database object,
     * @param {Object}     the query object,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    _count: function(db, query, options, callback) {
      var count
        , i
        ;

      // Test is query is valid:
      if (!_.isObject(query) || _.isArray(query) || _.isFunction(query)) {
        if (callback)
          callback('query is not a valid object!', 0);
        return;
      }

      // Parse the db and count:
      count = 0;
      for (i = 0; i < db.data.length; i++)
        if (_query.isMatch(db.data[i], query)) {
          count += 1;
          //console.log(db.data[i]);
        }
      if (callback)
        callback(null, count);
    },


    /* Public Functions ----------------------------------------------------- */


    /**
     * Counts the number of documents.
     *
     * @function (arg1, arg2, arg3, arg4)
     * @public
     * @param {Object}     the context object,
     * @param {Object}     the query object,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
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
      if (_.isArray(options) || !_.isObject(options))
        options = {};

      // Try to count:
      _count._count(db, query, options, callback);

    }
  };

  /**
   * delete.js is an embedded library providing functions to delete documents
   * into the db.
   *
   * @namespace _delete
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _delete = {};

  /**
   * Private functions:
   *  . _delete              deletes the document(s) into the database that contain the filter object,
   *
   * Public functions:
   *  . delete               deletes the document(s) into the database that contain the filter object,
   */
  _delete = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Deletes the document(s) into the database that contain the filter object.
     *
     * @function(arg1, arg2, arg3, arg4, arg5)
     * @private
     * @param {Object}    the document database,
     * @param {Object}    the event object,
     * @param {Object}    the object to find into the document(s),
     * @param {Object}    the settings,
     * @param {Function}  the function to call at completion,
     * @return {}         -,
     * @since 0.0.1
     */
    _delete: function(db, eventQ, filter, options, callback) {
      var removed
        , dblength
        , docOut
        , i
        ;

      // Return without doing anything if the filter isn't an object:
      // (or an object array)
      if (!_.isObject(filter) || _.isArray(filter)) {
        if (callback)
          callback(null, null);
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
        _event.fire(eventQ, 'change', docOut);
        _event.fire(eventQ, 'delete', docOut);
        if (callback)
          callback(null, removed);
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
      //for (i = db.data.length - 1; i >= 0; i--) {
      for (i = 0; i < dblength; i++) {
        if (_query.isMatch(db.data[i], filter)) {
          // Remove the document that matches:
          docOut.push(db.data.splice(i, 1));
          removed += 1;
          // Readjust db length after one item has been removed & reposition i:
          i--;
          dblength -= 1;
          if (!options.many)
            // Remove one document only!
            break;
        }
      }

      // Fire an event and execute the callback:
      _event.fire(eventQ, 'change', docOut);
      _event.fire(eventQ, 'delete', docOut);
      if (callback)
        callback(null, removed);
      return;
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Deletes the document(s) into the database that contain the filter object.
     *
     * @function(arg1, arg2, arg3, arg4, arg5)
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
      if (_.isArray(options) || !_.isObject(options))
        options = {};

      options.many = many;
      _delete._delete(db, eventQ, filter, options, callback);
    }
  };

  /**
   * find.js is an embedded library providing functions to find documents
   * into the db.
   *
   * @namespace _find
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _find = {};

  /**
   * Private functions:
   *  . _initCursor          initializes the Cursor object,
   *  . _process             processes the search,
   *
   * Public functions:
   *  . find                 find the document,
   *  . toArray              returns the found documents in an array,
   */
  _find = {


    /* Private Functions ---------------------------------------------------- */

    /**
     * Initializes the Cursor object.
     *
     * @function ()
     * @private
     * @param {}           -,
     * @returns {Object}   the cursor object to attach to the database,
     * @since 0.0.1
     */
    _initCursor: function() {
      return {
        query: {}
      };
    },

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
    _process: function(dbO, callback) {
      var query = dbO.cursor.query
        , db    = dbO.db
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
      for (i = 0; i < db.data.length; i++)
        if (_query.isMatch(db.data[i], query))
          docs.push(db.data[i]);
      callback(null, docs);

    },

    /* Public Functions ----------------------------------------------------- */

    /**
     * Find documents.
     *
     * @function (arg1, arg2)
     * @public
     * @param {Object}     the context object,
     * @param {Object}     the query object,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    find: function(_this, query) {
      if (!_this.cursor)
        _this.cursor = _find._initCursor();

      // Save the find query:
      _this.cursor.query = query;

    },

    /**
     * Returns the found documents.
     *
     * @function (arg1, arg2)
     * @public
     * @param {Object}     the context object,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    toArray: function(_this, callback) {

      // If callback isn't a function, return silently:
      if (!_.isFunction(callback))
        return;

      // Process the find query:
      _find._process(_this, callback);
    }

  };

  /**
   * insert.js is an embedded library providing functions to insert
   * new documents into the db.
   *
   * @namespace _insert
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _insert = {};

  /**
   * Private functions:
   *  . _schema              returns the db model,
   *  . _isNewId             checks that this 'id' is new,
   *  . _insert              inserts the new documents into the db,
   *
   * Public functions:
   *  . insert               inserts the new documents into the db,
   */
  _insert = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Returns the db model.
     *
     * @function ()
     * @private
     * @param {}           -,
     * @returns {Object}   returns the db object model,
     * @since 0.0.1
     */
    _schema: function() {
      return {
        data: []
      };
    },

    /**
     * Checks that this 'id' is new.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the database object,
     * @param {String}     the new id,
     * @returns {Boolean}  returns true if the id is new, false otherwise,
     * @since 0.0.1
     */
    _isNewId: function(db, id) {
      var status = true
        , i
        ;

      for (i = 0; i < db.data.length; i++)
        if (db.data[i]._id === id) {
          status = false;
          break;
        }

      return status;
    },

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
    _insert: function(db, eventQ, docs, options, callback) {
      var arr
        , docOut
        , o
        , key
        , i
        ;

      // Embed a single document in an array to get a generic process.
      arr = [];
      if (!_.isArray(docs) && _.isObject(docs))
        arr.push(docs);
      else
        arr = docs;

      // Parse all the documents:
      docOut = [];
      for (i = 0; i < arr.length; i++)
        if (_.isObject(arr[i]))
          if (arr[i]._id) {
            // Do not duplicate doc!
            if (_insert._isNewId(db, arr[i]._id)) {
              db.data.push(arr[i]);
              docOut.push(arr[i]);
              if (!options.many)
                break;
            }
          } else {
            // Extending o instead of adding the property '_id' to arr[i],
            // forces the property _id to be the first item of the object
            // instead of the last!
            o = { _id: _.token() };
            for (key in arr[i])
              if (arr[i].hasOwnProperty(key))
                o[key] = arr[i][key];
            db.data.push(o);
            docOut.push(o);
            if (!options.many)
              break;
          }

      // Fire an event and execute the callback:
      _event.fire(eventQ, 'change', docOut);
      _event.fire(eventQ, 'insert', docOut);
      if (callback)
        callback(null, docOut);
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Inserts the new documents into the db.
     *
     * @function (arg1, arg2, arg3, arg4, arg5)
     * @public
     * @param {Object}        the context object,
     * @param {Boolean}       true if many, false if one,
     * @param {Array/Object}  the new document(s),
     * @param {Object}        the optional settings,
     * @param {Function}      the function to call at the completion,
     * @returns {}            -,
     * @since 0.0.1
     */
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
      if (_.isArray(options) || !_.isObject(options))
        options = {};

      // Insert if it is a valid document:
      options.many = many;
      if (_.isArray(docs) || _.isObject(docs))
        _insert._insert(db, eventQ, docs, options, callback);
    }

  };

  /**
   * update.js is an embedded library providing functions to update documents
   * into the db.
   *
   * @namespace _update
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _update = {};

  /**
   * Private functions:
   *  . _set                 replaces the 'fields' in the current document or adds new ones,
   *  . _unset               removes 'fields' from the current document,
   *  . _replace             replaces the current document by a new one,
   *  . _updateThisDoc       updates this document,
   *  . _update              updates one or several documents,
   *
   * Public functions:
   *  . update               updates one or several documents,
   */
  _update = {


    /* Private Functions ---------------------------------------------------- */

    /**
     * Replaces the 'fields' in the current document or adds new ones.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the document to update,
     * @param {Update}     the 'fields' to be replaced or added,
     * @returns {Object}   the modified document,
     * @since 0.0.1
     */
    _set: function(doc, update) {
      var key
        ;

      for (key in update)
        // Prevent adding inherited properties and overwriting _id!
        if (update.hasOwnProperty(key) && key !== '_id')
          doc[key] = update[key];
      return doc;
    },

    /**
     * Removes 'fields' from the current document.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the document to update,
     * @param {Update}     the 'fields' to be removed from the document,
     * @returns {Object}   the modified document,
     * @since 0.0.1
     */
    _unset: function(doc, update) {
      var key
        ;

      for (key in update)
        // Prevent removing inherited properties and _id!
        if (update.hasOwnProperty(key) && key !== '_id')
          delete doc[key];
      return doc;
    },

    /**
     * Replaces the current document by a new one.
     * (but keeping the same '_id')
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the document to replace,
     * @param {Update}     the new document,
     * @returns {Object}   the modified document,
     * @since 0.0.1
     */
    _replace: function(doc, update) {
      var key
        ;

      // We want to keep the property '_id' as the first item in the doc
      // object. So, we won't replace the old doc by the new one but we add
      // the item of the new doc to the current doc after having deleted all
      // items except '_id'.

      // Delete all the properties from the doc. except '_id':
      for (key in doc)
        if (key !== '_id')
          delete doc[key];

      // Update the doc and return :
      for (key in update)
        // Prevent adding inherited properties and overwriting _id!
        if (update.hasOwnProperty(key) && key !== '_id')
          doc[key] = update[key];
      return doc;
    },

    /**
     * Updates this document.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the document to update,
     * @param {Update}     the 'fields' to be updated and their new values,
     * @returns {Object}   the modified document,
     * @since 0.0.1
     */
    _updateThisDoc: function(doc, update) {
      var keys = _.keys(update)
        ;

      if (keys[0] === '$set')
        return _update._set(doc, update['$set']);

      if (keys[0] === '$unset')
        return _update._unset(doc, update['$unset']);

      return _update._replace(doc, update);

    },

    /**
     * Updates one or several documents.
     *
     * @function (arg1, arg2, arg3, arg4, arg5, arg6)
     * @private
     * @param {Object}     the database object,
     * @param {Object}     the query object,
     * @param {Update}     the 'fields' to be updated,
     * @param {Options}    the settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    _update: function (db, eventQ, query, update, options, callback) {
      var docOut
        , i
        ;

      // Test if query seems valid:
      if (_.isArray(query) || _.isFunction(query) || !_.isObject(query)) {
        if (callback)
          callback('filter is not a valid object!');
        return;
      }

      // Test if update seems valid:
      if (_.isArray(update) || _.isFunction(update) || !_.isObject(update)) {
        if (callback)
          callback('update is not a valid object!');
        return;
      }

      // Parse the doc db:
      docOut = [];
      for (i = 0; i < db.data.length; i++)
        if (_query.isMatch(db.data[i], query)) {
          docOut.push(_update._updateThisDoc(db.data[i], update));
          if (!options.many)
            break;
        }

      // Fire an event and execute callback:
      _event.fire(eventQ, 'change', docOut);
      _event.fire(eventQ, 'update', docOut);
      if (callback)
        callback(null, docOut);
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Updates one or several documents.
     *
     * @function (arg1, arg2, arg3, arg4, arg5, arg6)
     * @public
     * @param {Object}     the context object,
     * @param {Boolean}    true if all the matching documents should be updated,
     *                     false if only the first matching document should be,
     * @param {Object}     the query object,
     * @param {Update}     the 'fields' to be updated,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
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
      if (_.isArray(options) || !_.isObject(options))
        options = {};

      // Try to update the document:
      options.many = many;
      _update._update(db, eventQ, query, update, options, callback);

    }
  };

  /**
   * picodb.js is the entry point of PicoDB. All the public methods are defined in
   * this file.
   *
   * @namespace _
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  /**
   * Private functions:
   *  . _init                initializes the database,
   *
   * Public methods:
   *  . Create                    the constructor,
   *  . count                     counts the documents into the db that match,
   *  . deleteMany                deletes the documents into the db that match,
   *  . deleteOne                 deletes the first (the oldest) document into the db that matches,
   *  . insertMany                inserts an array of documents into the db,
   *  . insertOne                 inserts a single document into the db,
   *  . updateMany                updates many documents into the db,
   *  . updateOne                 updates many documents into the db,
   *  . find                      finds the searched documents,
   *  . toArray                   returns the found documents in an array,
   *  . addEventListener          registers the specified listener on the event it's called on,
   *  . addOneTimeEventListener   registers the specified listener on the event it's called on for a one-time event,
   *  . removeEventListener       removes the event listener previously registered with addEventListener,
   *  . on                        alias on addEventListener,
   *  . one                       alias on addOneTimeEventListener,
   *  . off                       alias on removeEventListener,
   */

  /* Private Functions ------------------------------------------------------ */

  var _init = function(_this) {

    // Attach schema:
    _this.db = _insert._schema();
    // Attach event Queue:
    _this.eventQ = _event.setEventListenerList();
  };

   /**
    * PicoDB constructor (implements the factory pattern).
    *
    * @constructor ()
    * @public
    * @param {}           -,
    * @returns {Object}   returns the database object,
    * @since 0.0.1
    */
  PicoDB.Create = function() {
    this.db;              // the database container,

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
    var count = function(query, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 1)
        return;
      _count.count(this, query, options, callback);
    };

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
    var deleteMany = function(filter, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 1)
        return;
      _delete.delete(this, true, filter, options, callback);
    };

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
    var deleteOne = function(filter, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 1)
        return;
      _delete.delete(this, false, filter, options, callback);
    };

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
    var insertMany = function(docs, options, callback) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      // Return silently if they are too few arguments:
      if (arguments.length < 1)
        return;
      _insert.insert(this, true, docs, options, callback);
    };

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
    var insertOne = function(doc, options, callback) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      // Return silently if they are too few arguments:
      if (arguments.length < 1)
        return;
      _insert.insert(this, false, doc, options, callback);
    };

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
    var updateMany = function(query, update, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 2)
        return;
      _update.update(this, true, query, update, options, callback);
    };

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
    var updateOne = function(query, update, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 2)
        return;
      _update.update(this, false, query, update, options, callback);
    };

    /**
     * Finds the searched documents.
     *
     * @method (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Object}   returns this,
     * @since 0.0.1
     */
    var find = function(query) {
      query = query || {};

      // Return silently if the database isn't initialized:
      if (!this.db)
        return this;

      // Searches documents that match the query:
      _find.find(this, query);
      return this;
    };

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
    var toArray = function(callback) {
      // Return silently if the database isn't initialized:
      if (!this.db)
        return;

      _find.toArray(this, callback);
    };

    /**
     * Registers the specified listener on the event it's called on.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the type of event,
     * @param {function}  the event listener,
     * @returns {}        -,
     * since 0.1
     */
    var addEventListener = function(type, listener) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      _event.addEventListener(this.eventQ, type, listener);
    };

    /**
     * Registers the specified listener on the event it's called on for a one-time event.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the type of event,
     * @param {function}  the event listener,
     * @returns {}        -,
     * since 0.1
     */
    var addOneTimeEventListener = function(type, listener) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      _event.addOneTimeEventListener(this.eventQ, type, listener);
    };

    /**
     * Removes the event listener previously registered with addEventListener.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the type of event,
     * @param {function}  the event listener,
     * @returns {}        -,
     * since 0.1
     */
    var removeEventListener = function(type, listener) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      _event.removeEventListener(this.eventQ, type, listener);
    };

    // Return the object:
    return {
      count: count,
      deleteMany: deleteMany,
      deleteOne: deleteOne,
      insertMany: insertMany,
      insertOne: insertOne,
      updateMany: updateMany,
      updateOne: updateOne,
      find: find,
      toArray: toArray,

      addEventListener: addEventListener,
      addOneTimeEventListener: addOneTimeEventListener,
      removeEventListener: removeEventListener,
      on: addEventListener,
      one: addOneTimeEventListener,
      off: removeEventListener
    };
  };

  // Just return a value to define the module export.
  // This returns the library name.
  return PicoDB;
}));
