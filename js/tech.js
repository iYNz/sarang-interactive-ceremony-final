/* tech.js — 06p 기술 · 운영 (도미노 · 키넥트 단독)

   한때 이 장은 「사람이 지정 영역에 들어오는가」를 그렸다. 실제 판정은 그게
   아니다 — 화면 앞 도미노 자리를 보고 있다가, 도미노가 쓰러져 그 자리에서
   사라지면 걸린다. 사람은 보지 않는다.

   그래서 두 뷰를 이렇게 나눈다.
     밀기 전     — 영역 안에 도미노가 서 있다. 아무 일도 없다
     쓰러진 순간 — 도미노가 영역에서 사라진다. 그 사라짐이 트리거다

   사람은 두 뷰에서 **같은 자리에 흐리게** 서 있다. 움직이지 않는다는 것이
   곧 「판정과 무관하다」는 설명이다 — 사람을 지우면 「그럼 사람은 어디 있나」가
   남고, 움직이게 하면 다시 사람이 판정에 관여하는 것처럼 보인다.

   화면 · 도미노 · 사람은 05p(storyboard.js)와 같은 그림, 같은 좌표를 쓴다.
   같은 장면이어야 두 장이 이어지고, 영역이 무엇을 감싸는지가 바로 읽힌다. */
