'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_AMOUNT_MAX = 5;

  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');

  var renderPin = function (index) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);
    var announcement = window.util.announcements[index];
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
    var takeNumber = data.length > PIN_AMOUNT_MAX ? PIN_AMOUNT_MAX : data.length; // выводить не больше 5 элементов
    // var fragment = document.createDocumentFragment();
    removePins();
    for (var k = 0; k < takeNumber; k++) {
      mapPinsList.appendChild(renderPin(data[k]));
    }
  };

  window.pin = {
    create: createPin,
    remove: removePins
  };
})();
