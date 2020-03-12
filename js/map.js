'use strict';

(function () {
  var X_MIN = 0;
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var onPinPress = function (evt) {
    // По нажатию на пин объявлений создаем соответствующую ему карточку
    if (evt.target && (evt.target.matches('img[key]') || evt.target.matches('button[type="button"]'))) {
      window.card.create(evt.target.getAttribute('key'));
      var mapPinActive = window.pin.mapPinsList.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }

      if (evt.target.matches('img')) {
        evt.target.parentNode.classList.add('map__pin--active');
      } else {
        evt.target.classList.add('map__pin--active');
      }
    }
  };

  window.pin.mapPinsList.addEventListener('click', onPinPress);

  // перемещение главного пина на карте

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: mainPinHandler.offsetLeft - shift.x,
        y: mainPinHandler.offsetTop - shift.y
      };

      var coordsForAddressField = {
        x: mainPinHandler.offsetLeft + window.pin.mainPinRadius,
        y: mainPinHandler.offsetTop + window.pin.MAIN_PIN_HEIGHT
      };

      window.form.fillAddressField(coordsForAddressField.x, coordsForAddressField.y);

      if (currentCoords.x < X_MIN - window.pin.mainPinRadius) {
        mainPinHandler.style.left = X_MIN - window.pin.mainPinRadius + 'px';
      } else if (currentCoords.x > X_MAX - window.pin.mainPinRadius) {
        mainPinHandler.style.left = (X_MAX - window.pin.mainPinRadius) + 'px';
      } else {
        mainPinHandler.style.left = currentCoords.x + 'px';
      }

      if (currentCoords.y < Y_MIN - window.pin.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = Y_MIN - window.pin.MAIN_PIN_HEIGHT + 'px';
      } else if (currentCoords.y > Y_MAX - window.pin.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = Y_MAX - window.pin.MAIN_PIN_HEIGHT + 'px';
      } else {
        mainPinHandler.style.top = currentCoords.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var mainPinHandler = document.querySelector('.map__pin--main');
  mainPinHandler.addEventListener('mousedown', onMouseDown);

  var removeListeners = function () {
    window.pin.mapPinsList.removeEventListener('click', onPinPress);
    mainPinHandler.removeEventListener('mousedown', onMouseDown);
  };

  var addListeners = function () {
    window.pin.mapPinsList.addEventListener('click', onPinPress);
    mainPinHandler.addEventListener('mousedown', onMouseDown);
  };

  window.map = {
    removeListeners: removeListeners,
    addListeners: addListeners
  };
})();
