  /**
   * project.js is an embedded library providing functions to format the output
   * format of a query.
   *
   * @namespace _project
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _project = {};

  /**
   * Private functions:
   *
   *  . _include                  returns an excerpt of the selected document based on an include projection,
   *  . _exclude                  returns an excerpt of the selected document based on an exclude projection,
   *
   * Public functions:
   *
   *  . setProjection             sets the projection value,
   *  . isProjectionTypeInclude   returns the type of projection,
   *  . add                       adds elements of the document to doc in accordance with projection,
   */
  _project = {


    /* Private Functions ---------------------------------------------------- */

    /**
     * Returns an excerpt of the selected document based on an include projection.
     *
     * Note:
     * It includes the fields listed in the projection with a value of 1. the
     * unknown fields or the fields with a value other than 1 are ignored.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}     the selected document,
     * @param {Object}     the projection to apply,
     * @param {Object}     the initial value of the document excerpt,
     * @returns {Object}   the excerpt of the selected document,
     * @since 0.0.1
     */
    _include: function(obj, source, data) {
      var prop
        ;

      for (prop in source) {
        if (!obj[prop])
          continue;

        if (_.isObject(source[prop])) {
          data[prop] = {};
          _project._include(obj[prop], source[prop], data[prop]);
        } else {
          if (source[prop] === 1)
            if (_.isObject(obj[prop]))
              data[prop] = _.clone(obj[prop]);
            else if (obj[prop])
              data[prop] = obj[prop];
        }
      }
      return data;
    },

    /**
     * Returns an excerpt of the selected document based on an exclude projection.
     *
     * Note:
     * It excludes the fields listed in the projection with a value of 0. The
     * unspecified fields are kept.
     *
     * @function (arg1, arg2, arg3)
     * @private
     * @param {Object}     the selected document,
     * @param {Object}     the projection to apply,
     * @param {Object}     the initial value of the document excerpt,
     * @returns {Object}   the excerpt of the selected document,
     * @since 0.0.1
     */
    _exclude: function(obj, source, data) {
      var prop
        ;

      for (prop in obj) {

        if (source[prop] === undefined) {
          if (_.isObject(obj[prop]))
            data[prop] = _.clone(obj[prop]);
          else
            data[prop] = obj[prop];
          continue;
        }

        if (_.isObject(source[prop])) {
          data[prop] = {};
          _project._exclude(obj[prop], source[prop], data[prop]);
        }
      }
      return data;
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Sets the projection value.
     *
     * Note:
     * If it is an include projection, the _id field is explicitely defined in
     * the projection.
     *
     * @function (arg1, arg2)
     * @public
     * @param {Object}     the projection,
     * @param {Boolean}    the current type,
     * @returns {Object}   the updated projection,
     * @since 0.0.1
     */
    setProjection: function(projection, type) {
      if (!type)
        return projection;

      if (projection['_id'] !== undefined)
        return projection;

      return _.extend({_id: 1}, projection);
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
     * @function (arg1)
     * @public
     * @param {Object}     the projection,
     * @returns {Boolean}  true if it is an include projection, false otherwise,
     * @since 0.0.1
     */
    isProjectionTypeInclude: function(projection) {
      var prop
        ;

      for (prop in projection) {
        if (_.isObject(projection[prop])) {
          if (_project.isProjectionTypeInclude(projection[prop]))
            return true;
        } else if (projection[prop])
          return true;
      }
      return false;
    },

   /**
    * Adds elements of the document to doc in accordance with projection.
    *
    * Note: this function mutates the argument `doc`.
    *
    * @function (arg1, arg2, arg3)
    * @public
    * @param {Object}     the current list of documents already selected,
    * @param {Object}     the current document,
    * @param {Object}     the projection object,
    * @returns {}         -,
    * @since 0.0.1
    */
    add: function(doc, data, projection) {

      // If projection is empty means no filtering of the output!
      if (_.isEmpty(projection.value))
        doc.push(_.clone(data));
      else if (projection.type)
        doc.push(_project._include(data, projection.value, {}));
      else
        doc.push(_project._exclude(data, projection.value, {}));
    }
  };
