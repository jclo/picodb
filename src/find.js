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
        , sop   = _query.isHavingSpecialOperator(query)
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
        if (_query.isMatch(db.data[i], query, sop))
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
