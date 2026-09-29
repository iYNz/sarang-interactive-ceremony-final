/* logo-swap.js — 04p 로고 교체 데모

   「CMS 에서 로고 한 장만 갈아 끼우면 됩니다」는 말로 하면 믿기 어렵다.
   눌러서 실제로 바뀌는 것을 보는 것이 이 장의 전부다.

   한때 배경 위에 로고 PNG 를 레이어로 얹어 갈아 끼웠다. 자리는 맞았지만
   그림자도 대비도 없어서 「그래서 어떻게 보이는가」의 답이 되지 못했다.
   지금은 **합성이 끝난 판**을 통째로 건다. 실제 엔진에서는 당연히 로고만
   교체하지만, 시안에서 보여 줄 것은 결과물의 질이다.

   좌측 후원사만 바뀐다 — 우측은 사랑의열매로 고정이다.
   종횡비가 제각각인 넷을 골랐다. 어떤 비율이 들어와도 같은 자리에 같은
   크기감으로 앉는다는 것이 이 데모의 논점이기 때문이다. */
(function () {
  'use strict';

  var PICKS = [
    { k: 'KB국민은행',   src: 'assets/sponsor/kb.jpg',      note: '가로로 매우 긴 국문 lockup' },
    { k: 'HYUNDAI',      src: 'assets/sponsor/hyundai.jpg', note: '영문 워드마크 — 심볼이 앞에 붙는다' },
    { k: '우리은행',     src: 'assets/sponsor/woori.jpg',   note: '짧은 국문 — 가로로 가장 좁다' },
    { k: '신한금융그룹', src: 'assets/sponsor/shinhan.jpg', note: '심볼 + 다섯 글자' }
  ];

  var shot = document.getElementById('lgShot');
  var wrap = document.getElementById('lgPicks');
  if (!shot || !wrap) return;

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

  /* 미리 받아 둔다 — 처음 누를 때 한 프레임 비는 것을 없앤다 */
  PICKS.forEach(function (p) { new Image().src = p.src; });

  function show(n) {
    var p = PICKS[n];
    /* 페이드로 받는다 — src 를 바로 갈아끼우면 한 프레임 비어 깜빡인다 */
    shot.classList.add('is-swap');
    var img = new Image();
    img.onload = function () {
      shot.src = p.src;
      shot.alt = p.k + ' 로고가 들어간 마지막 화면';
      requestAnimationFrame(function () { shot.classList.remove('is-swap'); });
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
