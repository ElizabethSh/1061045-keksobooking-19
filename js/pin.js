'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var similarListElement = map.querySelector('.map__pins');
  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');

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
    similarListElement.innerHTML = '';
    // var fragment = document.createDocumentFragment();
    for (var k = 0; k < takeNumber; k++) {
      similarListElement.appendChild(renderPin(data[k]));
    }
    // similarListElement.appendChild(fragment);
  };

})();
