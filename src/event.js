 /**
   * event.js is an embedded library that implements functions to manage
   * custom events.
   *
   * @namespace _event
   * @functions _
   * @exports   -
   * @author    -
   * @since     0.0.1
   * @version   -
   */

  // Initialize the library.
  var _event = {};

  /**
   * Private functions:
   *  . _isValidEvent             checks if the event and the event handler are valid,
   *
   * Public functions:
   *  . setEventListenerList      returns the event list template,
   *  . fire                      fires the given event,
   *  . addEventListener          adds an event listener,
   *  . addOneTimeEventListener   adds an Event Listener that could be fired once,
   *  . removeEventListener       removes an Event Listener from the event list,
   *
   * Aliases:
   *  . on                        addEventListener,
   *  . one                       addOneTimeEventListener,
   *  . off                       removeEventListener,
   */
  _event = {

    /* Private Functions ---------------------------------------------------- */

    /**
     * Checks if the event and the event handler are valid.
     *
     * @function(arg1, arg2, arg3)
     * @private
     * @param {Object}    the event list,
     * @param {String}    the event type,
     * @param {Function}  the event handler,
     * @returns {Boolean} returns true if the event and the handler are valid,
     *                    otherwise false,
     * @since 0.1
     */
    _isValidEvent: function(event, type, listener) {
      if (event.hasOwnProperty(type) && typeof listener === 'function')
        return true;
      else
        return false;
    },


    /* Public Functions ----------------------------------------------------- */

    /**
     * Returns the event list template.
     *
     * @function()
     * @public
     * @param {}          -,
     * @returns {Object}  returns the event list,
     * @since 0.1
     */
    setEventListenerList: function() {
      return {
        // Event when a document is added,
        insert: {
          listeners: [],
          listenersOnce: []
        },
        // Event when a document is updated,
        update: {
          listeners: [],
          listenersOnce: []
        },
        // Event when a document is removed,
        delete: {
          listeners: [],
          listenersOnce: []
        },
        // Event when the database is modified,
        change: {
          listeners: [],
          listenersOnce: []
        }
      };
    },

    /**
     * Fires the given event.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the name of the event,
     * @param {Object}    the payload,
     * @returns {}        -,
     * @since 0.1
     */
    fire: function(eventList, event, payload) {
      var i
        ;

      // is this event a valid one?
      /* istanbul ignore next */
      if (!eventList[event])
        return;

      // Fire listeners:
      for (i = 0; i < eventList[event].listeners.length; i++)
        eventList[event].listeners[i](payload);

      // Fire listeners once:
      for (i = 0; i < eventList[event].listenersOnce.length; i++)
        eventList[event].listenersOnce[i](payload);
      // Remove the event handlers:
      eventList[event].listenersOnce.splice(0, eventList[event].listenersOnce.length);

    },

    /**
     * Adds an Event Listener.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the type of event,
     * @param {Function}  the event handler,
     * @returns {}        -,
     * @since 0.1
     */
    addEventListener: function(eventList, type, listener) {

      // Is type an event and listener a function?
      if (!_event._isValidEvent(eventList, type, listener))
        return;

      // Save the listener:
      eventList[type].listeners.push(listener);

    },

    /**
     * Adds an Event Listener that could be fired once.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the type of event,
     * @param {Function}  the event handler,
     * @returns {}        -,
     * @since 0.1
     */
    addOneTimeEventListener: function(eventList, type, listener) {

      // Is type an event and listener a function?
      if (!_event._isValidEvent(eventList, type, listener))
        return;

      // Save the listener:
      eventList[type].listenersOnce.push(listener);

    },

    /**
     * Removes an Event Listener from the event list.
     *
     * @function(arg1, arg2, arg3)
     * @public
     * @param {Object}    the event list,
     * @param {String}    the type of event,
     * @param {Function}  the event handler,
     * @returns {}        -,
     * @since 0.1
     */
    removeEventListener: function(eventList, type, listener) {
      var index
        ;

      // Is type an event and listener a function?
      if (!_event._isValidEvent(eventList, type, listener))
        return;

      // Remove the listener:
      index = eventList[type].listeners.indexOf(listener);
      if (index >= 0)
        eventList[type].listeners.splice(index, 1);
    }

  };

  // Aliases:
  _event.on = _event.addEventListener;
  _event.one = _event.addOneTimeEventListener;
  _event.off = _event.removeEventListener;
