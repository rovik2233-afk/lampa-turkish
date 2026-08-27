(function () {
  'use strict';

  function start() {
    Lampa.Noty.show('🇹🇷 Türkçe plugin hazır');

    var timer = setInterval(function () {
      var box = document.querySelector(
        '.full-start-new__buttons, .full-start__buttons'
      );

      if (!box) return;
      if (box.querySelector('.turkish-test-button')) return;

      var btn = document.createElement('div');
      btn.className = 'full-start__button selector turkish-test-button';
      btn.innerHTML = '🇹🇷 Türkçe';

      btn.onclick = function () {
        Lampa.Noty.show('Türkçe çalışıyor');
      };

      box.appendChild(btn);
    }, 1000);
  }

  if (window.appready) {
    start();
  } else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') start();
    });
  }
})();
