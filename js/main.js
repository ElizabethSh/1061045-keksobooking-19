'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').scrollHeight;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;
var ENTER_KEY = 'Enter';


var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];


var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilter = map.querySelector('.map__filters');
var mapFilterFields = mapFilter.querySelectorAll('select');
var noticeForm = document.querySelector('.ad-form');
var addressField = noticeForm.querySelector('#address');

var similarListElement = map.querySelector('.map__pins');
var similarAnnouncementTemplate = document.querySelector('#pin')
      .content
      .querySelector('button');
var notice = document.querySelector('.notice');
var noticeFieldsets = notice.querySelectorAll('fieldset');

// Переводит страницу в неактивное состояние

var mapPinMainCoordinates = mapPinMain.style;

var mapPinMainX = mapPinMainCoordinates.left.replace('px', '') * 1 + Math.round(MAIN_PIN_WIDTH / 2);
var mapPinMainY = mapPinMainCoordinates.top.replace('px', '') * 1 + Math.round(MAIN_PIN_WIDTH / 2);
addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);
mapFilter.querySelector('fieldset').setAttribute('disabled', '');

for (i = 0; i < mapFilterFields.length; i++) {
  mapFilterFields[i].setAttribute('disabled', '');
}

for (var i = 0; i < noticeFieldsets.length; i++) {
  noticeFieldsets[i].setAttribute('disabled', '');
}

// Переводит страницу в активное состояние

var activatePage = function () {
  mapPinMainY = mapPinMainCoordinates.top.replace('px', '') * 1 + MAIN_PIN_HEIGHT;

  map.classList.remove('map--faded');
  for (i = 0; i < mapFilterFields.length; i++) {
    mapFilterFields[i].removeAttribute('disabled');
  }
  mapFilter.querySelector('fieldset').removeAttribute('disabled');
  noticeForm.classList.remove('ad-form--disabled');
  for (i = 0; i < noticeFieldsets.length; i++) {
    noticeFieldsets[i].removeAttribute('disabled');
  }
  similarListElement.appendChild(fragment);
  addressField.setAttribute('value', mapPinMainX + ', ' + mapPinMainY);
};

mapPinMain.addEventListener('mousedown', function () {
  if (event.which === 1) {
    activatePage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

// Валидация формы

var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

var onRoomsCapasityChange = function () {
  if (roomNumber.value === '1' && capacity.value === '1') {
    roomNumber.setCustomValidity('');
  } else {
    roomNumber.setCustomValidity('Для такого количества комнат можно выбрать 1 гостя');
  }

  if ((roomNumber.value === '2' && capacity.value === '1') || (roomNumber.value === '2' && capacity.value === '2')) {
    roomNumber.setCustomValidity('');
  } else {
    roomNumber.setCustomValidity('Для такого количества комнат можно выбрать 1 или 2 гостей');
  }

  if ((roomNumber.value === '3' && capacity.value === '1') || (roomNumber.value === '3' && capacity.value === '2') || (roomNumber.value === '3' && capacity.value === '3')) {
    roomNumber.setCustomValidity('');
  } else {
    roomNumber.setCustomValidity('Для такого количества комнат можно выбрать 1, 2 или 3 гостей');
  }

  if (roomNumber.value === '100' && capacity.value === '0') {
    roomNumber.setCustomValidity('');
  } else {
    roomNumber.setCustomValidity('Для такого количества комнат можно выбрать вариант "не для гостей"');
  }
};

roomNumber.addEventListener('change', function () {
  onRoomsCapasityChange();
});

capacity.addEventListener('change', function () {
  onRoomsCapasityChange();
});

// вспомогательный код

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
  var locationX = getNumber(0, X_MAX);
  var locationY = getNumber(Y_MIN, Y_MAX);
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

// Код для отрисовки пинов на карте

for (i = 0; i < 8; i++) {
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


