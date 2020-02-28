'use strict';

(function () {
  var PIN_AMOUNT_MAX = 5;
  // проверить нужен ли модуль data.js !!!
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var addressField = document.querySelector('#address');

  // Функция создания пинов на карте

  window.createPin = function (data) {
    var takeNumber = data.length > PIN_AMOUNT_MAX ? PIN_AMOUNT_MAX : data.length; // выводить не больше 5 элементов
    // var fragment = document.createDocumentFragment();
    window.form.removePins();
    for (var k = 0; k < takeNumber; k++) {
      mapPinsList.appendChild(window.pin.renderPin(data[k], k));
    }

    // функция удаления карточки, чтобы всегда открыта была талько одна
    var onPinPress = function (evt) {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }

      // По нажатию на пин объявлений создаем соответствующую ему карточку
      if (evt.target && (evt.target.matches('img') || evt.target.matches('button[type="button"]'))) {
        if (!evt.target.matches('img[alt="Метка объявления"]')) {
          window.card.createCard(evt.target.getAttribute('key'));
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
  };

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

      if (currentCoords.x < -33) {
        mainPinHandler.style.left = '-33px';
      } else if (currentCoords.x > X_MAX - window.util.MAIN_PIN_RADIUS) {
        mainPinHandler.style.left = (X_MAX - 33 - mainPinHandler.style.height) + 'px';
      } else {
        mainPinHandler.style.left = currentCoords.x + 'px';
      }

      if (currentCoords.y < Y_MIN - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = '49 px';
      } else if (currentCoords.y > Y_MAX - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = '549px';
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
