'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');

  var renderPin = function (announcement, index) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);

    announcementElement.style.left = announcement.location.x + PIN_WIDTH / 2 + 'px';
    announcementElement.style.top = announcement.location.y + PIN_HEIGHT + 'px';
    announcementElement.querySelector('img').setAttribute('src', announcement.author.avatar);
    announcementElement.querySelector('img').setAttribute('alt', announcement.offer.title);
    announcementElement.querySelector('img').setAttribute('key', index);
    announcementElement.setAttribute('key', index);

    return announcementElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
