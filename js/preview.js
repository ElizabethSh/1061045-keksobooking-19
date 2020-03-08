'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var propertyFileChooser = document.querySelector('.ad-form__input');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  var setup = function (element, file) {

    var reader = new FileReader();
    reader.addEventListener('load', function () {
      element.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  // загрузка аватарки пользователя

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    setup(avatarPreview, file);
  });

  // загрузка фотографии объекта размещения

  propertyFileChooser.addEventListener('change', function () {
    var propertyPhoto = document.createElement('img');
    propertyPhoto.setAttribute('src', '');
    propertyPhoto.setAttribute('width', '70');
    propertyPhoto.setAttribute('height', '70');
    propertyPhoto.setAttribute('alt', 'Фото объекта размещения');
    adFormPhoto.appendChild(propertyPhoto);

    var file = propertyFileChooser.files[0];
    setup(propertyPhoto, file);
  });
})();
