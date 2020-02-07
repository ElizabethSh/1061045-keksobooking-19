'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').scrollHeight;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var addressField = noticeForm.querySelector('#address');
  var mapFilter = map.querySelector('.map__filters');
  var mapFilterFields = mapFilter.querySelectorAll('select');
  var notice = document.querySelector('.notice');
  var noticeFieldsets = notice.querySelectorAll('fieldset');

  var mapPinMainCoordinates = mapPinMain.style;
  var mapPinMainX = mapPinMainCoordinates.left.replace('px', '') * 1 + Math.round(MAIN_PIN_WIDTH / 2);
  var mapPinMainY = mapPinMainCoordinates.top.replace('px', '') * 1 + Math.round(MAIN_PIN_WIDTH / 2);

  // Переводит страницу в неактивное состояние
  addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);
  mapFilter.querySelector('fieldset').setAttribute('disabled', '');

  for (i = 0; i < mapFilterFields.length; i++) {
    mapFilterFields[i].setAttribute('disabled', '');
  }

  for (var i = 0; i < noticeFieldsets.length; i++) {
    noticeFieldsets[i].setAttribute('disabled', '');
  }

  // Переводит страницу в активное состояние

  var activatePage = function () {
    mapPinMainY = mapPinMainCoordinates.top.replace('px', '') * 1 + MAIN_PIN_HEIGHT;

    map.classList.remove('map--faded');
    for (i = 0; i < mapFilterFields.length; i++) {
      mapFilterFields[i].removeAttribute('disabled');
    }
    mapFilter.querySelector('fieldset').removeAttribute('disabled');
    noticeForm.classList.remove('ad-form--disabled');
    for (i = 0; i < noticeFieldsets.length; i++) {
      noticeFieldsets[i].removeAttribute('disabled');
    }
    window.createPin();
    addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);
  };

  mapPinMain.addEventListener('mousedown', function () {
    window.util.isMouseLeftEvent(activatePage);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  });
})();
