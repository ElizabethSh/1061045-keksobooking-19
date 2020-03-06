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

  var removeBlock = function (array, className) {
    if (array.length === 0) {
      window.util.removeElement(className);
    }
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

  // создание фоток в карточке
  var createPhotos = function (arrayOfPhotos) {
    var popupPhotos = document.querySelector('.popup__photos'); // конейнер с фотками
    document.querySelector('.popup__photo').remove(); // удали img, которое есть
    removeBlock(arrayOfPhotos, '.popup__photos');
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
    removeBlock(arrayOfFeatures, '.popup__features');

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
  var renderCard = function (annIndex) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var announcement = window.util.announcements[annIndex];
    var popupAvatar = cardElement.querySelector('.popup__avatar');

    if (announcement.author.avatar !== '') {
      popupAvatar.setAttribute('src', announcement.author.avatar);
    } else {
      popupAvatar.remove();
    }

    var isFieldFilled = function (fieldOfAnnounsment, className) {
      if (fieldOfAnnounsment !== '') {
        cardElement.querySelector(className).textContent = fieldOfAnnounsment;
      } else {
        cardElement.querySelector(className).remove();
      }
    };


    isFieldFilled(announcement.offer.title, '.popup__title');
    isFieldFilled(announcement.offer.address, '.popup__text--address');

    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    if (announcement.offer.price !== 0) {
      popupTextPrice.textContent = announcement.offer.price + ' ₽/ночь';
    } else {
      popupTextPrice.remove();
    }

    isFieldFilled(propertyMap[announcement.offer.type], '.popup__type');

    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    if (announcement.offer.rooms !== 0 && announcement.offer.guests !== 0) {
      popupTextCapacity.textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    } else {
      popupTextCapacity.remove();
    }

    var popupTextTime = cardElement.querySelector('.popup__text--time');
    if (announcement.offer.checkin !== '' && announcement.offer.checkout !== '') {
      popupTextTime.textContent = 'Заезд после ' + announcement.offer.checkin + ', ' + 'выезд до ' + announcement.offer.checkout;
    } else {
      popupTextTime.remove();
    }

    isFieldFilled(announcement.offer.description, '.popup__description');

    return cardElement;
  };

  // функция создания карточки объявления

  var createCard = function (annIndex) {

    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard([annIndex])); // создаем карточку

    map.insertBefore(fragment, mapFiltersContainer);

    createPhotos(window.util.announcements[annIndex].offer.photos); // добавляем фото объекта размещения
    createFutures(window.util.announcements[annIndex].offer.features); // добавляем доступные удобства*/
    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', removeCard);
    document.addEventListener('keydown', onCardEscPress);
  };

  // если произошло нажатие по esc вызывает функцию closeCard

  var onCardEscPress = function (evt) {
    window.util.isEscapeEvent(evt, removeCard);
  };

  // удаляет элемент с классом .map__card

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    create: createCard,
    remove: removeCard
  };

})();
