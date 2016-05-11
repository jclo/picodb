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
