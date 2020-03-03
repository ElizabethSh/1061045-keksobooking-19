'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var mapFilter = map.querySelector('.map__filters');
  var mapFilterFields = mapFilter.querySelectorAll('select');
  var notice = document.querySelector('.notice');
  var noticeFieldsets = notice.querySelectorAll('fieldset');
  var addressField = noticeForm.querySelector('#address'); // находим поле адреса

  // определяем координаты левого верхнего угла пина
  var mapPinMainCoordinates = {
    x: mapPinMain.style.left.replace('px', ''),
    y: mapPinMain.style.top.replace('px', '')
  };

  // определяем координаты центра пина
  var mapPinMainX = mapPinMainCoordinates.x * 1 + window.util.MAIN_PIN_RADIUS;
  var mapPinMainY = mapPinMainCoordinates.y * 1 + window.util.MAIN_PIN_RADIUS;
  //
  var main = document.querySelector('main'); // куда клонируем
  var similarErrorTemplate = document.querySelector('#error') // нашли что клонировать
                             .content
                             .querySelector('div');
  var mapPinsList = map.querySelector('.map__pins');

  // Функция перевода страницы в неактивное состояние

  var deactivate = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');

    // запоминаем начальные координаты пина до его перемещения

    mapPinMain.style.top = mapPinMainCoordinates.y + 'px';
    mapPinMain.style.left = mapPinMainCoordinates.x + 'px';

    // при деактивайии координата Y меняется (центр метки)
    mapPinMainY = mapPinMainCoordinates.y * 1 + window.util.MAIN_PIN_RADIUS;

    // подставляем координаты в поле адрес
    addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);

    mapFilter.querySelector('fieldset').setAttribute('disabled', '');

    mapFilterFields.forEach(function (it) {
      it.setAttribute('disabled', '');
    });

    noticeFieldsets.forEach(function (it) {
      it.setAttribute('disabled', '');
    });
    mapPinMain.addEventListener('mousedown', onPinMousedownPress);
  };

  deactivate();

  // Переводит страницу в активное состояние

  var activate = function () {
    window.backend.load(URL_GET, successHandler, errorHandler);

    // при активации координата Y изменяется (указатель пина)
    mapPinMainY = mapPinMainCoordinates.y * 1 + window.util.MAIN_PIN_HEIGHT;

    map.classList.remove('map--faded');

    mapFilter.querySelector('fieldset').removeAttribute('disabled'); // убирает из фильтра объявлений с fieldsetа disabled
    mapFilterFields.forEach(function (it) {
      it.removeAttribute('disabled'); // убирает из фильтра объявлений с selectов disabled
    });

    noticeForm.classList.remove('ad-form--disabled'); // убирает disabled с формы подачи объявления
    noticeFieldsets.forEach(function (it) {
      it.removeAttribute('disabled'); // убирает из объявлений с selectов disabled
    });

    addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY); // при активации страницы меняет координату в поле адрес

    mapPinMain.removeEventListener('mousedown', onPinMousedownPress);
  };

  // функция активации страницы по mousedown на пин
  var onPinMousedownPress = function () {
    window.util.isMouseLeftEvent(activate);
  };

  // при нажатии на пин вызывает функцию onPinMousedownPress
  mapPinMain.addEventListener('mousedown', onPinMousedownPress);

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activate);
  });

  var housingType = mapFilter.querySelector('#housing-type');
  var housingPrice = mapFilter.querySelector('#housing-price');
  var housingRoom = mapFilter.querySelector('#housing-rooms');
  var housingGuests = mapFilter.querySelector('#housing-guests');
  // var allfeatures = mapFilter.querySelectorAll('input[type="checkbox"]:checked');

  var propertyChoice;
  var priceChoice;
  var roomChoice;
  var guestChoice;

  mapFilter.addEventListener('change', function () {
    window.card.remove();
    propertyChoice = housingType.value;
    priceChoice = housingPrice.value;
    roomChoice = parseInt(housingRoom.value, 10);
    guestChoice = parseInt(housingGuests.value, 10);

    window.debounce(updateData);
  });


  var updateData = function () {
    var filteredData = [];
    window.announcements.forEach(function (it) {
      if (it.offer.price >= 10000 && it.offer.price <= 50000) {
        var chosenPrise = 'middle';
      } else if (it.offer.price < 10000) {
        chosenPrise = 'low';
      } else if (it.offer.price > 50000) {
        chosenPrise = 'high';
      } else {
        chosenPrise = 'any';
      }

      if ((it.offer.type === propertyChoice || housingType.value === 'any') &&
      (it.offer.rooms === roomChoice || housingRoom.value === 'any') &&
      (it.offer.guests === guestChoice || housingGuests.value === 'any') &&
      (chosenPrise === priceChoice || housingPrice.value === 'any')) {
        filteredData.push(it);
      }
    });

    window.pin.create(filteredData);

    mapPinsList.addEventListener('click', function (evt) {
      window.card.remove();
      if (evt.target && (evt.target.matches('img') || evt.target.matches('button[type="button"]'))) {
        if (!evt.target.matches('img[alt="Метка объявления"]')) {
          window.card.create(filteredData, evt.target.getAttribute('key'));
        }
      }
    });
  };

  // функция успешной загрузки данных
  var successHandler = function (data) {
    window.announcements = data; // сохраняем загруженные данные в перем. announcements
    window.pin.create(window.announcements);
  };

  // функция закрытия окна ошибки

  var closeErrorMessage = function () {
    var errorWindow = document.querySelector('.error');
    errorWindow.remove();
  };

  // функция ошибки загрузки данных

  var errorHandler = function () {
    var similarErrorWindow = similarErrorTemplate.cloneNode(true); // клонируем шаблон
    main.appendChild(similarErrorWindow); // рисуем сообщение
    var errorButton = document.querySelector('.error__button');
    deactivate();
    errorButton.addEventListener('click', closeErrorMessage); // закрывает окно с ошибкой по клику на кнопку
    document.querySelector('.error').addEventListener('click', closeErrorMessage);
    errorButton.addEventListener('keydown', function (evt) { // закрывает окно с ошибкой по Enter на кнопку
      window.util.isEnterEvent(evt, closeErrorMessage);
    });
    document.addEventListener('keydown', function (evt) { // закрывает окно с ошибкой по ESC
      window.util.isEscapeEvent(evt, closeErrorMessage);
    });
  };

  window.page = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    deactivate: deactivate,
    activate: activate,
  };

})();
