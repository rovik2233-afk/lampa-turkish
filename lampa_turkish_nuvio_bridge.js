(function () {
  'use strict';

  function start() {
    try {
      Lampa.Noty.show('🇹🇷 Türkçe plugin yüklendi');
    } catch (e) {
      console.log(e);
    }
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
