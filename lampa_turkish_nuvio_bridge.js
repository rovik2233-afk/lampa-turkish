(function () {
  'use strict';

  if (window.trTurkishBridge) return;
  window.trTurkishBridge = true;

  function addButton() {
    var btn = document.createElement('div');
    btn.className = 'full-start__button selector tr-bridge';
    btn.innerHTML = '🇹🇷 Türkçe';

    btn.addEventListener('click', function () {
      Lampa.Noty.show('Türkçe kaynak aktif');
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
      if (e.type === 'complite') {
        setTimeout(addButton, 300);
      }
    });

    Lampa.Noty.show('🇹🇷 Türkçe plugin yüklendi');
  }

  if (window.appready) {
    start();
  } else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') start();
    });
  }
})();
