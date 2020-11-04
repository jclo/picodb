/** ************************************************************************
 *
 * A set of functions to make Geospatial queries.
 *
 * geo.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . _lawOfHaversines            returns the distance between two points on earth,
 *  . _lawOfCosines               returns the distance between two points on earth,
 *  . _equirectangularProjection  returns the distance between two points on earth,
 *  . _getDistanceOnEarth         returns the distance between two points on earth
 *  . _isPointInPolygon2          checks if the point is inside the polygon,
 *  . _isPointInPolygon           checks if the point is inside the polygon,
 *  . _isGeometryInsideGeoObject  checks if the geo. is inside a Multi. or Polygon,
 *  . _toPolygonCoordinates       embeds Point, LineString and Polygon,
 *  . _box                        checks if the Geo matches the $geoWithin $box,
 *  . _polygon                    checks if the Geo matches the $geoWithin $polygon,
 *  . _center                     checks if the Geo matches the $geoWithin $center,
 *  . _centerSphere               checks if the Geo matches the $geoWithin $centerSphere,
 *  . _within                     checks if the Geo matches the $geoWithin $geometry,
 *  . _interLineString            checks if the Geo Line intersects $geoIntersects polygon,
 *  . _interPolygon               checks if the Geo Poly. intersects $geoIntersects polygon,
 *  . _intersects                 checks if the Geo obj. intersects $geoIntersects polygon,
 *  . _isPointNear                checks if the Geo Point matches the condition of distance,
 *  . _geoNear                    checks if the Geo object matches the $near query,
 *  . _geoWithin                  checks if the Geo object matches the $geoWithin query,
 *  . _geoIntersects              checks if the Geo object matches the $geoIntersects query,
 *  . _near                       checks if the Geo object matches the $near query.
 *  . _query                      decodes the GeoSpatial query.
 *
 *
 * Public Static Methods:
 *  . lawOfHaversines             returns the distance between two points on Earth,
 *  . lawOfCosines                returns the distance between two points on Earth,
 *  . equirectangularProjection   returns the distance between two points on Earth,
 *  . query                       processes the GeoSpatial query,
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
 * Returns the distance between two points on Earth using the law of haversines.
 *
 * `haversine` formula to calculate the great-circle distance between
 * two points:
 *
 *   a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 *   c = 2 ⋅ atan2( √a, √(1−a) )
 *   d = R ⋅ c
 *
 *   where φ is latitude, λ is longitude, R is earth’s radius
 *   (mean radius = 6,371km);
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination point,
 * @param {Object}          the source point,
 * @returns {Boolean}       returns the distance between the two points in meters,
 * @since 0.0.0
 */
