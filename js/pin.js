'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_AMOUNT_MAX = 5;

  var MAIN_PIN_HEIGHT = 81;
  var mainPinWidth = document.querySelector('.map__pin--main').offsetWidth;
  var mainPinRadius = Math.round(mainPinWidth / 2); // 33

  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');


  var mapPinsList = document.querySelector('.map__pins');

  var renderPin = function (index) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);
    var announcement = window.data.announcements[index];
    announcementElement.style.left = announcement.location.x - PIN_WIDTH / 2 + 'px';
    announcementElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
    announcementElement.querySelector('img').setAttribute('src', announcement.author.avatar);
    announcementElement.querySelector('img').setAttribute('alt', announcement.offer.title);
    announcementElement.querySelector('img').setAttribute('key', index);
    announcementElement.setAttribute('key', index);

    return announcementElement;
  };

  var removePins = function () {
    var pins = mapPinsList.querySelectorAll('button[type="button"]');
    pins.forEach(function (it) {
      it.remove();
    });
  };

  // Функция создания пинов на карте
  var createPin = function (data) {
    var takeNumber = Math.min(data.length, PIN_AMOUNT_MAX); // выводить не больше 5 элементов
    removePins();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(data[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  window.pin = {
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    mainPinRadius: mainPinRadius,
    mapPinsList: mapPinsList,

    create: createPin,
    remove: removePins
  };
})();
