/* logo-swap.js — 07p 로고 교체 데모

   「CMS 에서 PNG 한 장만 갈아 끼우면 됩니다」는 말로 하면 믿기 어렵다.
   눌러서 실제로 바뀌는 것을 보는 것이 이 장의 전부다.

   좌측 슬롯(후원사)만 바뀐다 — 우측은 사랑의열매로 고정이다.
   종횡비가 제각각인 로고를 일부러 섞어 뒀다. 어떤 비율이 들어와도 같은
   자리에 같은 크기감으로 앉는다는 것이 이 데모의 논점이기 때문이다. */
(function () {
  'use strict';

  var PICKS = [
    { k: 'KB국민은행', src: 'assets/logo/kb.webp', note: '가로로 매우 긴 국문 lockup' },
    { k: '가나다기업', src: 'assets/logo/demo1.png' },
    { k: '마바사그룹', src: 'assets/logo/demo2.png' },
    { k: '아자차은행', src: 'assets/logo/demo3.png' }
  ];

  var slot = document.getElementById('lgL');
  var wrap = document.getElementById('lgPicks');
  if (!slot || !wrap) return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  wrap.innerHTML =
    '<span class="lg-picks__k">후원사 로고 · CMS 등록</span>' +
    PICKS.map(function (p, i) {
      return '<button class="lg-pick' + (i === 0 ? ' is-on' : '') + '" type="button"' +
             ' data-no-advance data-i="' + i + '">' + esc(p.k) + '</button>';
    }).join('') +
    '<span class="lg-picks__n" id="lgNote"></span>';

  var btns = wrap.querySelectorAll('.lg-pick');
  var noteEl = document.getElementById('lgNote');

  function show(n) {
    var p = PICKS[n];
    /* 페이드로 받는다 — src 를 바로 갈아끼우면 한 프레임 비어 깜빡인다 */
    slot.classList.add('is-swap');
    var img = new Image();
    img.onload = function () {
      slot.src = p.src;
      slot.alt = p.k;
      requestAnimationFrame(function () { slot.classList.remove('is-swap'); });
    };
    img.src = p.src;
    Array.prototype.forEach.call(btns, function (b, m) { b.classList.toggle('is-on', m === n); });
    noteEl.textContent = p.note || '';
  }

  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      show(parseInt(b.getAttribute('data-i'), 10));
    });
  });

  show(0);
})();
