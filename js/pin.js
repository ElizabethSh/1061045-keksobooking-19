'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var similarListElement = map.querySelector('.map__pins');
  var similarAnnouncementTemplate = document.querySelector('#pin')
        .content
        .querySelector('button');
  var addressField = document.querySelector('#address');
  // console.log(addressField);

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
    // similarListElement.appendChild(fragment);
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

      addressField.setAttribute('value', (mainPinHandler.offsetTop) + ', ' + mainPinHandler.offsetLeft);

      mainPinHandler.style.top = (mainPinHandler.offsetTop - shift.y) + 'px';
      mainPinHandler.style.left = (mainPinHandler.offsetLeft - shift.x) + 'px';

      // console.log(mainPinHandler.offsetTop);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addressField.setAttribute('value', (mainPinHandler.offsetTop) + ', ' + mainPinHandler.offsetLeft);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
