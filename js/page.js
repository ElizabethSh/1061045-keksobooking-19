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
  var main = document.querySelector('main'); // куда клонируем
  var similarErrorTemplate = document.querySelector('#error') // нашли что клонировать
                             .content
                             .querySelector('div');

  // Переводит страницу в неактивное состояние
  var deactivatePage = function () {
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
    window.backend.loading(successHandler, errorHandler);
    mapPinMainY = mapPinMainCoordinates.top.replace('px', '') * 1 + MAIN_PIN_HEIGHT;

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

  var successHandler = function (announcements) {
    window.createPin(announcements);
  };

  var errorHandler = function () {
    var similarErrorWindow = similarErrorTemplate.cloneNode(true); // клонируем шаблон
    main.appendChild(similarErrorWindow); // рисуем сообщение
    var errorButton = document.querySelector('.error__button');
    window.page.deactivatePage();
    errorButton.addEventListener('click', function () { // закрывает окно с ошибкой по клику на кнопку
      closeErrorMessage();
    });
    errorButton.addEventListener('keydown', function (evt) { // закрывает окно с ошибкой по Enter на кнопку
      window.util.isEnterEvent(evt, closeErrorMessage);
    });
    document.addEventListener('keydown', function (evt) { // закрывает окно с ошибкой по ESC
      window.util.isEscapeEvent(evt, closeErrorMessage);
    });
  };

  window.page = {
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };
})();
