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
   *  . _pull                processes the $pull operator,
   *  . _push                processes the $push operator,
   *  . _apply               applies the requested update to the document,
   *  . _replace             replaces the document content,
   *  . _applyTime           updates or adds the time fields to the document,
   *  . _updateThisDoc       updates this document,
   *  . _update              updates one or several documents,
   *
   * Public functions:
   *  . update               updates one or several documents,
   */
  /* eslint-disable no-restricted-syntax, no-continue */
  _update = {


    /* Private Functions ---------------------------------------------------- */

    /**
     * Processes the $pull operator.
     * ({ $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } })
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
    _pull: function(obj, source) {
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
            _update._pull(obj[prop], source[prop]);
          }
        } else if (hasOwnProperty.call(source, prop)) {
          // If it doesn't exist or it isn't an array, go next:
          if (!obj[prop] || !_.isArray(obj[prop]))
            continue;

          // Boolean, Number or String, remove value:
          // (source be equivalent to: orders: 'y')
          if (typeof source[prop] === 'boolean' || typeof source[prop] === 'number' || typeof source[prop] === 'string') {
            index = obj[prop].indexOf(source[prop]);
            if (index > -1)
              obj[prop].splice(index, 1);
            continue;
          }

          // Object on Array, remove matching objects from array:
          // source be equivalent to: quantity: { a: 1, b: 2 })
          if (_.isObject(source[prop]) && !_.keys(source[prop])[0].match(/^\$/)) {
            // Parse objects:
            for (i = obj[prop].length - 1; i >= 0; i--) {
              if (!_.isObject(obj[prop][i]))
                break;

              // Do they match?
              match = true;
              for (key in source[prop]) {
                if (obj[prop][i][key] !== source[prop][key]) {
                  match = false;
                  break;
                }
              }
              if (match)
                obj[prop].splice(i, 1);
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
                if (index > -1)
                  obj[prop].splice(index, 1);
                break;

              case '$gt':
                for (i = obj[prop].length - 1; i >= 0; i--)
                  if (obj[prop][i] > source[prop]['$gt'])
                    obj[prop].splice(i, 1);
                break;

              case '$gte':
                for (i = obj[prop].length - 1; i >= 0; i--)
                  if (obj[prop][i] >= source[prop]['$gte'])
                    obj[prop].splice(i, 1);
                break;

              case '$lt':
                for (i = obj[prop].length - 1; i >= 0; i--)
                  if (obj[prop][i] < source[prop]['$lt'])
                    obj[prop].splice(i, 1);
                break;

              case '$lte':
                for (i = obj[prop].length - 1; i >= 0; i--)
                  if (obj[prop][i] <= source[prop]['$lte'])
                    obj[prop].splice(i, 1);
                break;

              case '$ne':
                for (i = obj[prop].length - 1; i >= 0; i--)
                  if (obj[prop][i] !== source[prop]['$ne'])
                    obj[prop].splice(i, 1);
                break;

              case '$in':
                if (!_.isArray(source[prop]['$in']))
                  break;

                for (i = 0; i < source[prop]['$in'].length; i++) {
                  index = obj[prop].indexOf(source[prop]['$in'][i]);
                  if (index > -1)
                    obj[prop].splice(index, 1);
                }
                break;

              case '$nin':
                if (!_.isArray(source[prop]['$nin']))
                  break;

                arr = [];
                for (i = 0; i < source[prop]['$nin'].length; i++) {
                  index = obj[prop].indexOf(source[prop]['$nin'][i]);
                  if (index > -1)
                    arr.push(source[prop]['$nin'][i]);
                }
                obj[prop] = _.clone(arr);
                break;

              /* istanbul ignore next */
              default:
                throw new Error('_update._pull: the operator "' + op + '" is not supported!');
            }
            continue;
          }
        }
      }
      return obj;
    },

    /**
     * Processes the $push operator.
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
    _push: function(obj, source) {
      var prop
        , subprop
        , position
        , slice
        , i
        ;

      for (prop in source) {
        if (!{}.hasOwnProperty.call(source, prop))
          continue;

        subprop = _.keys(source[prop]);
        if (!_.isArray(source[prop]) && _.isObject(source[prop]) && /* !_.contains(subprop, '$each')*/ !subprop[0].match(/^\$/)) {
          if (!obj[prop])
            obj[prop] = {};
          _update._push(obj[prop], source[prop]);
        } else if (hasOwnProperty.call(source, prop)) {
          if (!obj[prop])
            obj[prop] = [];

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
            if (position === undefined || typeof position !== 'number' || position < 0)
              position = obj[prop].length;

            // Slice:
            slice = source[prop]['$slice'];
            if (slice === undefined || typeof position !== 'number')
              slice = null;

            // Update the array from position:
            for (i = source[prop]['$each'].length - 1; i >= 0; i--)
              obj[prop].splice(position, 0, source[prop]['$each'][i]);

            // Slice the array
            if (slice > 0)
              obj[prop].splice(slice, obj[prop].length - slice);
            else if (slice === 0)
              obj[prop].length = 0;
            else if (slice < 0)
              obj[prop].splice(0, obj[prop].length + slice);
          }
        }
      }
      return obj;
    },

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
        , i
        , j
        ;

      for (prop in source) {
        if (!_.isArray(source[prop]) && _.isObject(source[prop])) {
          if (!obj[prop] && (op === '$rename' || op === '$unset' || op === '$pop'))
            break;
          else if (!obj[prop])
            obj[prop] = {};
          _update._apply(obj[prop], source[prop], op);
        } else if (hasOwnProperty.call(source, prop)) {
          // if (_.isArray(source[prop]))
            // obj[prop] = _.clone(source[prop]);
          // else
          switch (op) {

            // Field Operators:
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
              if (_.isArray(source[prop]))
                obj[prop] = _.clone(source[prop]);
              else
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

            // Array Operators:
            case '$pop':
              if (_.isArray(obj[prop]))
                if (source[prop] === 1)
                  obj[prop].pop();
                else if (source[prop] === -1)
                  obj[prop].shift();
              break;

            case '$pullAll':
              if (_.isArray(obj[prop]) && _.isArray(source[prop]))
                for (i = 0; i < source[prop].length; i++)
                  for (j = obj[prop].length - 1; j >= 0; j--)
                    if (obj[prop][j] === source[prop][i])
                      obj[prop].splice(j, 1);
              break;

            /* istanbul ignore next */
            default:
              throw new Error('_update._apply: the operator "' + op + '" is unknown!');
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
        if ({}.hasOwnProperty.call(source, prop)) {
          subprop = _.keys(source[prop])[0];
          if (_.isObject(source[prop]) && subprop !== '$type') {
            if (!obj[prop])
              obj[prop] = {};
            _update._applyTime(obj[prop], source[prop]);
          } else if (hasOwnProperty.call(source, prop)) {
            if (source[prop][subprop] === 'timestamp')
              obj[prop] = Date.now();
            else
              obj[prop] = new Date().toISOString();
          }
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

        // Field Operators:
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

        // Array Operators:
        case '$pop':
          return _update._apply(doc, update['$pop'], '$pop');

        case '$pullAll':
          return _update._apply(doc, update['$pullAll'], '$pullAll');

        case '$pull':
          return _update._pull(doc, update['$pull'], '$pull');

        case '$push':
          return _update._push(doc, update['$push'], '$push');

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
    _update: function(db, eventQ, query, update, options, callback) {
      var sop = _query.isHavingSpecialOperator(query)
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
          _update._updateThisDoc(db.data[i], update);
          // Do not copy the references. Clone the object instead!
          docOut.push(_.extend({}, db.data[i]));
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
  /* eslint-enable no-restricted-syntax, no-continue */
