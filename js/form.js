'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var addressField = noticeForm.querySelector('#address'); // находим поле адреса
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  var similarSuccessWindow = document.querySelector('#success').
                            content.querySelector('div');

  var main = document.querySelector('main'); // куда клонируем
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var propertyType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');

  var priceOfPropertyMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var fillAddressField = function (x, y) {
    addressField.setAttribute('value', x + ', ' + y);
  };

  // соответствие полей кол-во комнат и кол-во гостей

  var onRoomsCapasityChange = function () {
    var roomNumberValue = parseInt(roomNumber.value, 10);
    var capacityValue = parseInt(capacity.value, 10);
    var message = 'Для такого количества комнат можно выбрать ';

    if (roomNumberValue === 1 && capacityValue !== 1) {
      roomNumber.setCustomValidity(message + '1 гостя');
    } else if ((roomNumberValue === 2 && capacityValue < 1) || (roomNumberValue === 2 && capacityValue > 2)) {
      roomNumber.setCustomValidity(message + '1 или 2 гостей');
    } else if (roomNumberValue === 3 && capacityValue < 1) {
      roomNumber.setCustomValidity(message + '1, 2 или 3 гостей');
    } else if (roomNumberValue === 100 && capacityValue !== 0) {
      roomNumber.setCustomValidity(message + 'вариант "не для гостей"');
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', onRoomsCapasityChange);
  capacity.addEventListener('change', onRoomsCapasityChange);

  // время заезда и выезда

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  timeIn.addEventListener('change', onTimeInChange);


  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeOut.addEventListener('change', onTimeOutChange);

  // соответствие типа жилья и минимальной цены

  var onPropertyTypeChange = function () {
    price.placeholder = priceOfPropertyMap[propertyType.value];
    price.setAttribute('min', priceOfPropertyMap[propertyType.value]);
  };

  propertyType.addEventListener('change', onPropertyTypeChange);

  // закрытие окна с сообщением об успешной отправке формы

  var closeSuccessWindow = function () {
    window.util.removeElement('.success');
    noticeForm.reset();
    document.removeEventListener('keydown', onSuccessWindowEscPress);
  };

  var onSuccessWindowEscPress = function (evt) {
    window.util.isEscapeEvent(evt, closeSuccessWindow);
  };

  // функция-обработчик успешной отправки данных

  var onSuccessSend = function () {
    window.page.deactivate();
    var windowSuccess = similarSuccessWindow.cloneNode(true);
    main.appendChild(windowSuccess);
    main.querySelector('.success').addEventListener('click', closeSuccessWindow);
    document.addEventListener('keydown', onSuccessWindowEscPress);
  };

  // отправка данных формы

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(noticeForm), onSuccessSend, window.page.errorHandler);
    evt.preventDefault();
  });

  // сброс введенных данных в форме

  noticeForm.addEventListener('reset', function () {
    noticeForm.reset();
    window.page.deactivate();
    window.card.remove();
    window.pin.remove();
  });

  window.form = {
    fillAddressField: fillAddressField
  };
})();
