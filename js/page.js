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


  // Функция перевода страницы в неактивное состояние

  var deactivatePage = function () {
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

  deactivatePage();

  // Переводит страницу в активное состояние

  var activatePage = function () {
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
    window.util.isMouseLeftEvent(activatePage);
  };

  // при нажатии на пин вызывает функцию onPinMousedownPress
  mapPinMain.addEventListener('mousedown', onPinMousedownPress);

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  });

  // функция успешной загрузки данных

  var successHandler = function (data) {
    window.announcements = data;
    window.createPin(window.announcements);
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
    deactivatePage();
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
    activatePage: activatePage,
  };

})();
