'use strict';

(function () {

  var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAIN_PIN_HEIGHT = 81;
  var MAIN_PIN_RADIUS = Math.round(MAIN_PIN_WIDTH / 2); // 33

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
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_RADIUS: MAIN_PIN_RADIUS,

    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent,
    isEscapeEvent: isEscapeEvent,
    removeElement: removeElement,
  };
})();
