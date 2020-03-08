'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');
  var housingPrice = mapFilter.querySelector('#housing-price');
  var housingRoom = mapFilter.querySelector('#housing-rooms');
  var housingGuests = mapFilter.querySelector('#housing-guests');

  var announcements = [];
  var filteredData = [];

  var propertyChoice;
  var priceChoice;
  var roomChoice;
  var guestChoice;

  var propertyPriceRate = {
    min: 10000,
    max: 50000
  };

  var isOfferFilled = function () {
    window.data.announcements.forEach(function (it, i) {
      it = window.data.announcements[i];
      if (Object.keys(it.offer).length !== 0) {
        window.data.filteredData.push(i);
      }
    });
  };

  mapFilter.addEventListener('change', function () {

    window.card.remove();
    propertyChoice = housingType.value;
    priceChoice = housingPrice.value;
    roomChoice = parseInt(housingRoom.value, 10);
    guestChoice = parseInt(housingGuests.value, 10);

    window.debounce(updateData);
  });

  var updateData = function () {
    filteredData = [];

    // получаем массив выбранных удобств
    var pickedFeatures = [];
    var inputFeaturesChecked = mapFilter.querySelectorAll('input[type="checkbox"]:checked');

    inputFeaturesChecked.forEach(function (it) {
      pickedFeatures.push(it.value);
    });

    // фильтрация данных
    window.data.announcements.forEach(function (it, i) {
      it = window.data.announcements[i];
      // определение соответствия категории цены
      if (it.offer.price >= propertyPriceRate.min && it.offer.price <= propertyPriceRate.max) {
        var chosenPrice = 'middle';
      } else if (it.offer.price < propertyPriceRate.min) {
        chosenPrice = 'low';
      } else if (it.offer.price > propertyPriceRate.max) {
        chosenPrice = 'high';
      } else {
        chosenPrice = 'any';
      }

      // функция определения, есть ли в объявленях выбранное удобство
      var isFeature = function () {
        var pikedFeature = true;
        for (var j = 0; j < pickedFeatures.length; j++) {
          var isAddToFilteredData = it.offer.features.includes(pickedFeatures[j]);
          if (!isAddToFilteredData) {
            pikedFeature = false;
            break;
          }
        }
        return pikedFeature;
      };

      if ((it.offer.type === propertyChoice || housingType.value === 'any') &&
      (it.offer.rooms === roomChoice || housingRoom.value === 'any') &&
      (it.offer.guests === guestChoice || housingGuests.value === 'any') &&
      (chosenPrice === priceChoice || housingPrice.value === 'any') && (isFeature())) {
        filteredData.push(i);
      }
    });

    window.pin.create(filteredData);
  };

  window.data = {
    announcements: announcements,
    filteredData: filteredData,
    isOfferFilled: isOfferFilled
  };
})();
