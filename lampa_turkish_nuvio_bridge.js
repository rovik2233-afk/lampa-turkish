(function () {
  'use strict';

  if (window.trTurkishFrance) return;
  window.trTurkishFrance = true;

  function openTurkish(movie) {
    var title =
      (movie && (
        movie.original_title ||
        movie.original_name ||
        movie.title ||
        movie.name
      )) || '';

    if (!title) {
      Lampa.Noty.show('Название фильма не найдено');
      return;
    }

    var url =
      'https://www.justwatch.com/fr/recherche?q=' +
      encodeURIComponent(title);

    try {
      if (Lampa.Utils && Lampa.Utils.openURL) {
        Lampa.Utils.openURL(url);
      } else {
        window.open(url, '_blank');
      }
    } catch (e) {
      Lampa.Noty.show('Не удалось открыть');
    }
  }

  function addButton(movie) {
    var btn = document.createElement('div');
    btn.className = 'full-start__button selector tr-bridge';
    btn.innerHTML = '🇹🇷 Türkçe';

    btn.addEventListener('click', function () {
      openTurkish(movie);
    });

    btn.addEventListener('hover:enter', function () {
      openTurkish(movie);
    });

    var timer = setInterval(function () {
      var box = document.querySelector(
        '.full-start-new__buttons,.full-start__buttons'
      );

      if (box && !box.querySelector('.tr-bridge')) {
        box.appendChild(btn);
        clearInterval(timer);
      }
    }, 500);
  }

  function start() {
    Lampa.Listener.follow('full', function (e) {
      if (e.type === 'complite' && e.data && e.data.movie) {
        setTimeout(function () {
          addButton(e.data.movie);
        }, 300);
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
