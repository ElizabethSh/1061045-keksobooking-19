'use strict';

(function () {

  var Key = {
    ENTER: 'Enter',
    ESC: 'Escape',
    MOUSE_LEFT: 0
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };

  var isMouseLeftEvent = function (evt, action) {
    if (evt.button === Key.MOUSE_LEFT) {
      action();
    }
  };

  var isEscapeEvent = function (evt, action) {
    if (evt.key === Key.ESC) {
      action();
    }
  };

  var removeElement = function (className) {
    document.querySelector(className).remove();
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent,
    isEscapeEvent: isEscapeEvent,
    removeElement: removeElement,
  };
})();
