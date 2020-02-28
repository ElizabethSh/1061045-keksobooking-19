'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('#card')
                            .content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container'); // элемент, перед которым вставляем карточку

  var propertyMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'any': 'Любой тип жилья'
  };

  var featuresClassMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  // отрисовка фото
  var renderPhotos = function (pathToPhoto) {
    var newElementImg = document.createElement('img');
    newElementImg.className = 'popup__photo';
    newElementImg.setAttribute('src', pathToPhoto);
    newElementImg.setAttribute('width', '45');
    newElementImg.setAttribute('height', '40');
    newElementImg.setAttribute('alt', 'Фото объекта размещения');
    return newElementImg;
  };


  var createPhotos = function (arrayOfPhotos) {
    var popupPhotos = document.querySelector('.popup__photos'); // конейнер с фотками
    document.querySelector('.popup__photo').remove(); // удали img, которое есть
    var fragment = document.createDocumentFragment(); // создай новый img c нужными атрибутами

    arrayOfPhotos.forEach(function (it) {
      fragment.appendChild(renderPhotos(it));
    });

    popupPhotos.appendChild(fragment);
  };

  // создаем элемент li списка удобств

  var renderFeatures = function (feature) {
    var newElementFeature = document.createElement('li');
    newElementFeature.className = 'popup__feature ' + featuresClassMap[feature];
    return newElementFeature;
  };

  // создаем список удобств

  var createFutures = function (arrayOfFeatures) {
    var popupFeaturesList = document.querySelector('.popup__features'); // существующий в шаблоне списое удобств
    var features = document.querySelectorAll('.popup__feature'); // находим все элементы li этого списка
    features.forEach(function (feature) { // удаляем их все
      feature.remove();
    });
    var fragment = document.createDocumentFragment(); // создаем новые элементы li в зависимости от содержания передаваемого массива
    arrayOfFeatures.forEach(function (it) { // для каждому новому li добавляем класс для отображения соответствующего удобства
      fragment.appendChild(renderFeatures(it));
    });
    popupFeaturesList.appendChild(fragment);
  };

  // код для создания и заполнения карточек
  var renderCard = function (announcement) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);
    cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = propertyMap[announcement.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', ' + 'выезд до ' + announcement.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = announcement.offer.description;

    return cardElement;
  };

  // рисует карточку объявления

  var createCard = function (annIndex) {
    var announcements = window.announcements;

    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(announcements[annIndex])); // создаем карточку

    map.insertBefore(fragment, mapFiltersContainer);

    createPhotos(window.announcements[annIndex].offer.photos); // добавляем фото объекта размещения
    createFutures(window.announcements[annIndex].offer.features); // добавляем доступные удобства*/
    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function () {
      window.util.closePopup('.map__card');
    });
    document.addEventListener('keydown', onCardEscPress);
  };

  // если произошло нажатие по esc вызывает функцию closeCard

  var onCardEscPress = function (evt) {
    window.util.isEscapeEvent(evt, closeCard);
  };

  // удаляет элемент с классом .map__card

  var closeCard = function () {
    window.util.closePopup('.map__card');
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    createCard: createCard
  };

})();
