'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var MOUSE_LEFT_KEYCODE = 1;
  var ESC_KEYCODE = 27;

  var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAIN_PIN_HEIGHT = 81; // document.querySelector('.map__pin--main').scrollHeight;
  var MAIN_PIN_RADIUS = Math.round(MAIN_PIN_WIDTH / 2);

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

  var removeElement = function (className) {
    document.querySelector(className).remove();
  };

  var closePopup = function (className) {
    document.querySelector(className).classList.add('hidden');
  };

  window.util = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_RADIUS: MAIN_PIN_RADIUS,

    isEnterEvent: isEnterEvent,
    isMouseLeftEvent: isMouseLeftEvent,
    isEscapeEvent: isEscapeEvent,
    removeElement: removeElement,
    closePopup: closePopup
  };
})();
