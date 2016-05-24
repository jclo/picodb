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
   *  . _apply               applies the requested update to the document,
   *  . _replace             replaces the document content,
   *  . _applyTime           updates or adds the time fields to the document,
   *  . _updateThisDoc       updates this document,
   *  . _update              updates one or several documents,
   *
   * Public functions:
   *  . update               updates one or several documents,
   */
  _update = {


    /* Private Functions ---------------------------------------------------- */

    /**
     * Applies the requested update to the document.
     *
     * Note: this function mutates the argument `obj`.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}     the destination document,
     * @param {Object}     the source document,
     * @param {String}     the Update Operator,
     * @returns {Object}   the modified document,
     * @throws {Object}    throws an error if the operator is unknown,
     * @since 0.0.1
     */
    _apply: function(obj, source, op) {
      var prop
        ;

      for (prop in source) {
        if (!_.isArray(source[prop]) && _.isObject(source[prop])) {
          if (!obj[prop] && (op === '$rename' || op === '$unset'))
            break;
          else if (!obj[prop])
            obj[prop] = {};
          _update._apply(obj[prop], source[prop], op);
        } else {
          if (hasOwnProperty.call(source, prop)) {
            if (_.isArray(source[prop]))
              obj[prop] = _.clone(source[prop]);
            else
              switch (op) {
                case '$inc':
                  if (typeof obj[prop] === 'number')
                    obj[prop] += source[prop];
                  else
                    obj[prop] = source[prop];
                  break;

                case '$mul':
                  if (typeof obj[prop] === 'number')
                    obj[prop] *= source[prop];
                  else
                    obj[prop] = 0;
                  break;

                case '$rename':
                  if (obj[prop]) {
                    obj[source[prop]] = obj[prop];
                    delete obj[prop];
                  }
                  break;

                case '$set':
                  obj[prop] = source[prop];
                  break;

                case '$unset':
                  if (obj[prop])
                    delete obj[prop];
                  break;

                case '$min':
                  if (!obj[prop] || (typeof obj[prop] === 'number' && source[prop] < obj[prop]))
                    obj[prop] = source[prop];
                  break;

                case '$max':
                  if (!obj[prop] || (typeof obj[prop] === 'number' && source[prop] > obj[prop]))
                    obj[prop] = source[prop];
                  break;

                /* istanbul ignore next */
                default:
                  throw new Error('_update._apply: the operator "' + op + '" is unknown!');
              }
          }
        }
      }
      return obj;
    },

    /**
     * Replaces the document content.
     *
     * Note: this function mutates the argument `obj`.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the destination document,
     * @param {Object}     the source document,
     * @returns {Object}   the modified document,
     * @since 0.0.1
     */
    _replace: function(obj, source) {
      obj = _.extend({ _id: obj._id }, source);
      return obj;
    },

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
   * @param {Object}     the destination document,
   * @param {Object}     the source document,
   * @returns {Object}   the modified document,
   * @since 0.0.1
   */
    _applyTime: function(obj, source) {
      var prop
        , subprop
        ;

      for (prop in source) {
        subprop = _.keys(source[prop])[0];
        if (_.isObject(source[prop]) && subprop !== '$type') {
          if (!obj[prop])
            obj[prop] = {};
          _update._applyTime(obj[prop], source[prop]);
        } else {
          if (hasOwnProperty.call(source, prop))
            if (source[prop][subprop] === 'timestamp')
              obj[prop] = Date.now();
            else
              obj[prop] = new Date().toISOString();
        }
      }
      return obj;
    },

    /**
     * Updates this document.
     *
     * Note: this function mutates the argument `doc`.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the document to update,
     * @param {Object}     the 'fields' to be updated and their new values,
     * @returns {Object}   the modified document,
     * @throws {Object}    throws an error if the operator is unknown or not supported,
     * @since 0.0.1
     */
    _updateThisDoc: function(doc, update) {
      var keys = _.keys(update)
        ;

      if (!keys[0].match(/^\$/))
        return _update._replace(doc, update);

      switch (keys[0]) {
        case '$inc':
          return _update._apply(doc, update['$inc'], '$inc');

        case '$mul':
          return _update._apply(doc, update['$mul'], '$mul');

        case '$rename':
          return _update._apply(doc, update['$rename'], '$rename');

        case '$set':
          return _update._apply(doc, update['$set'], '$set');

        case '$unset':
          return _update._apply(doc, update['$unset'], '$unset');

        case '$min':
          return _update._apply(doc, update['$min'], '$min');

        case '$max':
          return _update._apply(doc, update['$max'], '$max');

        case '$currentDate':
          return _update._applyTime(doc, update['$currentDate']);

        /* istanbul ignore next */
        default:
          throw new Error('The Update Operator "' + keys[0] + '" isn\'t supported!');
      }
    },

    /**
     * Updates one or several documents.
     *
     * @function (arg1, arg2, arg3, arg4, arg5, arg6)
     * @private
     * @param {Object}     the database object,
     * @param {Object}     the query object,
     * @param {Object}     the 'fields' to be updated,
     * @param {Options}    the settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    _update: function (db, eventQ, query, update, options, callback) {
      var sop = _query.isHavingSpecialOperator(query)
        , o
        , docOut
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
        if (_query.isMatch(db.data[i], query, sop)) {
          o = _update._updateThisDoc(db.data[i], update);
          // Do not copy the references. Clone the object instead!
          docOut.push(_.extend({}, o));
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
     * @param {Object}     the 'fields' to be updated,
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
