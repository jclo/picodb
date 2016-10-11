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
   *  . _isConditionTrue          checks if the document meets the condition,
   *  . _areConditionsTrue        checks if the document meets all the conditions,
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
    /* eslint-disable no-loop-func */
    _isHavingNotOperator: function(query) {
      var op = ['$ne', '$nin', '$not']
        , qar
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
          _.forPropIn(qar[i], function(key) {
            for (j = 0; j < op.length; j++) {
              re = new RegExp('"\\' + op[j] + '":');
              x = JSON.stringify(qar[i]).match(re);
              if (x) {
                not.push(key);
              }
            }
          });
        }
      } else {
        _.forPropIn(query, function(key) {
          for (j = 0; j < op.length; j++) {
            re = new RegExp('"\\' + op[j] + '":');
            x = JSON.stringify(query[key]).match(re);
            if (x) {
              not.push(key);
            }
          }
        });
      }
      return not.length !== 0 ? not : false;
    },
    /* eslint-enable no-loop-func */

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
     * Checks if the document meets the condition.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {String/Number}   the document value,
     * @param {Object}          the condition,
     * @param {String}          the query operator,
     * @returns {Boolean}       returns true if it matches, false otherwise,
     * @throws {Object}         throws an error if the condition operator isn't recognized,
     * @since 0.0.1
     */
    _isConditionTrue: function(obj, source, op) {
      switch (op) {

        // Comparison Operators:
        case '$eq':
          return obj === source;

        case '$gt':
          return obj > source;

        case '$gte':
          return obj >= source;

        case '$lt':
          return obj < source;

        case '$lte':
          return obj <= source;

        case '$ne':
          return obj !== source;

        case '$in':
          return _.isArray(obj)
            ? !_.isEmpty(_.share(source, obj))
            : _.contains(source, obj);

        case '$nin':
          return _.isArray(obj)
            ? _.isEmpty(_.share(source, obj))
            : !_.contains(source, obj);

        // Logical Operators:
        case '$not':
          return !_query._areConditionsTrue(obj, source);

        // Element Operators:
        case '$exists':
          return source;

        // Evaluation Operators:
        // --

        // Geospatial Operators:
        case '$geoWithin':
          return _geo.query(obj, { $geoWithin: source });

        case '$geoIntersects':
          return _geo.query(obj, { $geoIntersects: source });

        case '$near':
          return _geo.query(obj, { $near: source });

        case '$nearSphere':
          return _geo.query(obj, { $nearSphere: source });

        // Array Operators:
        // --

        // Bitwise Operators:
        // --

        // Comments Operators:
        // --


        /* istanbul ignore next */
        default:
          throw new Error('_query._isConditionTrue: the operator "' + op + '" is unknown!');
      }
    },

    /**
     * Checks if the document meets all the conditions.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {String/Number}   the document value,
     * @param {Object}          the conditions,
     * @returns {Boolean}       returns true if it matches, false otherwise,
     * @since 0.0.1
     */
    /* eslint-disable no-restricted-syntax */
    _areConditionsTrue: function(obj, source) {
      var prop
        ;

      // Without an Operator:
      if (!_.isArray(source) && !_.isObject(source)) {
        if (obj === source)
          return true;

        return false;
      }

      // With an Operator:
      for (prop in source) {
        if (!_query._isConditionTrue(obj, source[prop], prop))
          return false;
      }
      return true;
    },
    /* eslint-enable no-restricted-syntax */

    /**
     * Checks if the document matches the query.
     *
     * The query looks like:
     *   { field: value | condition(s), field: value | condition(s), etc. }
     *
     * Basic query:
     * The basic query is an object with a set of pair of field/conditions.
     * The implicit link between each pair is an AND. If one condition fails,
     * the whole query fails. Thus, as soon as the first field doesn't match
     * the condition, the process stops and return false.
     *
     * Special operators $ne, $nin, $not:
     * With these operators, the query is successful if the field matches the
     * condition or it doesn't exist.
     *
     * Special operator $or:
     * As said, the link between field/conditions is an implicit AND. With the
     * operator $or the implicit AND is replaced by an implicit OR.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}    the document,
     * @param {Object}    the query,
     * @param {Object}    the special operator object,
     * @returns {Boolean} returns true if the conditions are met,
     * @since 0.0.1
     */
    /* eslint-disable no-shadow, no-restricted-syntax, no-continue */
    _query: function(obj, source, op) {
      var level = 0
        , rootKey
        ;

      // Parse the query object recursively and check if the document has the
      // field on which the test will apply or has/hasn't for the not
      // operators.
      function parse(obj, source) {
        var prop
          ;

        for (prop in source) {
          if (level === 0) {
            rootKey = prop;
          }

          if (!obj[prop]) {
            if (!op.not || !_.contains(op.not, rootKey)) {
              return false;
            } else if (op.or) {
              return true;
            }
            continue;
          }

          if (_.isObject(source[prop]) && !_.keys(source[prop])[0].match(/^\$/)) {
            level += 1;
            if (!parse(obj[prop], source[prop])) {
              level -= 1;
              if (!op.or) {
                return false;
              }
            } else if (op.or) {
              return true;
            }
          } else if (!_query._areConditionsTrue(obj[prop], source[prop])) {
            if (!op.or) {
              return false;
            }
          } else if (op.or) {
            return true;
          }
        }
        return !op.or;
      }

      return parse(obj, source);
    },
    /* eslint-enable no-shadow, no-restricted-syntax, no-continue */


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
        return _query._query(doc, query, sop);

      // Or query:
      for (i = 0; i < query['$or'].length; i++)
        if (_query._query(doc, query['$or'][i], sop))
          return true;

      return false;
    }
  };
