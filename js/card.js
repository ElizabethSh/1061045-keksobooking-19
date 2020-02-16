'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins'); // куда вставить клоны
  var similarCardTemplate = document.querySelector('#card')
                            .content.querySelector('.map__card');

  var announcement = {
    author: {
      avatar: 'img/avatars/user02.png'
    },

    offer: {
      title: 'Маленькая квартирка рядом с парком',
      address: '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
      price: 30000,
      type: 'flat',
      rooms: 1,
      guests: 1,
      checkin: '9:00',
      checkout: '7:00',
      features: ['elevator', 'conditioner'],
      description: 'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
      photos: [
        'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg',
        'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/23e332cb-1379-4582-85ac-901d6c441635.jpeg',
      ],
    },
    location: {
      x: 471,
      y: 545
    }
  };

  var getProperty = function () {
    switch (announcement.offer.type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало ';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Не указан';
    }
  };
  // не работает отрисовка фото

  var renderPhotos = function (photo) {
    var newElement = document.createElement('img');
    newElement.className = 'popup__photo';
    newElement.setAttribute('src', photo);
    return newElement;
  };


  var createPhotos = function (array) {
    var popupPhotos = document.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < announcement.offer.photos.length; i++) {

      fragment.appendChild(renderPhotos(array[i]));
    }
    popupPhotos.appendChild(fragment);
  };

  createPhotos(announcement.offer.photos);

  // код для создания и заполнения карточек

  var renderCard = function () {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getProperty();
    cardElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', ' + 'выезд до ' + announcement.offer.checkout;

    cardElement.querySelector('.popup__description').textContent = announcement.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);

    return cardElement;
  };

  var createCard = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(announcement));

    similarListElement.appendChild(fragment);
  };

  createCard(); // вызов функции, чтобы проверить отрисовку карточки
})();
