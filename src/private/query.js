/** ************************************************************************
 *
 * Performs the query.
 *
 * query.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _isHavingNotOperator        returns object keys of the not,
 *  . _isHavingANDandOROperators  returns the query array if $and and $or operator,
 *  . _isHavingAndorOrOperator    returns the query array if $and or $or operator,
 *  . _isHavingSpecialOperator    returns special operators or false,
 *  . _isConditionTrue            checks if the document meets the condition,
 *  . _areConditionsTrue          checks if the document meets all the conditions,
 *  . _query                      checks if the document matches the query,
 *  . _isMatch                    checks if the document matches,
 *
 *
 * Public Static Methods:
 *  . isHavingSpecialOperator     returns an object if any special operators,
 *  . isMatch                     checks if the document matches,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import _ from '../lib/_';
import Geo from './geo';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------


/**
 * Returns object keys of the not ($ne, $nin) operators if any.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the query object,
 * @returns {Array}         returns the list of objects keys for not operators,
 * @since 0.0.0
 */
/* eslint-disable dot-notation */
function _isHavingNotOperator(query) {
  const op  = ['$ne', '$nin', '$not']
      , not = []
      ;

  if (_.contains(_.keys(query), '$or')) {
    const qar = query['$or'];
    for (let i = 0; i < qar.length; i++) {
      _.forPropIn(qar[i], (key) => {
        for (let j = 0; j < op.length; j++) {
          // const re = new RegExp('"\\' + op[j] + '":');
          const re2 = new RegExp(`"\\${op[j]}":`);
          const x = JSON.stringify(qar[i]).match(re2);
          if (x) {
            not.push(key);
          }
        }
      });
    }
  } else {
    _.forPropIn(query, (key) => {
      for (let j = 0; j < op.length; j++) {
        // const re = new RegExp('"\\' + op[j] + '":');
        const re2 = new RegExp(`"\\${op[j]}":`);
        const x = JSON.stringify(query[key]).match(re2);
        if (x) {
          not.push(key);
        }
      }
    });
  }
  return not.length !== 0 ? not : false;
}
/* eslint-enable dot-notation */

/**
 * Returns the query array if $and and $or operator.
 *
 * Nota:
 * It searchs if a query is an $and with an array of $or operators
 * like that:
 *  . { $and : [{ $or: [{...}, {...}] }, { $or: [{...}, {...}] } }
 *
 * @function (arg1)
 * @private
 * @param {Object}          the query object,
 * @returns {Array}         returns the query array or false,
 * @since 0.0.0
 */
function _isHavingANDandOROperators(query) {
  if (!query.$and || !_.isArray(query.$and) || !query.$and[0] || !query.$and[0].$or) {
    return false;
  }

  let match = true;
  let keys;
  for (let i = 0; i < query.$and.length; i++) {
    keys = Object.keys(query.$and[i]);
    if (keys.length > 1 || !query.$and[i].$or || !_.isArray(query.$and[i].$or)) {
      match = false;
      break;
    }

    // Check that all $or elements are objects:
    for (let j = 0; j < query.$and[i].$or.length; j++) {
      if (!_.isLiteralObject(query.$and[i].$or[j])) {
        match = false;
        break;
      }
    }
    if (!match) break;
  }
  return match ? query.$and : false;
}

/**
 * Returns the query array if $and or $or operator.
 *
 * Nota:
 * Must be $and or $or like that:
 *  . { $and: [{ a: { $eq: 1}}, { b: { $eq: 2 }}] }] }
 *  . { or: [{ a: { $eq: 1}}, { b: { $eq: 2 }}] }] }
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the query object,
 * @param {String}          the operator,
 * @returns {Array}         returns the query array or false,
 * @since 0.0.0
 */
function _isHavingAndorOrOperator(query, op) {
  if (!query[op] || !_.isArray(query[op]) || !query[op][0]) return false;

  // Check that isn't the structure of $and: [{ $or: [{}]}]
  if (query.$and && query.$and[0].$or) return false;

  // Check that all $and or $or elements are objects:
  let match = true;
  for (let i = 0; i < query[op].length; i++) {
    if (!_.isLiteralObject(query[op][i])) {
      match = false;
      break;
    }
  }
  return match ? query[op] : false;
}

/**
 * Returns special operators or false.
 *
 * Nota:
 * query must be:
 *  . { $and: [{ $or: [...] }, { $or: [...] }] }
 *  . { $and: [{ a: { $eq: 1}}, { b: { $eq: 2 }}] }] }
 *  . { $or: [{ a: { $eq: 1}}, { b: { $eq: 2 }}] }] }
 *  . { a: { $ne: 2 }, b: { $nin: ['A', 'B'] }, c: { $not: { $eq: 1 }}}
 *
 * @function (arg1)
 * @private
 * @param {Object}          the query object,
 * @returns {Object}        returns the special operators.
 * @since 0.0.0
 */
