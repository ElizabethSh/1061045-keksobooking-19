'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').scrollHeight;
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  // var GET_POST = 'https://js.dump.academy/keksobooking';

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var addressField = noticeForm.querySelector('#address');
  var mapFilter = map.querySelector('.map__filters');
  var mapFilterFields = mapFilter.querySelectorAll('select');
  var notice = document.querySelector('.notice');
  var noticeFieldsets = notice.querySelectorAll('fieldset');

  var mapPinMainCoordinates = {
    x: mapPinMain.style.left.replace('px', ''),
    y: mapPinMain.style.top.replace('px', '')
  };
  var mapPinMainX = mapPinMainCoordinates.x * 1 + Math.round(MAIN_PIN_WIDTH / 2);
  var mapPinMainY = mapPinMainCoordinates.y * 1 + Math.round(MAIN_PIN_WIDTH / 2);
  var main = document.querySelector('main'); // куда клонируем
  var similarErrorTemplate = document.querySelector('#error') // нашли что клонировать
                             .content
                             .querySelector('div');

  // Переводит страницу в неактивное состояние

  var deactivatePage = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = mapPinMainCoordinates.x + 'px';
    mapPinMain.style.top = mapPinMainCoordinates.y + 'px';

    mapPinMainY = mapPinMainCoordinates.y * 1 + Math.round(MAIN_PIN_WIDTH / 2);
    addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);
    mapFilter.querySelector('fieldset').setAttribute('disabled', '');

    for (i = 0; i < mapFilterFields.length; i++) {
      mapFilterFields[i].setAttribute('disabled', '');
    }

    for (var i = 0; i < noticeFieldsets.length; i++) {
      noticeFieldsets[i].setAttribute('disabled', '');
    }
  };

  deactivatePage();

  // Переводит страницу в активное состояние

  var activatePage = function () {
    window.backend.load(URL_GET, successHandler, errorHandler);
    mapPinMainY = mapPinMainCoordinates.y * 1 + MAIN_PIN_HEIGHT;
    console.log(mapPinMainY);

    map.classList.remove('map--faded');
    for (var i = 0; i < mapFilterFields.length; i++) {
      mapFilterFields[i].removeAttribute('disabled'); // убирает из фильтра объявлений с selectов disabled
    }
    mapFilter.querySelector('fieldset').removeAttribute('disabled'); // убирает из фильтра объявлений с fieldsetов disabled
    noticeForm.classList.remove('ad-form--disabled'); // убирает disabled с формы
    for (i = 0; i < noticeFieldsets.length; i++) {
      noticeFieldsets[i].removeAttribute('disabled'); // убирает из объявлений с selectов disabled
    }
    // window.createPin(); // создает пины на карте
    addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY); // при активации страницы меняет координату Y main-pin
  };

  mapPinMain.addEventListener('mousedown', function () {
    window.util.isMouseLeftEvent(activatePage);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  });

  var closeErrorMessage = function () {
    var errorWindow = document.querySelector('.error');
    errorWindow.remove();
  };

  // similar.js

  var announcements = [];
  var propertyMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'any': 'Любой тип жилья'
  };

  // var housingTypeFilter = document.querySelector('#housing-type');

  /* housingTypeFilter.addEventListener('change', function () {
    var chosenType = propertyMap[housingTypeFilter.value];
    updateAnnounsments(chosenType);
  });

  var updateAnnounsments = function () {
    var sameTypeOfProperty = announcements.filter(function (announcement) {
      // return announcement.offer.type === chosenType;
    });
    window.createPin(sameTypeOfProperty);
  };*/

  var successHandler = function (announcements) {
    // announcements = data;
    window.createPin(announcements);
    // updateAnnounsments();
  };

  var errorHandler = function () {
    var similarErrorWindow = similarErrorTemplate.cloneNode(true); // клонируем шаблон
    main.appendChild(similarErrorWindow); // рисуем сообщение
    var errorButton = document.querySelector('.error__button');
    deactivatePage();
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');
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
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };

})();
