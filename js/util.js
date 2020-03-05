'use strict';

(function () {

  var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAIN_PIN_HEIGHT = 81;
  var MAIN_PIN_RADIUS = Math.round(MAIN_PIN_WIDTH / 2); // 33

  var Keycode = {
    ENTER: 13,
    ESC: 27,
    MOUSE_LEFT: 1
  };

  var announcements = [];
  var filteredData = [];

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ENTER) {
      action();
    }
  };

  var isMouseLeftEvent = function (action) {
    if (event.which === Keycode.MOUSE_LEFT) {
      action();
    }
  };

  var isEscapeEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ESC) {
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

    announcements: announcements,
    filteredData: filteredData,

    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent,
    isEscapeEvent: isEscapeEvent,
    removeElement: removeElement,
  };
})();
