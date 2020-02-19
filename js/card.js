'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarCardTemplate = document.querySelector('#card')
                            .content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container'); // элемент, перед которым вставляем карточку

  var announcement = {
    author: {
      avatar: 'img/avatars/user02.png'
    },

    offer: {
      title: 'Маленькая квартирка рядом с парком',
      address: '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
      price: 30000,
      type: 'house',
      rooms: 1,
      guests: 1,
      checkin: '9:00',
      checkout: '7:00',
      features: ['wifi', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
      photos: [
        'https://cdn.ostrovok.ru/t/x500/mec/hotels/5000000/4500000/4493700/4493658/4493658_17_b.jpg',
        'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/23e332cb-1379-4582-85ac-901d6c441635.jpeg',
      ],
    },
    location: {
      x: 471,
      y: 545
    }
  };

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

  var renderPhotos = function (photo) {
    var newElement = document.createElement('img');
    newElement.className = 'popup__photo';
    newElement.setAttribute('src', photo);
    newElement.setAttribute('width', '45');
    newElement.setAttribute('height', '40');
    return newElement;
  };


  var createPhotos = function (array) {
    var popupPhotos = document.querySelector('.popup__photos');
    document.querySelector('.popup__photo').remove();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < announcement.offer.photos.length; i++) {

      fragment.appendChild(renderPhotos(array[i]));
    }
    popupPhotos.appendChild(fragment);
  };

  // отрисовка удобств

  var renderFeatures = function (feature) {
    var newElement = document.createElement('li');
    newElement.className = 'popup__feature ' + featuresClassMap[feature];
    return newElement;
  };

  renderFeatures(announcement.offer.features[0]);

  var createFutures = function (array) {
    var popupFeaturesList = document.querySelector('.popup__features');
    var features = document.querySelectorAll('.popup__feature');
    features.forEach(function (feature) {
      feature.remove();
    });
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < announcement.offer.features.length; i++) {

      fragment.appendChild(renderFeatures(array[i]));
    }
    popupFeaturesList.appendChild(fragment);
  };

  // код для создания и заполнения карточек

  var renderCard = function () {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = propertyMap[announcement.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', ' + 'выезд до ' + announcement.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = announcement.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);

    return cardElement;
  };

  window.createCard = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(announcement)); // создаем карточку

    map.insertBefore(fragment, mapFiltersContainer);
    createPhotos(announcement.offer.photos); // добавляем фото объекта размещения
    createFutures(announcement.offer.features); // добавляем доступные удобства
  };

  window.createCard(); // вызов функции, чтобы проверить отрисовку карточки
})();
