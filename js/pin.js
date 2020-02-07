'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var announcements = [];
  var map = document.querySelector('.map');
  var similarListElement = map.querySelector('.map__pins');
  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');

  // Код для отрисовки пинов на карте

  for (var i = 0; i < 8; i++) {
    announcements[i] = window.data.getArraysData(i);
  }

  var renderAnnouncement = function (announcement) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);

    announcementElement.style.left = announcement.location.x + PIN_WIDTH / 2 + 'px';
    announcementElement.style.top = announcement.location.y + PIN_HEIGHT + 'px';
    announcementElement.querySelector('img').setAttribute('src', announcement.author.avatar);
    announcementElement.querySelector('img').setAttribute('alt', announcement.offer.title);

    return announcementElement;
  };

  window.createPin = function () {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < 8; k++) {
      fragment.appendChild(renderAnnouncement(announcements[k]));
    }
    similarListElement.appendChild(fragment);
  };
})();
