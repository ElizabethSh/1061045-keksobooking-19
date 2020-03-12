'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';


  // функция настройки xhr запроса

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  // функция загрузки данных с сервера

  var load = function (onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  // функция отправки данных из формы

  var send = function (data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
