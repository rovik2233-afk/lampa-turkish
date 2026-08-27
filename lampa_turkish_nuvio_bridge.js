(function () {
  'use strict';

  if (window.trTurkishFrance) return;
  window.trTurkishFrance = true;

  function openTurkish(movie) {
    var title = '';

    if (movie) {
      title =
        movie.original_title ||
        movie.original_name ||
        movie.title ||
        movie.name ||
        '';
    }

    if (!title) {
      Lampa.Noty.show('Название фильма не найдено');
      return;
    }

    var url =
      'https://www.justwatch.com/fr/recherche?q=' +
      encodeURIComponent(title);

    try {
      if (Lampa.Utils && typeof Lampa.Utils.openURL === 'function') {
        Lampa.Utils.openURL(url);
      } else {
        window.open(url, '_blank');
      }
    } catch (e) {
      window.open(url, '_blank');
    }
  }

  function addButton(movie) {
    var timer = setInterval(function () {
      var box = document.querySelector(
        '.full-start-new__buttons, .full-start__buttons'
      );

      if (!box) return;

      clearInterval(timer);

      if (box.querySelector('.turkish-france-button')) return;

      var btn = document.createElement('div');

      btn.className =
        'full-start__button selector turkish-france-button';

      btn.innerHTML = '<span>🇹🇷 Türkçe</span>';

      function activate() {
        openTurkish(movie);
      }

      btn.addEventListener('click', activate);
      btn.addEventListener('hover:enter', activate);

      box.appendChild(btn);
    }, 500);

    setTimeout(function () {
      clearInterval(timer);
    }, 10000);
  }

  function start() {
    Lampa.Listener.follow('full', function (e) {
      if (
        e.type === 'complite' &&
        e.data &&
        e.data.movie
      ) {
        setTimeout(function () {
          addButton(e.data.movie);
        }, 500);
      }
    });

    Lampa.Noty.show('🇹🇷 Türkçe plugin hazır');
  }

  if (window.appready) {
    start();
  } else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') {
        start();
      }
    });
  }
})();
