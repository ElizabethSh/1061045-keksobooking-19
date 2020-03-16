'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form-header__input');
  var avatar = document.querySelector('.ad-form-header__preview img');

  var propertyFileChooser = document.querySelector('.ad-form__input');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  var setup = function (element, file) {
    var reader = new FileReader();

    var onReaderLoad = function () {
      element.src = reader.result;
    };

    reader.addEventListener('load', onReaderLoad);
    reader.readAsDataURL(file);
  };

  // загрузка аватарки пользователя

  var onAvatarChooserChange = function () {
    var file = avatarFileChooser.files[0];
    setup(avatar, file);
  };

  avatarFileChooser.addEventListener('change', onAvatarChooserChange);

  // загрузка фотографии объекта размещения
  var onPropertyChooserChange = function () {
    var propertyPhoto = document.createElement('img');
    propertyPhoto.src = '';
    propertyPhoto.width = 70;
    propertyPhoto.height = 70;
    propertyPhoto.alt = 'Фото объекта размещения';
    adFormPhoto.appendChild(propertyPhoto);

    var file = propertyFileChooser.files[0];
    setup(propertyPhoto, file);
  };

  propertyFileChooser.addEventListener('change', onPropertyChooserChange);

  var removeListeners = function () {
    avatarFileChooser.removeEventListener('change', onAvatarChooserChange);
    propertyFileChooser.removeEventListener('change', onPropertyChooserChange);
  };

  var addListeners = function () {
    avatarFileChooser.addEventListener('change', onAvatarChooserChange);
    propertyFileChooser.addEventListener('change', onPropertyChooserChange);
  };

  window.preview = {
    avatar: avatar,
    adFormPhoto: adFormPhoto,
    removeListeners: removeListeners,
    addListeners: addListeners
  };
})();
