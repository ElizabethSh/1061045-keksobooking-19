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

  var renderPin = function (announcement, index) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);

    announcementElement.style.left = announcement.location.x + PIN_WIDTH / 2 + 'px';
    announcementElement.style.top = announcement.location.y + PIN_HEIGHT + 'px';
    announcementElement.querySelector('img').setAttribute('src', announcement.author.avatar);
    announcementElement.querySelector('img').setAttribute('alt', announcement.offer.title);
    announcementElement.querySelector('img').setAttribute('dataset.key', announcement, index);
    announcementElement.setAttribute('dataset.key', announcement, index);

    return announcementElement;
  };

  window.createPin = function (announcement) {
    var takeNumber = announcement.length > 5 ? 5 : announcement.length; // выводить не больше 5 элементов
    // var fragment = document.createDocumentFragment();
    window.removePins();
    for (var k = 0; k < takeNumber; k++) {
      similarListElement.appendChild(renderPin(announcement[k]));
    }

    var onPinPress = function (evt) {
      if (evt.target && evt.target.dataset.key) {
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
      }
      /* var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }*/

      // var pins = similarListElement.querySelectorAll('button[type="button"]');

      /* var pikedPins = Array.from(pins).filter(function (it) {
        return it.classList.contains('map__pin--main');
      });

      console.log(pikedPins);*/

      if (evt.target && (evt.target.matches('img') || evt.target.matches('button[type="button"]'))) {
        if (!evt.target.matches('img[alt="Метка объявления"]')) {
          window.createCard(announcement[evt.target.dataset.key]);
          // console.log(announcement[evt.target.dataset.key]);
          var mapPinActive = similarListElement.querySelector('.map__pin--active');
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