(function () {
  'use strict';

  /* 좌표계는 목업 원본 1920×1080 기준. 소실점은 05p 와 같은 실측값 (968, 437). */
  var LED = { x1: 606, y1: 286, x2: 1330, y2: 690 };
  var LED_CX = (LED.x1 + LED.x2) / 2;

  /* 05p 에서 정의한 도형을 그대로 가져온다 — 두 장이 같은 물건을 그려야 한다 */
  var personSvg = window.SB_PERSON || function () { return ''; };
  var dominoesHtml = window.SB_DOMINOES || function () { return ''; };

  /* 도미노는 05p CUT 01 의 값 그대로다 — 같은 물건이 같은 자리에 있어야 한다.
     사람만 바닥선이 다르다(05p 890 → 여기 780). 이 장은 아래쪽 198px 을 설명
     패널이 덮고 있어(미디어 좌표 y811~) 890 에 세우면 발끝이 패널 뒤로 잘린다.
     이 도식에서 중요한 것은 사람의 깊이가 아니라 **영역 밖에 있다는 것**이라
     패널에 닿지 않는 높이로 올려 세운다.
     좌우로도 05p(883·1053)보다 벌려 세운다. 영역 위에 겹쳐 서면 붉게 켜진 뷰에서
     「사람이 들어와서 걸렸다」로 읽히는데, 그것이 바로 이 장이 지우려는 오해다. */
  var DOMINOES = [{ y: 806 }, { y: 719 }];
  var PEOPLE = [762, 1174], FOOT = 780, PERSON_K = (FOOT - 437) / 419;

  /* 판정 영역 — 바닥에 놓인 사각형이라 소실점 쪽으로 좁아지는 사다리꼴이다.
     도미노 두 장(바닥 719 · 806)을 품되 넉넉하지 않게 감싼다. 영역이 크면
     「이 근처 어딘가」로 읽히는데, 실제로는 도미노가 선 그 자리 하나다.
     앞변 y805 · 뒷변 y660, 폭은 그 깊이에서 도미노 폭의 두 배 남짓.
     앞변을 805 에서 끊는 것은 설명 패널(y811)에 가리지 않기 위해서다. */
  var ZONE = 'M858 805 L1078 805 L1035 660 L901 660 Z';

  function senseSvg(withDominoes) {
    return '' +
      '<span class="tech-sense">' +
        '<svg viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
          '<defs><radialGradient id="tsFanK" cx="' + LED_CX + '" cy="222" r="580" gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="#fff" stop-opacity=".26"/>' +
            '<stop offset="100%" stop-color="#fff" stop-opacity=".05"/>' +
          '</radialGradient></defs>' +
          /* 감지 범위 — 기기에서 아래로 열리는 반원 부채꼴 */
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="url(#tsFanK)"/>' +
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="none"' +
            ' stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 11"/>' +
          /* 사람 — 두 뷰에서 같은 자리, 같은 자세. 흐리게 둬서 주인공이 아님을 보인다 */
          '<g class="tech-ppl">' +
            PEOPLE.map(function (x) { return personSvg(x, FOOT, 0, PERSON_K); }).join('') +
          '</g>' +
          /* 판정 영역 — 감지 범위(무엇을 보는가)와 판정 영역(어디를 기준으로 자르는가)은
             다른 것이므로 선 굵기와 점선 간격을 달리해 구분한다.
             트리거가 걸린 뷰에서는 테두리가 붉게 살아난다. */
          '<path class="tech-zone__fill" d="' + ZONE + '" fill="#fff" fill-opacity=".07"/>' +
          '<path class="tech-zone__line" d="' + ZONE + '" fill="none" stroke="#fff" stroke-opacity=".72"' +
            ' stroke-width="4" stroke-dasharray="22 12" stroke-linejoin="round"/>' +
          /* 도미노는 영역 안에 그린다. 두 번째 뷰에서는 빼 버린다 —
             「사라졌다」를 말로 적는 대신 실제로 없애는 것이 이 장의 전부다. */
          (withDominoes ? dominoesHtml(DOMINOES) : '') +
          /* 라벨 — 영역 왼쪽. 아래는 설명 패널(y811)이 덮고, 위는 도미노가 서 있어
             옆이 유일하게 비어 있는 자리다. 짧은 지시선으로 영역과 이어 둔다. */
          '<path d="M702 714L866 792" stroke="#fff" stroke-opacity=".45" stroke-width="2.5"/>' +
          '<rect x="430" y="690" width="272" height="38" rx="19"' +
            ' fill="#000" fill-opacity=".62" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>' +
          '<text x="566" y="716" text-anchor="middle" font-size="21" font-weight="700"' +
            ' letter-spacing="1.2" fill="#fff" fill-opacity=".92">도미노 감지 영역</text>' +
          /* 천장 플레이트 → 브래킷 봉 → 기기 (LED 를 향하므로 보이는 면은 뒷면) */
          '<rect x="' + (LED_CX - 16) + '" y="96" width="32" height="7" rx="2.5" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2"/>' +
          '<path d="M' + LED_CX + ' 103v101" stroke="#f5f5f7" stroke-width="3.5" stroke-linecap="round"/>' +
          '<rect x="' + (LED_CX - 35) + '" y="204" width="70" height="18" rx="6" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2.5"/>' +
        '</svg>' +
        '<span class="tech-sense__tag" style="left:50.4%;top:7.4%">KINECT · 천장 브래킷 · LED 방향</span>' +
      '</span>';
  }

  var VIEWS = [
    { img: 'assets/led/cut01.jpg', dom: true,
      cap: '<b>CUT 01</b> · 밀기 전 — 영역 안에 도미노가 있다' },
    { img: 'assets/led/cut01.jpg', dom: false, fired: true,
      cap: '<b>CUT 01</b> · 쓰러진 순간 — 영역에서 사라진다' }
  ];

  var media = document.querySelector('#techShot .tech-shot__media');
  var screenWrap = document.querySelector('#techShot .tech-shot__screen');
  var cap = document.getElementById('techCap');
  var tabsWrap = document.getElementById('techTabs');
  var cardIn = document.getElementById('techCardIn');
  var cardOut = document.getElementById('techCardOut');
  if (!screenWrap || !tabsWrap) return;

  var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('.tech-tab'));
  var idx = 0;

  function show(i) {
    var v = VIEWS[i];
    idx = i;
    if (cap) cap.innerHTML = v.cap;
    screenWrap.innerHTML = v.img
      ? '<img src="' + v.img + '" alt="" />'
      : '<span class="tech-ph">' + (v.ph || '') + '</span>';
    /* 센서 도식은 목업 프레임 위에 얹고, 뷰를 바꿀 때마다 다시 넣는다 —
       DOM 에 들어오는 시점이 곧 애니메이션 시작점이다. */
    if (media) {
      media.querySelectorAll(':scope > .tech-sense').forEach(function (el) { el.remove(); });
      media.insertAdjacentHTML('beforeend', senseSvg(v.dom));
      var s = media.querySelector('.tech-sense');
      if (s) s.classList.toggle('is-fired', !!v.fired);
    }
    tabs.forEach(function (t, n) { t.classList.toggle('is-on', n === i); });
    if (cardIn) cardIn.classList.toggle('is-on', i === 0);
    if (cardOut) cardOut.classList.toggle('is-on', i === 1);
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      show(parseInt(t.getAttribute('data-i'), 10));
    });
  });

  /* 슬라이드 이동을 여기서 한 번 붙잡는다 — 두 뷰를 모두 보고 나서야 다음 장으로 */
  window.TECH = {
    next: function () {
      if (idx < VIEWS.length - 1) { show(idx + 1); return true; }
      return false;
    },
    prev: function () {
      if (idx > 0) { show(idx - 1); return true; }
      return false;
    },
    reset: function (fromEnd) { show(fromEnd ? VIEWS.length - 1 : 0); }
  };

  show(0);
})();