function _isHavingSpecialOperator(query) {
  return {
    andor: _isHavingANDandOROperators(query),
    and: _isHavingAndorOrOperator(query, '$and'),
    or: _isHavingAndorOrOperator(query, '$or'),
    not: _isHavingNotOperator(query),
  };
}

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
 * @since 0.0.0
 */
function _isConditionTrue(obj, source, op) {
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
      /* eslint-disable-next-line no-use-before-define */
      return !_areConditionsTrue(obj, source);

    // Element Operators:
    case '$exists':
      return source;

      // Evaluation Operators:
      // --

    // Geospatial Operators:
    case '$geoWithin':
      return Geo.query(obj, { $geoWithin: source });

    case '$geoIntersects':
      return Geo.query(obj, { $geoIntersects: source });

    case '$near':
      return Geo.query(obj, { $near: source });

    /* istanbul ignore next */
    case '$nearSphere':
      return Geo.query(obj, { $nearSphere: source });

      // Array Operators:
      // --

      // Bitwise Operators:
      // --

      // Comments Operators:
      // --

    /* istanbul ignore next */
    default:
      throw new Error(
        `Query._isConditionTrue: the operator "${op}" is unknown!`,
      );
  }
}

/**
 * Checks if the document meets all the conditions.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String/Number}   the document value,
 * @param {Object}          the conditions,
 * @returns {Boolean}       returns true if it matches, false otherwise,
 * @since 0.0.0
 */
/* eslint-disable no-restricted-syntax */
function _areConditionsTrue(obj, source) {
  let prop;

  // Without an Operator:
  if (!_.isArray(source) && !_.isObject(source)) {
    if (obj === source) {
      return true;
    }
    return false;
  }

  // With an Operator:
  for (prop in source) {
    if (!_isConditionTrue(obj, source[prop], prop)) {
      return false;
    }
  }
  return true;
}
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
 * @param {Object}          the document,
 * @param {Object}          the query,
 * @param {Object}          the special operator object,
 * @returns {Boolean}       returns true if the conditions are met,
 * @since 0.0.0
 */
/* eslint-disable no-shadow, no-restricted-syntax, no-continue, guard-for-in,
  no-else-return */
function _query(obj, source, op) {
  let level = 0
    , rootKey
    ;

  // Parse the query object recursively and check if the document has the
  // field on which the test will apply or has/hasn't for the not
  // operators.
  function parse(obj, source) {
    let prop;

    for (prop in source) {
      if (level === 0) {
        rootKey = prop;
      }

      // if (!obj[prop]) {
      if (obj[prop] === undefined) {
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
      } else if (!_areConditionsTrue(obj[prop], source[prop])) {
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
}

/**
 * Checks if the document matches.
 *
 * @method (arg1, arg2, arg3)
 * @public
 * @param {Object}          the document,
 * @param {Object}          the query object,
 * @param {Object}          special operator object,
 * @returns {Boolean}       returns true if the object matches,
 * @since 0.0.0
 */
function _isMatch(doc, query, sop) {
  if (!sop.andor && !sop.and && !sop.or) {
    return _query(doc, query, sop);
  }

  if (sop.and) {
    // matches if all the conditions match.
    for (let i = 0; i < query.$and.length; i++) {
      if (!_query(doc, query.$and[i], sop)) {
        return false;
      }
    }
    return true;
  }

  if (sop.or) {
    // matches if at least one condition matches.
    for (let i = 0; i < query.$or.length; i++) {
      if (_query(doc, query.$or[i], sop)) {
        return true;
      }
    }
    return false;
  }

  if (sop.andor) {
    // matches if all the $or conditions match.
    const match = [];
    for (let i = 0; i < query.$and.length; i++) {
      for (let j = 0; j < query.$and[i].$or.length; j++) {
        if (_query(doc, query.$and[i].$or[j], sop)) {
          match.push(1);
          break;
        }
      }
    }
    return match.length === query.$and.length;
  }

  /* istanbul ignore next */
  return false;
}


// -- Public Static Methods ------------------------------------------------

const Query = {

  /**
   * Returns an object if any special operators.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the query object,
   * @returns {Array}       returns the list of objects keys for not operators,
   * @since 0.0.0
   */
  isHavingSpecialOperator(query) {
    return _isHavingSpecialOperator(query);
  },

  /**
   * Checks if the document matches.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}        the document,
   * @param {Object}        the query object,
   * @param {Object}        special operator object,
   * @returns {Boolean}     returns true if the object matches, false otherwise,
   * @since 0.0.0
   */
  isMatch(doc, query, sop) {
    return _isMatch(doc, _.normalize(query), sop);
  },
};


// -- Export
export default Query;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
