/* object.js — 06p 중앙 오브제

   나란히 놓으면 비교가 되지만 선택은 되지 않는다. 같은 자리에서 갈아 끼워야
   "이쪽이 낫다"가 나오므로, 목업 하나에 두 안을 겹쳐 두고 탭으로 넘긴다.

   비주얼이 아직 없으므로 지금은 이름만 든 판이 들어간다. img 를 채우면
   그대로 그림으로 바뀌고, 나머지 코드는 건드릴 것이 없다. */
(function () {
  'use strict';

  var OBJ = [
    { k: '㉠ 온도계 + 열매',
      t: '온도계와 사랑의열매 모양만 남긴다',
      p: '해마다 바뀌는 온도탑 조형을 따라가지 않고 <b>온도계라는 기호와 열매 형태</b>만 가져옵니다. ' +
         '도미노가 닿으면 눈금이 아래에서부터 차오르고, 정점에서 열매가 열리며 빛이 퍼집니다.',
      good: ['그 해 조형이 무엇이든 <b>다음 해에도 그대로</b> 씁니다',
             '「온도를 채운다」가 <b>눈으로 보이는 형태</b>라 설명이 필요 없습니다',
             '사랑의열매 브랜드 자산과 바로 연결됩니다'] },

    { k: '㉡ 화합 오브제',
      t: '온도탑 대신, 합쳐지는 형태',
      p: '온도계 대신 <b>양쪽에서 온 것이 가운데서 하나가 되는 조형</b>을 둡니다. ' +
         '좌 · 우에서 출발한 도미노가 가운데서 만나 형태를 완성하고, 그 순간 마을이 켜집니다.',
      good: ['「두 사람의 행위가 나눔으로 연결된다」를 <b>형태 자체가 말합니다</b>',
             '온도탑 · 계절과 완전히 무관해 <b>연중 어느 행사에도</b> 쓸 수 있습니다',
             '좌 · 우 도미노 배치와 구조가 맞아떨어집니다'] },

    { k: '㉠ + ㉡',
      t: '합쳐진 형태 안에서 온도가 오른다',
      p: '두 안은 배타적이지 않습니다. <b>가운데서 합쳐진 조형이 곧 온도계 역할</b>을 하도록 묶으면, ' +
         '화합과 온도 상승이 한 오브제 안에서 같이 일어납니다.',
      good: ['<b>두 안의 장점을 모두 가져갑니다</b> — 합쳐지는 순간이 곧 차오르는 순간',
             '연출 시간이 짧은 구간에서 <b>두 사건을 하나로 압축</b>합니다',
             '제작 부담은 ㉠ · ㉡ 과 같습니다'] }
  ];

  var screen = document.getElementById('obScreen');
  var tabs = document.getElementById('obTabs');
  var desc = document.getElementById('obDesc');
  if (!screen || !tabs || !desc) return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* 화면 레이어 — 전부 깔아 두고 불투명도로 넘긴다. src 를 갈아끼우면 딱 끊긴다. */
  screen.innerHTML = OBJ.map(function (o, i) {
    return o.img
      ? '<img class="ob-var' + (i === 0 ? ' is-on' : '') + '" src="' + o.img + '" alt="' + esc(o.t) + '" draggable="false" />'
      : '<span class="ob-var' + (i === 0 ? ' is-on' : '') + ' ob-ph">' +
          '<span class="ob-ph__k">' + esc(o.k) + '</span>' +
          '<span class="ob-ph__t">' + esc(o.t) + '</span>' +
        '</span>';
  }).join('');

  tabs.innerHTML = OBJ.map(function (o, i) {
    return '<button class="ob-tab' + (i === 0 ? ' is-on' : '') + '" type="button"' +
           ' data-no-advance data-i="' + i + '">' + esc(o.k) + '</button>';
  }).join('');

  desc.innerHTML = OBJ.map(function (o, i) {
    return '<div class="ob-d' + (i === 0 ? ' is-on' : '') + '" data-i="' + i + '">' +
             '<b class="ob-d__t">' + esc(o.t) + '</b>' +
             '<p class="ob-d__p">' + o.p + '</p>' +
             '<ul class="list">' + o.good.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul>' +
           '</div>';
  }).join('');

  var vars = screen.querySelectorAll('.ob-var');
  var btns = tabs.querySelectorAll('.ob-tab');
  var ds = desc.querySelectorAll('.ob-d');
  var idx = 0;

  function show(n) {
    n = Math.max(0, Math.min(OBJ.length - 1, n));
    idx = n;
    [vars, btns, ds].forEach(function (list) {
      Array.prototype.forEach.call(list, function (el, m) { el.classList.toggle('is-on', m === n); });
    });
  }

  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      show(parseInt(b.getAttribute('data-i'), 10));
    });
  });

  /* ← → 로도 넘긴다 — 발표 중에는 화살표만 누르게 된다.
     deck.js 의 GATES 가 이 객체를 찾아 슬라이드 이동보다 먼저 물어본다. */
  window.OBJ = {
    next: function () { if (idx < OBJ.length - 1) { show(idx + 1); return true; } return false; },
    prev: function () { if (idx > 0) { show(idx - 1); return true; } return false; },
    reset: function (fromEnd) { show(fromEnd ? OBJ.length - 1 : 0); }
  };
})();
