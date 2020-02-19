'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var similarSuccessWindow = document.querySelector('#success').
                            content.querySelector('div');
  var main = document.querySelector('main'); // куда клонируем

  var onRoomsCapasityChange = function () {
    if (roomNumber.value === '1' && capacity.value !== '1') {
      roomNumber.setCustomValidity('Для такого количества комнат можно выбрать 1 гостя');
    } else if ((roomNumber.value === '2' && capacity.value < '1') || (roomNumber.value === '2' && capacity.value > '2')) {
      roomNumber.setCustomValidity('Для такого количества комнат можно выбрать 1 или 2 гостей');
    } else if (roomNumber.value === '3' && capacity.value < '1') {
      roomNumber.setCustomValidity('Для такого количества комнат можно выбрать 1, 2 или 3 гостей');
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      roomNumber.setCustomValidity('Для такого количества комнат можно выбрать вариант "не для гостей"');
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', function () {
    onRoomsCapasityChange();
  });

  capacity.addEventListener('change', function () {
    onRoomsCapasityChange();
  });

  // отправка формы
  var map = document.querySelector('.map');

  var closeSuccessWindow = function () {
    var successWindow = document.querySelector('.success');
    successWindow.remove();
  };

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(noticeForm), function () {
      // map.classList.add('map--faded');
      // noticeForm.classList.add('ad-form--disabled');
      var windowSuccess = similarSuccessWindow.cloneNode(true);
      main.appendChild(windowSuccess);
      main.querySelector('.success').addEventListener('click', closeSuccessWindow);
      document.addEventListener('keydown', function (evtEsc) {
        window.util.isEscapeEvent(evtEsc, closeSuccessWindow);
      });
    }, window.page.errorHandler);
    evt.preventDefault();
  });
})();
