'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var MOUSE_LEFT_KEYCODE = 1;

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var isMouseLeftEvent = function (action) {
    if (event.which === MOUSE_LEFT_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent
  };
})();