function _lawOfHaversines(obj, source) {
  const λ1 = source.coordinates[0]
      , λ2 = obj.coordinates[0]
      , Δλ = (λ2 - λ1) * (Math.PI / 180)
      , φ1 = source.coordinates[1] * (Math.PI / 180)
      , φ2 = obj.coordinates[1] * (Math.PI / 180)
      , Δφ = (φ2 - φ1)
      , R  = 6371e3
      ;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
      + Math.cos(φ1) * Math.cos(φ2)
      * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Returns the distance between two points on Earth using the law of cosines.
 *
 * Formula:
 *   d = acos( sin φ1 ⋅ sin φ2 + cos φ1 ⋅ cos φ2 ⋅ cos Δλ ) ⋅ R
 *
 * Nota:
 * This formula is slightly faster than the law of haversines while offering
 * a similar accuracy on distances greater than a few dozen meters.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination point,
 * @param {Object}          the source point,
 * @returns {Boolean}       returns the distance between the two points in meters,
 * @since 0.0.0
 */
function _lawOfCosines(obj, source) {
  const λ1 = source.coordinates[0]
      , λ2 = obj.coordinates[0]
      , Δλ = (λ2 - λ1) * (Math.PI / 180)
      , φ1 = source.coordinates[1] * (Math.PI / 180)
      , φ2 = obj.coordinates[1] * (Math.PI / 180)
      , R  = 6371e3
      ;

  return Math.acos(Math.sin(φ1) * Math.sin(φ2)
    + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
}

/**
 * Returns the distance between two points on Earth using
 * the Equirectangular projection.
 *
 * Formula:
 *   y = Δφ
 *   d = R ⋅ √x² + y²
 *
 * Nota:
 * This formula is faster than the law of cosines and the law of the haversines
 * but is less accurante on distances greater than a few hundred kilometers.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination point,
 * @param {Object}          the source point,
 * @returns {Boolean}       returns the distance between the two points in meters,
 * @since 0.0.0
 */
function _equirectangularProjection(obj, source) {
  const λ1 = source.coordinates[0] * (Math.PI / 180)
      , λ2 = obj.coordinates[0] * (Math.PI / 180)
      , φ1 = source.coordinates[1] * (Math.PI / 180)
      , φ2 = obj.coordinates[1] * (Math.PI / 180)
      , R  = 6371e3
      ;

  const x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2);
  const y = φ2 - φ1;
  return Math.sqrt(x * x + y * y) * R;
}

/**
 * Returns the distance between two points on Earth.
 *
 * Nota:
 * This function can rely on three algorithms to compute the distance from
 * two points on Earth: the law of haversines, the law of cosines and
 * the Equirectangular projection. The law of cosines is the currently used.
 *
 * These algorithms are taken from here:
 *   . http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the destination point,
 * @param {Object}          the source point,
 * @returns {Boolean}       returns the distance between the two points in meters,
 * @since 0.0.0
 */
function _getDistanceOnEarth(obj, source) {
  return _lawOfCosines(obj, source);
}

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
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the coordinates of the point,
 * @param {Object}          the coordinates of the polygon,
 * @returns {Boolean}       returns true if the point is inside the polygon,
 * @since 0.0.1
 */
/* eslint-disable-next-line */
/* istanbul ignore next */ function _isPointInPolygon2(point, polygon) {
  let intersections
    , vertex1
    , vertex2
    , xinter
    ;

  // Check if the point is on a vertex:
  for (let i = 0; i < polygon.length; i++) {
    if (point[0] === polygon[i][0] && point[1] === polygon[i][1]) {
      return 'vertex';
    }
  }

  // Check if the point is inside the polygon or on the boundary:
  intersections = 0;

  for (let i = 1; i < polygon.length; i++) {
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
      /* eslint-disable-next-line */
      xinter = (point[1] - vertex1[1]) * (vertex2[0] - vertex1[0]) / (vertex2[1] - vertex1[1]) + (vertex1[0]);
      // Check if the point is on a boundary other than the horizontal one:
      if (xinter === point[0]) {
        return 'boundary';
      }

      if (vertex1[0] === vertex2[0] || point[0] <= xinter) {
        intersections += 1;
      }
    }
  }
  return intersections % 2 !== 0 ? 'inside' : 'outside';
}

/**
 * Checks if the point is inside the polygon.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the coordinates of the point,
 * @param {Object}          the coordinates of the polygon,
 * @returns {Boolean}       returns true if the point is inside the polygon,
 * @since 0.0.0
 */
function _isPointInPolygon(point, polygon) {
  let cn = 0
    , vt
    ;

  for (let i = 0; i < polygon.length - 1; i++) {
    if (((polygon[i][1] <= point[1]) && (polygon[i + 1][1] > point[1]))
        || ((polygon[i][1] > point[1]) && (polygon[i + 1][1] <= point[1]))) {
      // compute  the actual edge-ray intersect x-coordinate:
      vt = (point[1] - polygon[i][1]) / (polygon[i + 1][1] - polygon[i][1]);
      if (point[0] < polygon[i][0] + vt * (polygon[i + 1][0] - polygon[i][0])) {
        cn += 1;
      }
    }
  }
  return cn % 2 !== 0;
}

/**
 * Checks if the GeoJSON geometry is inside a Multipolygon or Polygon.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Array}           the GeoJSON geometry,
 * @param {Object}          the GeoSpatial $geoWithin/$geometry query,
 * @returns {Boolean}       returns true if the point is inside the Multipolygon/polygon,
 @ @throws {Object}         throws an error if the type isn't 'Multipolygon' or 'Polygon',
 * @since 0.0.0
 */
