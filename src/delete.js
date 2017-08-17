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
    /* eslint-disable no-param-reassign */
    _delete: function(db, eventQ, filter, options, callback) {
      var sop = _query.isHavingSpecialOperator(filter)
        , removed
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
      // for (i = db.data.length - 1; i >= 0; i--) {
      for (i = 0; i < dblength; i++) {
        if (_query.isMatch(db.data[i], filter, sop)) {
          // Remove the document that matches:
          docOut.push(db.data.splice(i, 1));
          removed += 1;
          // Readjust db length after one item has been removed & reposition i:
          i -= 1;
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
      // return;
    }, /* eslint-enable no-param-reassign */


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
      if (_.isArray(options) || !_.isObject(options))
        options = {};

      options.many = many;
      _delete._delete(db, eventQ, filter, options, callback);
    } /* eslint-enable no-param-reassign */
  };
