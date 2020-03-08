'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var mapFilter = map.querySelector('.map__filters');
  var mapFilterFields = mapFilter.querySelectorAll('select');
  var notice = document.querySelector('.notice');
  var noticeFieldsets = notice.querySelectorAll('fieldset');

  // определяем координаты левого верхнего угла пина
  var mapPinMainCoordinates = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  // определяем координаты центра пина
  var mapPinMainX = mapPinMainCoordinates.x + window.util.MAIN_PIN_RADIUS;
  var mapPinMainY = mapPinMainCoordinates.y + window.util.MAIN_PIN_RADIUS;
  //
  var main = document.querySelector('main'); // куда клонируем
  var similarErrorTemplate = document.querySelector('#error') // нашли что клонировать
                             .content
                             .querySelector('div');


  // Функция перевода страницы в неактивное состояние
  var deactivate = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');

    // запоминаем начальные координаты пина до его перемещения
    mapPinMain.style.top = mapPinMainCoordinates.y + 'px';
    mapPinMain.style.left = mapPinMainCoordinates.x + 'px';

    // при деактивайии координата Y меняется (центр метки)
    mapPinMainY = mapPinMainCoordinates.y + window.util.MAIN_PIN_RADIUS;

    // подставляем координаты в поле адрес
    window.form.fillAddressField(mapPinMainX, mapPinMainY);
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
    window.backend.load(successHandler, errorHandler);

    // при активации координата Y изменяется (указатель пина)
    mapPinMainY = mapPinMainCoordinates.y + window.util.MAIN_PIN_HEIGHT;

    map.classList.remove('map--faded');

    mapFilter.querySelector('fieldset').removeAttribute('disabled'); // убирает из фильтра объявлений с fieldsetа disabled
    mapFilterFields.forEach(function (it) {
      it.removeAttribute('disabled'); // убирает из фильтра объявлений с selectов disabled
    });

    noticeForm.classList.remove('ad-form--disabled'); // убирает disabled с формы подачи объявления
    noticeFieldsets.forEach(function (it) {
      it.removeAttribute('disabled'); // убирает из объявлений с selectов disabled
    });

    window.form.fillAddressField(mapPinMainX, mapPinMainY);
    mapPinMain.removeEventListener('mousedown', onPinMousedownPress);
  };

  // функция активации страницы по mousedown на пин
  var onPinMousedownPress = function (evt) {
    window.util.isMouseLeftEvent(evt, activate);
  };

  // при нажатии на пин вызывает функцию onPinMousedownPress
  mapPinMain.addEventListener('mousedown', onPinMousedownPress);

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activate);
  });

  // функция успешной загрузки данных
  var successHandler = function (data) {
    window.data.announcements = data; // сохраняем загруженные данные в перем. announcements

    // если в объявлении не заполнен раздел offer, пин не отрисовывается
    window.data.isOfferFilled();
    window.pin.create(window.data.filteredData);
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
