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
   *  . _isHavingNotOperator      returns object keys of the not ($ne, $nin) operators if any,
   *  . _isHavingOrOperator       returns the query array if $or operator,
   *  . _isHavingSpecialOperator  returns special operators or false,
   *  . _isQueryOperator          checks if the object is a query operator,
   *  . _isMatch                  checks if this document into the db contains the filter keys/values,
   *  . _isMatchOp                checks if the document value matches with the query value,
   *
   * Public functions:
   *  . isHavingSpecialOperator   returns special operators or false,
   *  . isMatch                   checks if the document matches,
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
      var op = ['$ne', '$nin', '$not']
        , qar
        , key
        , not
        , re
        , x
        , i
        , j
        ;

      not = [];
      if (_.contains(_.keys(query), '$or')) {
        qar = query['$or'];
        for (i = 0; i < qar.length; i++) {
          for (key in qar[i]) {
            for (j = 0; j < op.length; j++) {
              re = new RegExp('"\\' + op[j] + '":');
              x = JSON.stringify(qar[i]).match(re);
              if (x)
                not.push(key);
            }
          }
        }
      } else {
        for (key in query) {
          for (j = 0; j < op.length; j++) {
            re = new RegExp('"\\' + op[j] + '":');
            x = JSON.stringify(query[key]).match(re);
            if (x)
              not.push(key);
          }
        }
      }
      return not.length !== 0 ? not : false;
    },

    /**
     * Returns the query array if $or operator.
     * (query: { $or: [ { a: { $eq: 1}}, { b: { $eq: 2 }}] })
     *
     * @function (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Array}    returns the query array or false,
     * @since 0.0.1
     */
    _isHavingOrOperator: function(query) {
      return (!query['$or'] || !_.isArray(query['$or'])) ? false : query['$or'];
    },

    /**
     * Returns special operators or false.
     *
     * @function (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Object}   returns the special operators.
     * @since 0.0.1
     */
    _isHavingSpecialOperator: function(query) {
      return {
        not: _query._isHavingNotOperator(query),
        or: _query._isHavingOrOperator(query)
      };
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

      // List of supported operators:
      ops = [
        '$eq', '$gt', '$gte', '$lt', '$lte', '$ne', '$in', '$nin',
        '$exists',
        '$or', '$not'
      ];

      // Return false if undefined or null:
      if (!op || !op.match(/^\$/))
        return false;

      // Ok, the key starts with the symbol $. It's perhaps
      // a query operator:
      if (_.contains(ops, op))
        return op;
      /* istanbul ignore next */
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
     * @param {Object}    the query object,
     * @returns {Boolean} returns true if it matches, false otherwise,
     * @since 0.0.1
     */
    _isMatchOp: function(op, docValue, query) {

      switch (op) {

        // If there is no operator. It means $eq:
        case false:
          return docValue === query ? true : false;

        // Comparison Operators:
        case '$eq':
          return docValue === query['$eq'] ? true : false;

        case '$gt':
          return docValue > query['$gt'] ? true : false;

        case '$gte':
          return docValue >= query['$gte'] ? true : false;

        case '$lt':
          return docValue < query['$lt'] ? true : false;

        case '$lte':
          return docValue <= query['$lte'] ? true : false;

        case '$ne':
          return docValue !== query['$ne'] ? true : false;

        case '$in':
          return _.isArray(docValue)
            ? _.share(query['$in'], docValue)
            : _.contains(query['$in'], docValue);

        case '$nin':
          return _.isArray(docValue)
            ? !_.share(query['$nin'], docValue)
            : !_.contains(query['$nin'], docValue);


        // Element Operators:
        case '$exists':
          return query['$exists'] ? true : false;

        // Logical Operators:
        case '$not':
          return _query._isMatchOp(_.keys(query['$not'])[0], docValue, query['$not']) ? false : true;

        /* istanbul ignore next */
        default:
          throw new Error('_query._isMatchOp: must never occur!');
      }
    },

    /**
     * Checks if this document into the db contains the filter keys/values.
     *
     * Basic query:
     * The basic query is an object with a set of expressions { exp exp exp }
     * The implicit link between the expressions is AND. If an expression
     * fails, the whole query fails. Thus, as soon as an expression fails, the
     * search algorithm stops and returns false.
     *
     * Special operators $ne, $nin, $not:
     * With these operators, the query is successful if the expression is true or
     * if the document does not contain the field on which the expression is
     * applied. It is why, we need a special test, if the field does not exist,
     * to check if the operator is $ne/$nin/$not. In this case we don't abort the
     * loop, but we continue with the next expression.
     *
     * Special operator $or:
     * As said, the link between expressions is an implicit AND. With the
     * operator $or the implicit AND is replaced by an implicit OR.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}    a set of key/value pairs,
     * @param {Object}    the document to analyze,
     * @param {Object}    the special operator object,
     * @returns {Boolean} returns true if the key/values pairs are found,
     *                    false otherwise,
     * @since 0.0.1
     */
    _isMatch: function(doc, query, sop) {
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
          if (level === 0)
            rootKey = key;

          if (!doc[key])
            if (!sop.not || !_.contains(sop.not, rootKey))
              return false;
            else if (sop.or)
              return true;
            else
              continue;

          op = _query._isQueryOperator(query[key]);
          if (_.isObject(query[key]) && !op) {
            level += 1;
            if (sop.or) {
              if (find(doc[key], query[key]))
                return true;
            } else {
              if (!find(doc[key], query[key]))
                return false;
              else
                level -= 1;
            }
          } else {
            if (sop.or) {
              if (_query._isMatchOp(op, doc[key], query[key]))
                return true;
            } else {
              if (!_query._isMatchOp(op, doc[key], query[key]))
                return false;
            }
          }
        }
        return sop.or ? false : true; // return true;
      }

      return find(doc, query);
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Returns an object if any special operators.
     *
     * @function (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Array}    returns the list of objects keys for not operators or
     *                     false,
     * @since 0.0.1
     */
    isHavingSpecialOperator: function(query) {
      return _query._isHavingSpecialOperator(query);
    },

    /**
     * Checks if the document matches.
     *
     * @function (arg1, arg2, arg3)
     * @public
     * @param {Object}     the document,
     * @param {Object}     the query object,
     * @param {Object}     special operator object,
     * @returns {Boolean}  returns true if the object matches, false otherwise,
     * @since 0.0.1
     */
    isMatch: function(doc, query, sop) {
      var i
        ;

      // Basic query:
      if (!sop.or)
        return _query._isMatch(doc, query, sop);

      // Or query:
      for (i = 0; i < query['$or'].length; i++)
        if (_query._isMatch(doc, query['$or'][i], sop))
          return true;

      return false;
    }
  };
