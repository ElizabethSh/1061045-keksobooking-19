'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  var similarSuccessWindow = document.querySelector('#success').
                            content.querySelector('div');

  var main = document.querySelector('main'); // куда клонируем
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var propertyType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var similarListElement = document.querySelector('.map__pins');

  var priceOfPropertyMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // соответствие полей кол-во комнат и кол-во гостей

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

  // время заезда и выезда

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  // соответствие типа жилья и минимальной цены

  var onPropertyTypeChange = function () {
    price.placeholder = priceOfPropertyMap[propertyType.value];
    price.setAttribute('min', priceOfPropertyMap[propertyType.value]);
  };

  propertyType.addEventListener('change', function () {
    onPropertyTypeChange();
  });

  var closeSuccessWindow = function () {
    window.util.removeElement('.success');
    noticeForm.reset();
    document.removeEventListener('keydown', onSuccessWindowEscPress);
  };

  var onSuccessWindowEscPress = function (evt) {
    window.util.isEscapeEvent(evt, closeSuccessWindow);
  };

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(noticeForm), function () {
      window.page.deactivatePage();
      var windowSuccess = similarSuccessWindow.cloneNode(true);
      main.appendChild(windowSuccess);
      main.querySelector('.success').addEventListener('click', function () {
        closeSuccessWindow();
      });
      document.addEventListener('keydown', onSuccessWindowEscPress);
    }, window.page.errorHandler);
    evt.preventDefault();
  });

  var removePins = function () {
    var pins = [];
    pins = similarListElement.querySelectorAll('button[type="button"]');
    pins.forEach(function (it) {
      it.remove();
    });
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  noticeForm.addEventListener('reset', function () {
    noticeForm.reset();
    window.page.deactivatePage();
    removeCard();
    window.form.removePins();
  });

  window.form = {
    removePins: removePins,
  };
})();
