/** ************************************************************************
 *
 * A set of functions to format the documents returned by toArray.
 *
 * projection.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _include                    returns an excerpt of the selected document,
 *  . _exclude                    returns an excerpt of the selected document,
 *
 *
 * Public Static Methods:
 *  . setProjection               sets the projection value,
 *  . isProjectionTypeInclude     returns the type of projection,
 *  . adds                        elements of the document to doc,
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


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Returns an excerpt of the selected document based on an include projection.
 *
 * Note:
 * It includes the fields listed in the projection with a value of 1. the
 * unknown fields or the fields with a value other than 1 are ignored.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the selected document,
 * @param {Object}          the projection to apply,
 * @param {Object}          the initial value of the document excerpt,
 * @returns {Object}        the excerpt of the selected document,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _include(obj, source, data) {
  _.forPropIn(source, (prop) => {
    if (obj[prop]) {
      if (_.isObject(source[prop])) {
        data[prop] = {};
        _include(obj[prop], source[prop], data[prop]);
      } else if (source[prop] === 1) {
        if (_.isObject(obj[prop])) {
          data[prop] = _.clone(obj[prop]);
        } else if (obj[prop]) {
          data[prop] = obj[prop];
        }
      }
    }
  });
  return data;
}
/* eslint-enable no-param-reassign */

/**
 * Returns an excerpt of the selected document based on an exclude projection.
 *
 * Note:
 * It excludes the fields listed in the projection with a value of 0. The
 * unspecified fields are kept.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {Object}          the selected document,
 * @param {Object}          the projection to apply,
 * @param {Object}          the initial value of the document excerpt,
 * @returns {Object}        the excerpt of the selected document,
 * @since 0.0.1
 */
/* eslint-disable no-param-reassign */
function _exclude(obj, source, data) {
  _.forPropIn(obj, (prop) => {
    if (source[prop] !== undefined) {
      if (_.isObject(source[prop])) {
        data[prop] = {};
        _exclude(obj[prop], source[prop], data[prop]);
      }
    } else if (_.isObject(obj[prop])) {
      data[prop] = _.clone(obj[prop]);
    } else {
      data[prop] = obj[prop];
    }
  });
  return data;
}
/* eslint-enable no-param-reassign */


// -- Public Static Methods ------------------------------------------------

const Proj = {

  /**
   * Sets the projection value.
   *
   * Note:
   * If it is an include projection, the _id field is explicitely defined
   * in the projection.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the projection,
   * @param {Boolean}       the current type,
   * @returns {Object}      the updated projection,
   * @since 0.0.0
   */
  setProjection(projection, type) {
    if (!type) {
      return projection;
    }

    if (projection._id !== undefined) {
      return projection;
    }
    return _.extend({ _id: 1 }, projection);
  },

  /**
   * Returns the type of projection.
   *
   * Note:
   * If one 'field' is equal to 1, it's an include projection. It means that
   * only the fields defined in the projection, and equal to 1, are included
   * in the output.
   *
   * By default, '_id' is included except if it is explicitely defined to be
   * excluded in the projection (_id: 0).
   *
   * If all the fields in the projection are equal to 0, it's an exclude
   * projection. It means that only these fields are removed from the output.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the projection,
   * @returns {Boolean}     true if it is an include projection,
   * @since 0.0.0
   */
  /* eslint-disable no-restricted-syntax */
  isProjectionTypeInclude(projection) {
    let prop;
    for (prop in projection) {
      if (_.isObject(projection[prop])) {
        if (this.isProjectionTypeInclude(projection[prop])) {
          return true;
        }
      } else if (projection[prop]) {
        return true;
      }
    }
    return false;
  },
  /* eslint-enable no-restricted-syntax */

  /**
   * Adds elements of the document to doc in accordance with projection.
   *
   * Note: this function mutates the argument `doc`.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}        the current list of documents already selected,
   * @param {Object}        the current document,
   * @param {Object}        the projection object,
   * @returns {}            -,
   * @since 0.0.0
   */
  add(doc, data, projection) {
    // If projection is empty means no filtering of the output!
    if (_.isEmpty(projection.value)) {
      doc.push(_.clone(data));
    } else if (projection.type) {
      doc.push(_include(data, projection.value, {}));
    } else {
      doc.push(_exclude(data, projection.value, {}));
    }
  },
};


// -- Export
export default Proj;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
