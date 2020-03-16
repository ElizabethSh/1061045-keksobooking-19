'use strict';

(function () {
  var PIN_AMOUNT_MAX = 5;

  var Size = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_HEIGHT: 81,
    MAIN_RADIUS: 33
  };

  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');


  var mapPinItems = document.querySelector('.map__pins');

  var renderPin = function (index) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);
    var announcement = window.data.announcements[index];
    announcementElement.style.left = announcement.location.x - Size.WIDTH / 2 + 'px';
    announcementElement.style.top = announcement.location.y - Size.HEIGHT + 'px';
    announcementElement.querySelector('img').src = announcement.author.avatar;
    announcementElement.querySelector('img').alt = announcement.offer.title;
    announcementElement.querySelector('img').dataset.key = index;
    announcementElement.dataset.key = index;

    return announcementElement;
  };

  var removePins = function () {
    var pins = mapPinItems.querySelectorAll('button[type="button"]');
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
    mapPinItems.appendChild(fragment);
  };

  window.pin = {
    Size: Size,
    mapItems: mapPinItems,

    create: createPin,
    remove: removePins
  };
})();
