'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var propertyFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  // загрузка аватарки подателя объявления

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];

    var reader = new FileReader();
    reader.addEventListener('load', function () {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  });

  // загрузка фотографии объекта размещения

  propertyFileChooser.addEventListener('change', function () {
    var propertyPoto = document.createElement('img');
    propertyPoto.setAttribute('src', '');
    propertyPoto.setAttribute('width', '70');
    propertyPoto.setAttribute('height', '70');
    propertyPoto.setAttribute('alt', 'Фото объекта размещения');
    adFormPhoto.appendChild(propertyPoto);

    var file = propertyFileChooser.files[0];

    var reader = new FileReader();
    reader.addEventListener('load', function () {
      propertyPoto.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
})();
