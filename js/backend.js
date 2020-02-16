'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';

  var loading = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000;

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  window.backend = {
    loading: loading
  };
})();
