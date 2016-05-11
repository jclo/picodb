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
   *  . isMatch              checks if this document into the db contains the filter keys/values,
   *
   * Public functions:
   *  . isMatch              checks if the document matches,
   */
  _query = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Checks if this document into the db contains the filter keys/values.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}    a set of key/value pairs,
     * @param {Object}    the document to analyze,
     * @return {Boolean}  returns true if all the key/values pairs are found,
     *                    false otherwise,
     * @since 0.0.1
     */
    _isMatch: function(doc, query) {

      // Parse the filter object recursively and check if
      // all items have identical counterparts into the
      // database. Comparison applies on boolean, string, number and arrays.
      function find(doc, query) {
        var keys
          ;

        for (keys in query) {
          if (!doc[keys]) {
            return false;
          }
          if (_.isObject(query[keys])) {
            if (!find(doc[keys], query[keys]))
              return false;
          } else {
            if ((doc[keys] !== query[keys]))
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
