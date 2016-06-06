  /**
   * geo.js is an embedded library providing functions to make Geospatial
   * queries.
   *
   * @namespace _geo
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _geo = {};

  /**
   * Private functions:
   *   . _
   *
   * Public functions:
   *  . -
   */
  _geo = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Checks if the point is inside the polygon.
     *
     * The algorithm, determining the inclusion of a point P in a 2D planar polygon,
     * is based on the crossing number method.
     * This method counts the number of times a ray starting from the point P
     * crosses the polygon boundary edges. The point is outside when this
     * 'crossing number' is even; otherwise, when it is odd, the point is inside.
     * This method is sometimes referred to as the 'even-odd' test.
     * See here: http://geomalgorithms.com/a03-_inclusion.html#wn_PinPolygon()
     */
    _isPointInPolygon2: /* istanbul ignore next */ function(point, polygon) {
      var intersections
        , vertex1
        , vertex2
        , xinter
        , i
        ;

      // Check if the point is on a vertex:
      for (i = 0; i < polygon.length; i++) {
        if (point[0] === polygon[i][0] && point[1] === polygon[i][1])
          return 'vertex';
      }

      // Check if the point is inside the polygon or on the boundary:
      intersections = 0;

      for (i = 1; i < polygon.length; i++) {
        vertex1 = polygon[i - 1];
        vertex2 = polygon[i];

        // Check if the point is on an horizontal boundary:
        if (vertex1[1] === vertex2[1] && vertex1[1] === point[1]
            && point[0] > Math.min(vertex1[0], vertex2[0])
            && point[0] < Math.max(vertex1[0], vertex2[0])) {
          return 'boundary';
        }

        if (point[1] > Math.min(vertex1[1], vertex2[1])
            && point[1] <= Math.max(vertex1[1], vertex2[1])
            && point[0] <= Math.max(vertex1[0], vertex2[0])
            && vertex1[1] !== vertex2[1]) {
          xinter = (point[1] - vertex1[1]) * (vertex2[0] - vertex1[0]) / (vertex2[1] - vertex1[1]) + (vertex1[0]);
          // Check if the point is on a boundary other than the horizontal one:
          if (xinter === point[0])
            return 'boundary';
          if (vertex1[0] === vertex2[0] || point[0] <= xinter)
            intersections += 1;
        }
      }
      return intersections % 2 !== 0 ? 'inside' : 'outside';
    },

    /**
     * Checks if the point is inside the polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the coordinates of the point,
     * @param {Object}     the coordinates of the polygon,
     * @returns {Boolean}  returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.1
     */
    _isPointInPolygon: function(point, polygon) {
      var cn = 0
        , vt
        , i
        ;

      for (i = 0; i < polygon.length - 1; i++) {
        if (((polygon[i][1] <= point[1]) && (polygon[i + 1][1] > point[1]))
            || ((polygon[i][1] > point[1]) && (polygon[i + 1][1] <= point[1]))) {
          // compute  the actual edge-ray intersect x-coordinate:
          vt = (point[1] - polygon[i][1]) / (polygon[i + 1][1] - polygon[i][1]);
          if (point[0] < polygon[i][0] + vt * (polygon[i + 1][0] - polygon[i][0])) {
            cn++;
          }
        }
      }
      return cn % 2 !== 0 ? true : false;
    },

    /**
     * Checks if the GeoJSON object is inside a Multipolygon or Polygon.
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}  returns true if the point is inside the Multipolygon/polygon, false otherwise,
     @ @throws {Object}    throws an error if the type isn't 'Multipolygon' or 'Polygon',
     * @since 0.0.1
     */
    _isPointInPolygonOrMultipolygon: function(obj, source) {
      var i
        , j
        ;

      switch (source.type) {

        case 'Multipolygon':
          for (i = 0; i < source.coordinates.length; i++)
            for (j = 0; j < source.coordinates[i].length; j++)
              if (_geo._isPointInPolygon(obj.coordinates, source.coordinates[i][j]))
                return true;
          return false;

        case 'Polygon':
          for (i = 0; i < source.coordinates.length; i++)
            if (_geo._isPointInPolygon(obj.coordinates, source.coordinates[i]))
              return true;
          return false;

        /* istanbul ignore next */
        default:
          throw new Error('_geo._within: the GeoSpatial $geoWihin operator with a $geometry.type"' + source.type + '" is unknown!');
      }
    },

    /**
     * Checks if the GeoJSON object matches the $geoWithin $box query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin/$box query,
     * @returns {Boolean}  returns true if the point is inside the box, false otherwise,
     * @since 0.0.1
     */
    _box: function(obj, box) {
      var c
        , p
        ;

      c = [[
        [box[0][0], box[0][1]],
        [box[1][0], box[0][1]],
        [box[1][0], box[1][1]],
        [box[0][0], box[1][1]]
      ]];

      p = {
        type: 'Polygon',
        coordinates: c
      };

      return _geo._isPointInPolygonOrMultipolygon(obj, p);
    },

    /**
     * Checks if the GeoJSON object matches the $geoWithin $polygon query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin/$polygon query,
     * @returns {Boolean}  returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.1
     */
    _polygon: function(obj, polygon) {
      var p
        ;

      // The polygon must be closed (last point === first point).
      p = {
        type: 'Polygon',
        coordinates: [polygon, [polygon[0][0], polygon[0][1]]]
      };

      return _geo._isPointInPolygonOrMultipolygon(obj, p);
    },

    /**
     * Checks if the GeoJSON object matches the $geoWithin $center query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}  returns true if the point is inside the circle, false otherwise,
     * @since 0.0.1
     */
    _center: function(obj, center) {
      var d
        ;

      d = Math.sqrt(Math.pow((center[0][0] - obj.coordinates[0]), 2) + Math.pow((center[0][1] - obj.coordinates[1]), 2));
      return d < center[1] ? true : false;
    },

    /**
     * Checks if the GeoJSON object matches the $geoWithin $centerSphere query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}  returns true if the point is inside the sphere, false otherwise,
     * @since 0.0.1
     */
    _centerSphere: function(obj, centerSphere) {
      var d
        ;

      d = Math.sqrt(Math.pow((centerSphere[0][0] - obj.coordinates[0]), 2) + Math.pow((centerSphere[0][1] - obj.coordinates[1]), 2));
      return d < (centerSphere[1] / Math.PI * 180) ? true : false;
    },

    /**
     * Checks if the GeoJSON object matches the $geoWithin $geometry query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin/$geometry query,
     * @returns {Boolean}  returns true if the point is inside the polygon, false otherwise,
     * @since 0.0.1
     */
    _within: function(obj, source) {

      switch (obj.type) {

        case 'Point':
          return _geo._isPointInPolygonOrMultipolygon(obj, source);

        /* istanbul ignore next */
        case 'LineString':
          return false;

        /* istanbul ignore next */
        case 'Polygon':
          return false;

        /* istanbul ignore next */
        case 'MultiPoint':
          return false;

        /* istanbul ignore next */
        case 'MultiLineString':
          return false;

        /* istanbul ignore next */
        case 'MultiPolygon':
          return false;

        /* istanbul ignore next */
        case 'GeometryCollection':
          return false;

        /* istanbul ignore next */
        default:
          return false;
      }
    },

    /**
     * Checks if the GeoJSON object matches the $geoWithin query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial $geoWithin query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @throws {Object}    throws an error if the GeoSpatial operator isn't recognized,
     * @since 0.0.1
     */
    _geoWithin: function(obj, source) {
      var op = _.keys(source)[0]
        ;

      if (!_.isObject(source))
        return false;

      switch (op) {

        case '$geometry':
          return _geo._within(obj, source.$geometry);

        case '$box':
          return _geo._box(obj, source.$box);

        case '$polygon':
          return _geo._polygon(obj, source.$polygon);

        case '$center':
          return _geo._center(obj, source.$center);

        case '$centerSphere':
          return _geo._centerSphere(obj, source.$centerSphere);

        /* istanbul ignore next */
        default:
          throw new Error('_geo._geoWithin: the GeoSpatial $geoWihin operator "' + op + '" is unknown!');
      }
    },

    /**
     * Checks if the GeoJSON type LineString intersects the $geoIntersects polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @since 0.0.1
     */
    _interLineString: function(obj, source) {
      var inside
        , outside
        , breakloop
        , i
        , j
        ;

      // It matches if one point of the LineString, at least, is inside the polygon
      // and one point, at least, is outside the polygon.
      for (i = 0; i < obj.coordinates.length; i++) {
        for (j = 0; j < source.coordinates.length; j++) {
          breakloop = false;
          if (_geo._isPointInPolygon(obj.coordinates[i], source.coordinates[j])) {
            inside = true;
            breakloop = true;
            // Abort as soon as we have found one point inside and one point ouside!
            if (inside && outside)
              return true;
            break;
          }
        }
        if (!breakloop) {
          outside = true;
          if (inside && outside)
            return true;
        }
      }
      return false;
    },

    /**
     * Checks if the GeoJSON type Polygon intersects the $geoIntersects polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @since 0.0.1
     */
    _interPolygon: function(obj, source) {
      var inside
        , outside
        , breakloop
        , i
        , j
        , k
        ;

      for (i = 0; i < obj.coordinates.length; i++) {
        for (j = 0; j < obj.coordinates[i].length; j++) {

          for (k = 0; k < source.coordinates.length; k++) {
            breakloop = false;
            if (_geo._isPointInPolygon(obj.coordinates[i][j], source.coordinates[k])) {
              inside = true;
              breakloop = true;
              // Abort as soon as we have found one point inside and one point ouside!
              if (inside && outside)
                return true;
              break;
            }
          }
          if (!breakloop) {
            outside = true;
            if (inside && outside)
              return true;
          }
        }
      }
      return false;
    },

    /**
     * Checks if the GeoJSON object intersects the $geoIntersects polygon.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @since 0.0.1
     */
    _intersects: function(obj, source) {

      switch (obj.type) {

        // Point can't intersect a polygon.
        /* istanbul ignore next */
        case 'Point':
          return false;

        // LineString could intersect a polygon.
        case 'LineString':
          return _geo._interLineString(obj, source);

        // Polygon could intersect a polygon.
        case 'Polygon':
          return _geo._interPolygon(obj, source);

        // Multipoint can't intersect a polygon.
        /* istanbul ignore next */
        case 'MultiPoint':
          return false;

        // MultiLineString could intersect a polygon.
        /* istanbul ignore next */
        case 'MultiLineString':
          return false;

        // MultiPolygon could intersect a polygon.
        /* istanbul ignore next */
        case 'MultiPolygon':
          return false;

        // ???
        /* istanbul ignore next */
        case 'GeometryCollection':
          return false;

        /* istanbul ignore next */
        default:
          return false;
      }
    },

    /**
     * Checks if the GeoJSON object matches the $geoIntersects query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @throws {Object}    throws an error if the GeoSpatial operator isn't recognized,
     * @since 0.0.1
     */
    _geoIntersects: function(obj, source) {

      if (!source.hasOwnProperty(('$geometry')))
        return false;

      switch (source.$geometry.type) {

        case 'Polygon':
          return _geo._intersects(obj, source.$geometry);

        /* istanbul ignore next */
        default:
          throw new Error('_geo._geoIntersects: the GeoSpatial $geoIntersects type "' + source.$geometry.type + '" is not supported!');
      }
    },

    /**
     * Decodes the GeoSpatial query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @throws {Object}    throws an error if the GeoSpatial operator isn't recognized,
     * @since 0.0.1
     */
    _query: function(obj, source) {
      var prop
        ;

      for (prop in source) {
        switch (prop) {

          case '$geoWithin':
            return _geo._geoWithin(obj, source[prop]);

          case '$geoIntersects':
            return _geo._geoIntersects(obj, source[prop]);

          /* istanbul ignore next */
          case '$near':
            return false;

          /* istanbul ignore next */
          case '$nearSphere':
            return false;

          /* istanbul ignore next */
          default:
            throw new Error('_geo._query: the Geo Operator "' + prop + '" is unknown!');
        }
      }
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Processes the GeoSpatial query.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}     the GeoJSON object,
     * @param {Object}     the GeoSpatial query,
     * @returns {Boolean}  returns true if the query is successful, false otherwise,
     * @since 0.0.1
     */
    query: function(obj, source) {
      return _geo._query(obj, source);
    }

  };
