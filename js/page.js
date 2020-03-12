'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters'); // чтобы найти все селекты
  var mapFilterFields = mapFilter.querySelectorAll('select');
  var notice = document.querySelector('.notice');
  var noticeFieldsets = notice.querySelectorAll('fieldset');

  // определяем координаты левого верхнего угла пина
  var mapPinMainCoordinates = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  // определяем координаты центра пина
  var mapPinMainX = mapPinMainCoordinates.x + window.pin.mainPinRadius;
  var mapPinMainY = mapPinMainCoordinates.y + window.pin.mainPinRadius;

  var similarErrorTemplate = document.querySelector('#error') // нашли что клонировать
                             .content
                             .querySelector('div');


  // Функция перевода страницы в неактивное состояние
  var deactivate = function () {
    window.map.removeListeners();
    window.preview.removeListeners();
    window.data.mapFilter.removeEventListener('change', window.data.onFiltersChange);
    window.form.removeListeners();
    mapFilter.reset();
    map.classList.add('map--faded');
    window.form.noticeForm.classList.add('ad-form--disabled');

    // запоминаем начальные координаты пина до его перемещения
    mapPinMain.style.top = mapPinMainCoordinates.y + 'px';
    mapPinMain.style.left = mapPinMainCoordinates.x + 'px';

    // при деактивайии координата Y меняется (центр метки)
    mapPinMainY = mapPinMainCoordinates.y + window.pin.mainPinRadius;

    // подставляем координаты в поле адрес
    window.form.fillAddressField(mapPinMainX, mapPinMainY);
    window.form.price.placeholder = window.form.priceOfPropertyMap.flat;
    window.form.price.min = window.form.priceOfPropertyMap.flat;
    mapFilter.querySelector('fieldset').setAttribute('disabled', '');

    mapFilterFields.forEach(function (it) {
      it.setAttribute('disabled', '');
    });

    noticeFieldsets.forEach(function (it) {
      it.setAttribute('disabled', '');
    });
    mapPinMain.addEventListener('mousedown', onPinMousedownPress);
    mapPinMain.addEventListener('keydown', onMainPinEnterPress);
  };

  deactivate();


  // Переводит страницу в активное состояние
  var activate = function () {
    window.map.addListeners();
    window.preview.addListeners();
    window.form.addListeners();
    window.data.mapFilter.addEventListener('change', window.data.onFiltersChange);
    window.backend.load(successHandler, errorHandler);

    // при активации координата Y изменяется (указатель пина)
    mapPinMainY = mapPinMainCoordinates.y + window.pin.MAIN_PIN_HEIGHT;

    map.classList.remove('map--faded');

    mapFilter.querySelector('fieldset').removeAttribute('disabled'); // убирает из фильтра объявлений с fieldsetа disabled
    mapFilterFields.forEach(function (it) {
      it.removeAttribute('disabled'); // убирает из фильтра объявлений с selectов disabled
    });

    window.form.noticeForm.classList.remove('ad-form--disabled'); // убирает disabled с формы подачи объявления
    noticeFieldsets.forEach(function (it) {
      it.removeAttribute('disabled'); // убирает из объявлений с selectов disabled
    });

    window.form.fillAddressField(mapPinMainX, mapPinMainY);
    mapPinMain.removeEventListener('mousedown', onPinMousedownPress);
    mapPinMain.removeEventListener('keydown', onMainPinEnterPress);
  };

  // функция активации страницы по mousedown на пин
  var onPinMousedownPress = function (evt) {
    window.util.isMouseLeftEvent(evt, activate);
  };

  mapPinMain.addEventListener('mousedown', onPinMousedownPress);

  // функция активации страницы по нажатию Enter на пин
  var onMainPinEnterPress = function (evt) {
    window.util.isEnterEvent(evt, activate);
  };

  mapPinMain.addEventListener('keydown', onMainPinEnterPress);


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
    var errorButton = document.querySelector('.error__button');
    errorWindow.remove();
    document.removeEventListener('keydown', onDocumentEscPress);
    errorButton.removeEventListener('click', onErrorButtonPress);
    errorWindow.removeEventListener('click', onErrorWindowClick);
  };

  var onErrorWindowClick = function () {
    closeErrorMessage();
  };

  var onErrorButtonPress = function (evt) {
    evt.stopPropagation();
    closeErrorMessage();
  };

  var onDocumentEscPress = function (evt) { // закрывает окно с ошибкой по ESC
    window.util.isEscapeEvent(evt, closeErrorMessage);
  };

  // функция ошибки загрузки данных
  var errorHandler = function () {
    var similarErrorWindow = similarErrorTemplate.cloneNode(true); // клонируем шаблон
    window.form.main.appendChild(similarErrorWindow); // рисуем сообщение
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonPress); // закрывает окно с ошибкой по клику на кнопку
    document.querySelector('.error').addEventListener('click', onErrorWindowClick); // закрывает окно с ошибкой по клику на произвольную область экрана за пределами блока с сообщением
    document.addEventListener('keydown', onDocumentEscPress); // закрывает окно с ошибкой по ESC
  };

  window.page = {
    map: map,

    successHandler: successHandler,
    errorHandler: errorHandler,
    deactivate: deactivate,
    activate: activate,
  };

})();
