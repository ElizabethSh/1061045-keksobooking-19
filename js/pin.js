'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // проверить нужен ли модуль data.js !!!
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var similarListElement = map.querySelector('.map__pins');
  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');
  var addressField = document.querySelector('#address');

  var renderPin = function (announcement) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);

    announcementElement.style.left = announcement.location.x + PIN_WIDTH / 2 + 'px';
    announcementElement.style.top = announcement.location.y + PIN_HEIGHT + 'px';
    announcementElement.querySelector('img').setAttribute('src', announcement.author.avatar);
    announcementElement.querySelector('img').setAttribute('alt', announcement.offer.title);

    return announcementElement;
  };

  window.createPin = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length; // выводить не больше 5 элементов
    // var fragment = document.createDocumentFragment();
    window.removePins();
    for (var k = 0; k < takeNumber; k++) {
      similarListElement.appendChild(renderPin(data[k]));
    }

    var onPinPress = function (evt) {
      if (evt.target && evt.target.dataset.key) {
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
      }

      if (evt.target && (evt.target.matches('img') || evt.target.matches('button[type="button"]'))) {
        if (!evt.target.matches('img[alt="Метка объявления"]')) {
          window.createCard(data[evt.target.dataset.key]);
          if (evt.target.matches('img')) {
            evt.target.parentNode.classList.add('map__pin--main');
          } else {
            evt.target.classList.add('map__pin--main');
          }
        }
      }
    };
    similarListElement.addEventListener('click', onPinPress);
    // similarListElement.appendChild(fragment);
    /* var pins = similarListElement.querySelectorAll('button[type="button"]');
    pins.addEventListener('click', function () {
      console.log(pins);
    });*/

    // window.createCard();
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

      addressField.setAttribute('value', mainPinHandler.offsetLeft + window.util.MAIN_PIN_RADIUS + ', ' + (mainPinHandler.offsetTop + window.util.MAIN_PIN_HEIGHT));

      if ((mainPinHandler.offsetTop - shift.y) < Y_MIN - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = '49 px';
      } else if ((mainPinHandler.offsetTop - shift.y) > Y_MAX - window.util.MAIN_PIN_HEIGHT) {
        mainPinHandler.style.top = '549px';
      } else {
        mainPinHandler.style.top = (mainPinHandler.offsetTop - shift.y) + 'px';
      }

      if ((mainPinHandler.offsetLeft - shift.x) < -33) {
        mainPinHandler.style.left = '-33px';
      } else if ((mainPinHandler.offsetLeft - shift.x) > X_MAX - window.util.MAIN_PIN_RADIUS) {
        mainPinHandler.style.left = (X_MAX - 33 - mainPinHandler.style.height) + 'px';
      } else {
        mainPinHandler.style.left = (mainPinHandler.offsetLeft - shift.x) + 'px';
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
