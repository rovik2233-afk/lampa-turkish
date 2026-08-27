(function () {
  'use strict';

  if (window.turkish_button_ready) return;
  window.turkish_button_ready = true;

  function startPlugin() {
    Lampa.Listener.follow('full', function (e) {
      if (e.type !== 'complite') return;

      var root = e.object.activity.render();

      var box = root.find('.full-start-new__buttons');
      if (!box.length) box = root.find('.full-start__buttons');
      if (!box.length) return;

      if (root.find('.view--turkish').length) return;

      var btn = $(
        '<div class="full-start__button selector view--turkish">' +
          '<span>🇹🇷 Türkçe</span>' +
        '</div>'
      );

      btn.on('hover:enter', function () {
        Lampa.Noty.show('Türkçe çalışıyor');
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
