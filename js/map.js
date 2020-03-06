'use strict';

(function () {
  // проверить нужен ли модуль data.js !!!
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var addressField = document.querySelector('#address');

  var onPinPress = function (evt) {
    window.card.remove(); // функция удаления карточки, чтобы всегда открыта была талько одна

    // По нажатию на пин объявлений создаем соответствующую ему карточку
    if (evt.target && (evt.target.matches('img') || evt.target.matches('button[type="button"]'))) {
      if (!evt.target.matches('img[alt="Метка объявления"]')) {
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

      addressField.setAttribute('value', mainPinHandler.offsetLeft + window.util.MAIN_PIN_RADIUS + ', ' + (mainPinHandler.offsetTop + window.util.MAIN_PIN_HEIGHT));

      if (currentCoords.x < 0 - window.util.MAIN_PIN_RADIUS) {
        mainPinHandler.style.left = 0 - window.util.MAIN_PIN_RADIUS;
      } else if (currentCoords.x > X_MAX - window.util.MAIN_PIN_RADIUS) {
        mainPinHandler.style.left = (X_MAX - window.util.MAIN_PIN_RADIUS) + 'px';
      } else {
        mainPinHandler.style.left = currentCoords.x + 'px';
      }

      if (currentCoords.y < Y_MIN - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = Y_MIN - window.util.MAIN_PIN_HEIGHT;
      } else if (currentCoords.y > Y_MAX - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = Y_MAX - window.util.MAIN_PIN_HEIGHT;
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

  /* window.map = {
    onPinPress: onPinPress
  };*/

})();
