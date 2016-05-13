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
   *  . _isHavingNotOperator returns object keys of the not ($ne, $nin) operators if any,
   *  . _isQueryOperator     checks if the object is a query operator,
   *  . _isMatch             checks if this document into the db contains the filter keys/values,
   *  . _isMatchOp           checks if the document value matches with the query value,
   *
   * Public functions:
   *  . isHavingNotOperator  returns object keys of the not ($ne, $nin) operators if any,
   *  . isMatch              checks if the document matches,
   */
  _query = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Returns object keys of the not ($ne, $nin) operators if any.
     *
     * @function (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Array}    returns the list of objects keys for not operators or
     *                     false,
     * @since 0.0.1
     */
    _isHavingNotOperator: function(query) {
      var op = ['$ne', '$nin']
        , key
        , not
        , re
        , x
        , i
        ;

      not = [];
      for (key in query) {

        for (i = 0; i < op.length; i++) {
          re = new RegExp('"\\' + op[i] + '":');
          x = JSON.stringify(query[key]).match(re);
          if (x)
            not.push(key);
        }
      }
      return not.length !== 0 ? not : false;
    },

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
        /* istanbul ignore next */
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

        // If there is no operator. It means equality:
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

        case '$ne':
          // This is correct! For $ne we save the documents that do not match.
          // This include documents that do not contain the field.
          if (docValue !== query['$ne']) return true; else return false;

        case '$in':
          if (_.isArray(docValue))
            return _.share(query['$in'], docValue);
          else
            return _.contains(query['$in'], docValue);

        case '$nin':
          if (_.isArray(docValue))
            return !_.share(query['$nin'], docValue);
          else
            return !_.contains(query['$nin'], docValue);

        default:
          /* istanbul ignore next */
          throw new Error('_query._isMatchOp: must never occur!');
      }
    },

    /**
     * Checks if this document into the db contains the filter keys/values.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}    a set of key/value pairs,
     * @param {Object}    the document to analyze,
     * @param {Object}    the objects keys of the not operators,
     * @returns {Boolean} returns true if all the key/values pairs are found,
     *                    false otherwise,
     * @since 0.0.1
     */
    _isMatch: function(doc, query, not) {
      var level = 0
        , rootKey
        ;

      // Parse the query object recursively and check if the document has the
      // field on which the test will apply or has/hasn't for the not
      // operators.
      function find(doc, query) {
        var key
          , op
          ;

        for (key in query) {
          if (level === 0) rootKey = key;

          if (!doc[key])
            if (!not || !_.contains(not, rootKey)) return false; else continue;

          op = _query._isQueryOperator(query[key]);
          if (_.isObject(query[key]) && !op) {
            level += 1;
            if (!find(doc[key], query[key])) return false; else level -= 1;
          } else {
            if (!_query._isMatchOp(op, doc[key], query[key])) return false;
          }
        }
        return true;
      }

      return find(doc, query);
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Returns object keys of the not ($ne, $nin) operators if any.
     *
     * @function (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Array}    returns the list of objects keys for not operators or
     *                     false,
     * @since 0.0.1
     */
    isHavingNotOperator: function(query) {
      return _query._isHavingNotOperator(query);
    },

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
    isMatch: function(doc, query, not) {
      return _query._isMatch(doc, query, not);
    }
  };
