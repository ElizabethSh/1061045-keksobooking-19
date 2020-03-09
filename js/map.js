'use strict';

(function () {

  var X_MIN = 0;
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');

  var onPinPress = function (evt) {
    // По нажатию на пин объявлений создаем соответствующую ему карточку
    if (evt.target && (evt.target.matches('img[key]') || evt.target.matches('button[type="button"]'))) {
      window.card.create(evt.target.getAttribute('key'));
      var mapPinActive = mapPinsList.querySelector('.map__pin--active');
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


  mapPinsList.addEventListener('click', onPinPress);

  // перемещение главного пина на карте

  var mainPinHandler = document.querySelector('.map__pin--main');
  mainPinHandler.addEventListener('mousedown', function (evt) {
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
        x: mainPinHandler.offsetLeft + window.util.MAIN_PIN_RADIUS,
        y: mainPinHandler.offsetTop + window.util.MAIN_PIN_HEIGHT
      };

      window.form.fillAddressField(coordsForAddressField.x, coordsForAddressField.y);

      if (currentCoords.x < X_MIN - window.util.MAIN_PIN_RADIUS) {
        mainPinHandler.style.left = X_MIN - window.util.MAIN_PIN_RADIUS + 'px';
      } else if (currentCoords.x > X_MAX - window.util.MAIN_PIN_RADIUS) {
        mainPinHandler.style.left = (X_MAX - window.util.MAIN_PIN_RADIUS) + 'px';
      } else {
        mainPinHandler.style.left = currentCoords.x + 'px';
      }

      if (currentCoords.y < Y_MIN - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = Y_MIN - window.util.MAIN_PIN_HEIGHT + 'px';
      } else if (currentCoords.y > Y_MAX - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = Y_MAX - window.util.MAIN_PIN_HEIGHT + 'px';
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
  });
})();
