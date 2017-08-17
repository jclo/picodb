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
        query: {},
        projection: {
          type: null,
          value: null
        }
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
      var query      = dbO.cursor.query
        , projection = dbO.cursor.projection
        , db         = dbO.db
        , sop        = _query.isHavingSpecialOperator(query)
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
          _project.add(docs, db.data[i], projection);
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
     * @param {Object}     the projection object,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    /* eslint-disable no-param-reassign */
    find: function(_this, query, projection) {
      if (!_this.cursor)
        _this.cursor = _find._initCursor();

      // Save the query and the projection:
      _this.cursor.query = !_.isArray(query) && _.isObject(query)
        ? query
        : {};

      if (!_.isArray(projection) && _.isObject(projection)) {
        _this.cursor.projection.type = _project.isProjectionTypeInclude(projection);
        _this.cursor.projection.value = _project.setProjection(projection, _this.cursor.projection.type);
      } else {
        _this.cursor.projection.value = {};
      }
    }, /* eslint-enable no-param-reassign */

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
