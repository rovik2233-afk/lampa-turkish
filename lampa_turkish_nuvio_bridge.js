(function () {
  'use strict';

  if (window.turkish_france_plugin) return;
  window.turkish_france_plugin = true;

  function startPlugin() {

    Lampa.Listener.follow('full', function (e) {

      if (e.type !== 'complite') return;
      if (!e.data || !e.data.movie) return;

      var movie = e.data.movie;
      var root = e.object.activity.render();

      var box = root.find('.full-start-new__buttons');

      if (!box.length) {
        box = root.find('.full-start__buttons');
      }

      if (!box.length) return;

      if (root.find('.view--turkish').length) return;

      var btn = $(
        '<div class="full-start__button selector view--turkish">' +
          '<span>🇹🇷 Türkçe</span>' +
        '</div>'
      );

      btn.on('hover:enter', function () {

        var title =
          movie.original_title ||
          movie.original_name ||
          movie.title ||
          movie.name ||
          '';

        if (!title) {
          Lampa.Noty.show('Название фильма не найдено');
          return;
        }

        var url =
          'https://www.justwatch.com/fr/recherche?q=' +
          encodeURIComponent(title);

        Lampa.Noty.show('🇹🇷 Поиск: ' + title);

        setTimeout(function () {
          try {
            window.location.href = url;
          } catch (err) {
            try {
              window.open(url, '_blank');
            } catch (err2) {
              Lampa.Noty.show('Не удалось открыть JustWatch');
            }
          }
        }, 300);
      });

      box.append(btn);
    });

    Lampa.Noty.show('🇹🇷 Türkçe plugin hazır');
  }

  if (window.appready) {
    startPlugin();
  } else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') {
        startPlugin();
      }
    });
  }
})();
