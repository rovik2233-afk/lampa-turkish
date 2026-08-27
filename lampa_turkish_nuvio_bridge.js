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
      window.location.href = url;
    }
  }

  function addButton(e) {
    try {
      var root = e.object.activity.render();

      if (root.find('.turkish-france-button').length) return;

      var box = root.find('.full-start-new__buttons');

      if (!box.length) {
        box = root.find('.full-start__buttons');
      }

      if (!box.length) return;

      var button = $(
        '<div class="full-start__button selector turkish-france-button">' +
          '<span>🇹🇷 Türkçe</span>' +
        '</div>'
      );

      button.on('hover:enter', function () {
        openTurkish(e.data.movie);
      });

      button.on('click', function () {
        openTurkish(e.data.movie);
      });

      box.append(button);

    } catch (err) {
      console.log('[Türkçe France]', err);
    }
  }

  function start() {
    Lampa.Listener.follow('full', function (e) {
      if (e.type === 'complite' && e.data && e.data.movie) {
        setTimeout(function () {
          addButton
