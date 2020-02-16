'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var MOUSE_LEFT_KEYCODE = 1;
  var ESC_KEYCODE = 27;

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

  var isEscapeEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent,
    isEscapeEvent: isEscapeEvent
  };
})();
