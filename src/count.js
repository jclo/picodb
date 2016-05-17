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
      var sop = _query.isHavingSpecialOperator(query)
        , count
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
        if (_query.isMatch(db.data[i], query, sop)) {
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
