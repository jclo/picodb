/** ************************************************************************
 *
 * Manages the plugin.
 *
 * plugin.js is just a literal object that contains a set of functions.
 * It can't be instantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  .
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
import _ from './_';


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Attaches a valid plugin.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the plugin db,
 * @param {Function}        the plugin library,
 * @returns {Boolean}       returns true if it succeeds,
 * @since 0.0.0
 */
function _plugin(db, plug) {
  if (_.isLiteralObject(plug)
    && plug.messenger && plug.messenger.NAME === 'Messenger') {
    /* eslint-disable-next-line no-param-reassign */
    db.messenger = plug.messenger;
    return true;
  }
  return false;
}


// -- Public Static Methods ------------------------------------------------

const Plugin = {

  /**
   * The plugin db
   */
  _db: {
    messenger: null,
  },

  /**
   * Attaches a valid plugin.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the plugin library,
   * @returns {Boolean}     returns true if it succeeds,
   * @since 0.0.0
   */
  plugin(plug) {
    return _plugin(this._db, plug);
  },

  /**
   * Returns the requested plugin.
   *
   * @method (arg1)
   * @public
   * @param {String}        the plugin name,
   * @returns {Function}    returns the requested plugin,
   * @since 0.0.0
   */
  get(plugin) {
    return _.isString(plugin) && this._db[plugin] ? this._db[plugin] : null;
  },
};


// -- Export
export default Plugin;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
