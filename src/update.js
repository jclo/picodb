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
   /* global _, _event */
   /* eslint  max-len: [1, 120, 1], curly: 0 */
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
        // Prevent removing inherited properties and  _id!
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
     * @param {Object}     the filtering object,
     * @param {Update}     the 'fields' to be updated,
     * @param {Options}    the settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    _update: function (db, eventQ, filter, update, options, callback) {
      var docOut
        , i
        ;

      // Test if filter seems valid:
      if (_.isArray(filter) || _.isFunction(filter) || !_.isObject(filter)) {
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
        if (_query.isMatch(db.data[i], filter)) {
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
     * @param {Object}     the filtering object,
     * @param {Update}     the 'fields' to be updated,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    update: function(_this, many, filter, update, options, callback) {
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
      _update._update(db, eventQ, filter, update, options, callback);

    }
  };
