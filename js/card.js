'use strict';

(function () {
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
    newElementImg.src = pathToPhoto;
    newElementImg.width = 45;
    newElementImg.height = 40;
    newElementImg.alt = 'Фото объекта размещения';
    return newElementImg;
  };

  // создание фоток в карточке
  var createPhotos = function (arrayOfPhotos) {
    var popupPhotos = document.querySelector('.popup__photos'); // конейнер с фотками
    popupPhotos.innerHTML = ''; // очисти контейнер от фото
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

    popupFeaturesList.innerHTML = '';

    var fragment = document.createDocumentFragment(); // создаем новые элементы li в зависимости от содержания передаваемого массива
    arrayOfFeatures.forEach(function (it) { // для каждому новому li добавляем класс для отображения соответствующего удобства
      fragment.appendChild(renderFeatures(it));
    });
    popupFeaturesList.appendChild(fragment);
  };

  // код для создания и заполнения карточек
  var renderCard = function (announcementsIndex) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var announcement = window.data.announcements[announcementsIndex];
    var popupAvatar = cardElement.querySelector('.popup__avatar');

    if (announcement.author.avatar !== '') {
      popupAvatar.src = announcement.author.avatar;
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

  var onCloseButtonPress = function () {
    removeCard();
  };

  var onDocumentEscPress = function (evt) {
    window.util.isEscapeEvent(evt, removeCard);
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      var popupCloseButton = document.querySelector('.popup__close');
      mapCard.remove();
      popupCloseButton.removeEventListener('click', onCloseButtonPress);
    }
    document.removeEventListener('keydown', onDocumentEscPress);
  };


  // функция создания карточки объявления
  var createCard = function (announcementsIndex) {
    window.card.remove(); // функция удаления карточки, чтобы всегда открыта была талько одна
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(announcementsIndex)); // создаем карточку

    window.page.map.insertBefore(fragment, mapFiltersContainer);

    createPhotos(window.data.announcements[announcementsIndex].offer.photos); // добавляем фото объекта размещения
    createFutures(window.data.announcements[announcementsIndex].offer.features); // добавляем доступные удобства*/
    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', onCloseButtonPress);
    document.addEventListener('keydown', onDocumentEscPress);
  };

  window.card = {
    create: createCard,
    remove: removeCard
  };

})();
