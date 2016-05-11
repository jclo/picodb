  /**
   * picodb.js is the entry point of PicoDB. All the public methods are defined in
   * this file.
   *
   * @namespace _
   * @functions -
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  /**
   * Private functions:
   *  . _init                initializes the database,
   *
   * Public methods:
   *  . Create                    the constructor,
   *  . count                     counts the documents into the db that match,
   *  . deleteMany                deletes the documents into the db that match,
   *  . deleteOne                 deletes the first (the oldest) document into the db that matches,
   *  . insertMany                inserts an array of documents into the db,
   *  . insertOne                 inserts a single document into the db,
   *  . updateMany                updates many documents into the db,
   *  . updateOne                 updates many documents into the db,
   *  . find                      finds the searched documents,
   *  . toArray                   returns the found documents in an array,
   *  . addEventListener          registers the specified listener on the event it's called on,
   *  . addOneTimeEventListener   registers the specified listener on the event it's called on for a one-time event,
   *  . removeEventListener       removes the event listener previously registered with addEventListener,
   *  . on                        alias on addEventListener,
   *  . one                       alias on addOneTimeEventListener,
   *  . off                       alias on removeEventListener,
   */

  /* Private Functions ------------------------------------------------------ */

  var _init = function(_this) {

    // Attach schema:
    _this.db = _insert._schema();
    // Attach event Queue:
    _this.eventQ = _event.setEventListenerList();
  };

   /**
    * PicoDB constructor (implements the factory pattern).
    *
    * @constructor ()
    * @public
    * @param {}           -,
    * @returns {Object}   returns the database object,
    * @since 0.0.1
    */
  PicoDB.Create = function() {
    this.db;              // the database container,

    /**
     * Counts the documents into the db that match.
     *
     * @method (arg1, arg2, arg3)
     * @public
     * @param {Object}     the query object,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var count = function(query, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 1)
        return;
      _count.count(this, query, options, callback);
    };

    /**
     * Deletes the documents into the db that match.
     *
     * @method (arg1, arg2, arg3)
     * @public
     * @param {Object}     the object to found,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var deleteMany = function(filter, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 1)
        return;
      _delete.delete(this, true, filter, options, callback);
    };

    /**
     * Deletes the first (the oldest) document into the db that matches.
     *
     * @method (arg1, arg2, arg3)
     * @public
     * @param {Object}     the object to found,
     * @param {Options}    the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var deleteOne = function(filter, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 1)
        return;
      _delete.delete(this, false, filter, options, callback);
    };

    /**
     * Inserts an array of documents into the db.
     *
     * @method (arg1, arg2, arg3)
     * @public
     * @param {Array}      the documents to insert,
     * @param {Object}     the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var insertMany = function(docs, options, callback) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      // Return silently if they are too few arguments:
      if (arguments.length < 1)
        return;
      _insert.insert(this, true, docs, options, callback);
    };

    /**
     * Inserts a single document into the db.
     *
     * @method (arg1, arg2, arg3)
     * @public
     * @param {Object}     the document to insert,
     * @param {Object}     the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var insertOne = function(doc, options, callback) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      // Return silently if they are too few arguments:
      if (arguments.length < 1)
        return;
      _insert.insert(this, false, doc, options, callback);
    };

    /**
     * Updates many documents into the db.
     *
     * @method (arg1, arg2, arg3, arg4)
     * @public
     * @param {Object}     the query object,
     * @param {object}     the items to update,
     * @param {Object}     the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var updateMany = function(query, update, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 2)
        return;
      _update.update(this, true, query, update, options, callback);
    };

    /**
     * Updates many documents into the db.
     *
     * @method (arg1, arg2, arg3, arg4)
     * @public
     * @param {Object}     the query object,
     * @param {object}     the items to update,
     * @param {Object}     the optional settings,
     * @param {Function}   the function to call at completion,
     * @returns {}         -,
     * @since 0.0.1
     */
    var updateOne = function(query, update, options, callback) {
      // Return silently if the database isn't initialized or
      // if they are too few arguments:
      if (!this.db || arguments.length < 2)
        return;
      _update.update(this, false, query, update, options, callback);
    };

    /**
     * Finds the searched documents.
     *
     * @method (arg1)
     * @public
     * @param {Object}     the query object,
     * @returns {Object}   returns this,
     * @since 0.0.1
     */
    var find = function(query) {
      query = query || {};

      // Return silently if the database isn't initialized:
      if (!this.db)
        return this;

      // Searches documents that match the query:
      _find.find(this, query);
      return this;
    };

    /**
     * Returns the found documents in an array.
     *
     * @method (arg1)
     * @public
     * @param {Object}     the function to call at completion to retrieve the
     *                     found documents,
     * @returns {}         -,
     * @since 0.0.1
     */
    var toArray = function(callback) {
      // Return silently if the database isn't initialized:
      if (!this.db)
        return;

      _find.toArray(this, callback);
    };

    /**
     * Registers the specified listener on the event it's called on.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the type of event,
     * @param {function}  the event listener,
     * @returns {}        -,
     * since 0.1
     */
    var addEventListener = function(type, listener) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      _event.addEventListener(this.eventQ, type, listener);
    };

    /**
     * Registers the specified listener on the event it's called on for a one-time event.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the type of event,
     * @param {function}  the event listener,
     * @returns {}        -,
     * since 0.1
     */
    var addOneTimeEventListener = function(type, listener) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      _event.addOneTimeEventListener(this.eventQ, type, listener);
    };

    /**
     * Removes the event listener previously registered with addEventListener.
     *
     * @method (arg1, arg2)
     * @public
     * @param {String}    the type of event,
     * @param {function}  the event listener,
     * @returns {}        -,
     * since 0.1
     */
    var removeEventListener = function(type, listener) {
      // Initialize the db if it isn't:
      if (!this.db)
        _init(this);

      _event.removeEventListener(this.eventQ, type, listener);
    };

    // Return the object:
    return {
      count: count,
      deleteMany: deleteMany,
      deleteOne: deleteOne,
      insertMany: insertMany,
      insertOne: insertOne,
      updateMany: updateMany,
      updateOne: updateOne,
      find: find,
      toArray: toArray,

      addEventListener: addEventListener,
      addOneTimeEventListener: addOneTimeEventListener,
      removeEventListener: removeEventListener,
      on: addEventListener,
      one: addOneTimeEventListener,
      off: removeEventListener
    };
  };