function _isGeometryInsideGeoObject(obj, source) {
  let breakloop
    , l
    ;

  switch (source.type) {
    // The point is considered as inside a Multipolygon if it inside of
    // one ring of one polygon.
    case 'MultiPolygon':
      for (let i = 0; i < obj.length; i++) {
        for (let j = 0; j < obj[i].length; j++) {
          for (let k = 0; k < source.coordinates.length; k++) {
            breakloop = false;
            for (l = 0; l < source.coordinates[k].length; l++) {
              if (_isPointInPolygon(obj[i][j], source.coordinates[k][l])) {
                breakloop = true;
                break;
              }
            }
            if (breakloop) {
              break;
            }
          }
          if (!breakloop) {
            return false;
          }
        }
      }
      return true;

    // The point is considered as inside a Polygon if it inside of
    // one ring of the polygon.
    case 'Polygon':
      for (let i = 0; i < obj.length; i++) {
        for (let j = 0; j < obj[i].length; j++) {
          breakloop = false;
          for (let k = 0; k < source.coordinates.length; k++) {
            if (_isPointInPolygon(obj[i][j], source.coordinates[k])) {
              breakloop = true;
              break;
            }
          }
          if (!breakloop) {
            return false;
          }
        }
      }
      return true;

    /* istanbul ignore next */
    default:
      throw new Error(
        `Geo._within: the GeoSpatial $geoWihin operator with a $geometry.type "${source.type}" is unknown!`,
      );
  }
}

/**
 * Embeds Point, LineString and Polygon coordinates inside a 'Polygon' like coordinate array.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the GeoJSON object,
 * @returns {Array}         returns the embbedded coordinates,
 * @since 0.0.0
 */
function _toPolygonCoordinates(obj) {
  switch (obj.type) {
    case 'Point':
      return [[obj.coordinates]];
    case 'LineString':
      return [obj.coordinates];
    case 'Polygon':
      return obj.coordinates;
    case 'MultiPoint':
      return [obj.coordinates];
    case 'MultiLineString':
      return obj.coordinates;

    /* istanbul ignore next */
    default:
      throw new Error(
        `Geo._toPolygonCoordinates: the GeoJSON type "${obj.type}" is not supported!`,
      );
  }
}

/**
 * Checks if the GeoJSON object matches the $geoWithin $box query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $geoWithin/$box query,
 * @returns {Boolean}       returns true if the point is inside the box, false otherwise,
 * @since 0.0.0
 */
function _box(obj, box) {
  const c = [[
    [box[0][0], box[0][1]],
    [box[1][0], box[0][1]],
    [box[1][0], box[1][1]],
    [box[0][0], box[1][1]],
  ]];

  const p = {
    type: 'Polygon',
    coordinates: c,
  };

  return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), p);
}

/**
 * Checks if the GeoJSON object matches the $geoWithin $polygon query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $geoWithin/$polygon query,
 * @returns {Boolean}       returns true if the point is inside the polygon, false otherwise,
 * @since 0.0.0
 */
function _polygon(obj, polygon) {
  // The polygon must be closed (last point === first point).
  const p = {
    type: 'Polygon',
    coordinates: [polygon, [polygon[0][0], polygon[0][1]]],
  };

  return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), p);
}

/**
 * Checks if the GeoJSON object matches the $geoWithin $center query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $geoWithin/$geometry query,
 * @returns {Boolean}       returns true if the point is inside the circle, false otherwise,
 * @since 0.0.0
 */
function _center(obj, center) {
  /* eslint-disable-next-line */
  const d = Math.sqrt(Math.pow((center[0][0] - obj.coordinates[0]), 2) + Math.pow((center[0][1] - obj.coordinates[1]), 2));
  return d < center[1];
}

/**
 * Checks if the GeoJSON object matches the $geoWithin $centerSphere query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $geoWithin/$geometry query,
 * @returns {Boolean}       returns true if the point is inside the sphere, false otherwise,
 * @since 0.0.0
 */
function _centerSphere(obj, centerSphere) {
  /* eslint-disable-next-line */
  const d = Math.sqrt(Math.pow((centerSphere[0][0] - obj.coordinates[0]), 2) + Math.pow((centerSphere[0][1] - obj.coordinates[1]), 2));
  /* eslint-disable-next-line */
  return d < (centerSphere[1] / Math.PI * 180);
}

