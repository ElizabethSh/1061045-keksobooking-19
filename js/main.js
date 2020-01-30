'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var openMap = document.querySelector('.map');
openMap.classList.remove('map--faded');

var similarListElement = openMap.querySelector('.map__pins');
var similarAnnouncementTemplate = document.querySelector('#pin')
      .content
      .querySelector('button');

var getNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

var getArray = function (arr) {
  var newArray = [];
  for (var j = 0; j < arr.length; j++) {
    var randomNumber = Math.random();
    if (randomNumber < 0.5) {
      newArray += (arr[j] + ', ');
    }
  }
  return newArray;
};

var getArraysIndex = function (arr) {
  var arraysIndex = Math.floor(Math.random() * arr.length);
  return arraysIndex;
};

var getArraysValue = function (arr) {
  var arraysValue = arr[getArraysIndex(arr)];
  return arraysValue;
};

var getArraysData = function (index) {
  var locationX = getNumber(0, 1200);
  var locationY = getNumber(130, 630);
  index = index + 1;

  var arrayItem = {
    author: {
      avatar: 'img/avatars/user' + '0' + index + '.png', // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },

    offer: {
      title: 'строка, заголовок предложения',
      address: locationX + ', ' + locationY, // 'строка, адрес предложения' //  Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      price: getNumber(1, 10000), // число, стоимость
      type: getArraysValue(types), //  flat, house или bungalo
      rooms: getNumber(1, 10), //  число, количество комнат
      guests: getNumber(1, 10), // число, количество гостей, которое можно разместить
      checkin: getArraysValue(checkins), //  строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      checkout: getArraysValue(checkouts), //  строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      checkedFeatures: getArray(features), //  массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      description: 'строка с описанием',
      photoLinks: getArray(photos), //  массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },

    location: {
      x: locationX, //  случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: locationY //  случайное число, координата y метки на карте от 130 до 630.
    }
  };

  return arrayItem;
};

for (var i = 0; i < 8; i++) {
  announcements[i] = getArraysData(i);
}

var renderAnnouncement = function (announcement) {
  var announcementElement = similarAnnouncementTemplate.cloneNode(true);

  announcementElement.style.left = announcement.location.x + PIN_WIDTH / 2 + 'px';
  announcementElement.style.top = announcement.location.y + PIN_HEIGHT + 'px';
  announcementElement.querySelector('img').setAttribute('src', announcement.author.avatar);
  announcementElement.querySelector('img').setAttribute('alt', announcement.offer.title);

  return announcementElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < 8; k++) {
  fragment.appendChild(renderAnnouncement(announcements[k]));
}

similarListElement.appendChild(fragment);