/**
 * Checks if the GeoJSON object matches the $geoWithin $geometry query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $geoWithin/$geometry query,
 * @returns {Boolean}       returns true if the point is inside the polygon, false otherwise,
 * @since 0.0.0
 */
function _within(obj, source) {
  switch (obj.type) {
    case 'Point':
      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

    case 'LineString':
      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

    case 'Polygon':
      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

    case 'MultiPoint':
      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

    case 'MultiLineString':
      return _isGeometryInsideGeoObject(_toPolygonCoordinates(obj), source);

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
}

/**
 * Checks if the GeoJSON type LineString intersects the $geoIntersects polygon.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @since 0.0.0
 */
function _interLineString(obj, source) {
  let inside
    , outside
    , breakloop
    ;

  // It matches if one point of the LineString, at least, is inside the polygon
  // and one point, at least, is outside the polygon.
  for (let i = 0; i < obj.coordinates.length; i++) {
    for (let j = 0; j < source.coordinates.length; j++) {
      breakloop = false;
      if (_isPointInPolygon(obj.coordinates[i], source.coordinates[j])) {
        inside = true;
        breakloop = true;
        // Abort as soon as we have found one point inside and one point ouside!
        if (inside && outside) {
          return true;
        }
        break;
      }
    }
    if (!breakloop) {
      outside = true;
      if (inside && outside) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Checks if the GeoJSON type Polygon intersects the $geoIntersects polygon.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @since 0.0.1
 */
function _interPolygon(obj, source) {
  let inside
    , outside
    , breakloop
    ;

  for (let i = 0; i < obj.coordinates.length; i++) {
    for (let j = 0; j < obj.coordinates[i].length; j++) {
      for (let k = 0; k < source.coordinates.length; k++) {
        breakloop = false;
        if (_isPointInPolygon(obj.coordinates[i][j], source.coordinates[k])) {
          inside = true;
          breakloop = true;
          // Abort as soon as we have found one point inside and one point ouside!
          if (inside && outside) {
            return true;
          }
          break;
        }
      }
      if (!breakloop) {
        outside = true;
        if (inside && outside) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Checks if the GeoJSON object intersects the $geoIntersects polygon.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @since 0.0.0
 */
function _intersects(obj, source) {
  switch (obj.type) {
    // Point can't intersect a polygon.
    /* istanbul ignore next */
    case 'Point':
      return false;

    // LineString could intersect a polygon.
    case 'LineString':
      return _interLineString(obj, source);

    // Polygon could intersect a polygon.
    case 'Polygon':
      return _interPolygon(obj, source);

    // MultiPoint can't intersect a polygon.
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
}

/**
 * Checks if the GeoJSON Point matches the condition of distance from the central point.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the GeoJSON Point,
 * @param {Object}          the GeoSpatial $near query,
 * @param {Number}          the minimal distance from the central point in meters,
 * @param {Number}          the maximal distance from the central point in meters,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @since 0.0.0
 */
function _isPointNear(obj, source, max, min) {
  // Always true is max and min are not defined!
  if (max === undefined && min === undefined) {
    return true;
  }

  // Always false if max is lower then min!
  if (max < min) {
    return false;
  }

  // Compute the earth distance:
  const d = _getDistanceOnEarth(obj, source);

  // Return true if min <= d <= max (if min or max is undefined, the
  // associated condition is true).
  /* eslint-disable-next-line */
  return (!min || d >= min ? true : false) && (!max || d <= max ? true : false) ? true : false;
}

/**
 * Checks if the GeoJSON object matches the $near query.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $near query,
 * @param {Number}          the minimal distance from the central point in meters,
 * @param {Number}          the maximal distance from the central point in meters,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @since 0.0.0
 */
function _geoNear(obj, source, max, min) {
  switch (obj.type) {
    case 'Point':
      return _isPointNear(obj, source, max, min);

    default:
      return false;
  }
}

/**
 * Checks if the GeoJSON object matches the $geoWithin query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial $geoWithin query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @throws {Object}         throws an error if the GeoSpatial operator isn't recognized,
 * @since 0.0.0
 */
function _geoWithin(obj, source) {
  const op = _.keys(source)[0]
      ;

  /* istanbul ignore next */
  if (!_.isObject(source)) {
    return false;
  }

  switch (op) {
    case '$geometry':
      return _within(obj, source.$geometry);

    case '$box':
      return _box(obj, source.$box);

    case '$polygon':
      return _polygon(obj, source.$polygon);

    case '$center':
      return _center(obj, source.$center);

    case '$centerSphere':
      return _centerSphere(obj, source.$centerSphere);

    /* istanbul ignore next */
    default:
      throw new Error(
        `Geo._geoWithin: the GeoSpatial $geoWihin operator "${op}" is unknown!`,
      );
  }
}

/**
 * Checks if the GeoJSON object matches the $geoIntersects query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @throws {Object}         throws an error if the GeoSpatial operator isn't recognized,
 * @since 0.0.0
 */
function _geoIntersects(obj, source) {
  /* istanbul ignore next */
  if (!{}.hasOwnProperty.call(source, '$geometry')) {
    return false;
  }

  switch (source.$geometry.type) {
    case 'Polygon':
      return _intersects(obj, source.$geometry);

    /* istanbul ignore next */
    default:
      throw new Error(
        `Geo._geoIntersects: the GeoSpatial $geoIntersects type "${source.$geometry.type}" is not supported!'`,
      );
  }
}

/**
 * Checks if the GeoJSON object matches the $near query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @since 0.0.0
 */
function _near(obj, source) {
  // if (!source.hasOwnProperty(('$geometry')))
  if (!{}.hasOwnProperty.call(source, '$geometry')) {
    return false;
  }

  switch (source.$geometry.type) {
    case 'Point':
      return _geoNear(obj, source.$geometry, source.$maxDistance, source.$minDistance);

    default:
      return false;
  }
}

/**
 * Decodes the GeoSpatial query.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the GeoJSON object,
 * @param {Object}          the GeoSpatial query,
 * @returns {Boolean}       returns true if the query is successful, false otherwise,
 * @throws {Object}         throws an error if the GeoSpatial operator isn't recognized,
 * @since 0.0.0
 */
function _query(obj, source) {
  let status;

  _.forPropIn(source, (prop) => {
    switch (prop) {
      case '$geoWithin':
        status = _geoWithin(obj, source[prop]);
        break;

      case '$geoIntersects':
        status = _geoIntersects(obj, source[prop]);
        break;

      case '$near':
        status = _near(obj, source[prop]);
        break;

      /* istanbul ignore next */
      case '$nearSphere':
        status = false;
        break;

      /* istanbul ignore next */
      default:
        throw new Error(
          `Geo._query: the Geo Operator "${prop}" is unknown!`,
        );
    }
  });
  return status;
}


// -- Public Static Methods ------------------------------------------------

const Geo = {

  /**
   * Returns the distance between two points on Earth using the law of haversines.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the destination point,
   * @param {Object}        the source point,
   * @returns {Boolean}     returns the distance between the two points in meters,
   * @since 0.0.0
   */
  lawOfHaversines(obj, source) {
    return _lawOfHaversines(obj, source);
  },

  /**
   * Returns the distance between two points on Earth using the law of cosines.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the destination point,
   * @param {Object}        the source point,
   * @returns {Boolean}     returns the distance between the two points in meters,
   * @since 0.0.0
   */
  lawOfCosines(obj, source) {
    return _lawOfCosines(obj, source);
  },

  /**
   * Returns the distance between two points on Earth using the Equirectangular projection.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the destination point,
   * @param {Object}        the source point,
   * @returns {Boolean}     returns the distance between the two points in meters,
   * @since 0.0.0
   */
  equirectangularProjection(obj, source) {
    return _equirectangularProjection(obj, source);
  },

  /**
   * Processes the GeoSpatial query.
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}        the GeoJSON object,
   * @param {Object}        the GeoSpatial query,
   * @returns {Boolean}     returns true if the query is successful,
   * @since 0.0.1
   */
  query(obj, source) {
    return _query(obj, source);
  },
};


// -- Export
export default Geo;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
