/* tech.js — 09p 기술 · 운영 (도미노 · 키넥트 단독)

   지난 안은 판정이 둘이라 이 페이지가 「두 번의 판정」을 비교했다. 도미노는
   판정이 하나뿐이라 비교할 것이 없다 — 대신 두 뷰를 이렇게 나눈다.
     판정 순간 — 두 분이 자리에 들어와 도미노를 민다. 여기서 한 번 걸린다
     그 뒤    — 자리를 벗어나도 화면은 되돌아가지 않는다. 판정이 없기 때문이다
   같은 도식(키넥트 · 감지 범위 · 지정 영역)을 공유하고 사람 위치만 바뀌므로,
   「한 번 걸린 뒤로는 사람이 어디 있든 상관없다」가 두 장을 오가면 바로 읽힌다. */
(function () {
  'use strict';

  /* ---- 도식 좌표 ----
     목업(16:9) 위에 그대로 얹으므로 좌표계는 원본 1920×1080 기준이고,
     mockup10 의 LED 창 실측값(x 606..1330 / y 286..690)을 그대로 쓸 수 있다.
     바닥 소실점은 대략 (968, 490) — 지정 영역 사다리꼴의 기울기가 여기서 나온다. */
  var LED = { x1: 606, y1: 286, x2: 1330, y2: 690 };
  var LED_CX = (LED.x1 + LED.x2) / 2;

  /* 사람 픽토그램은 06p(storyboard.js)에서 정의한 것을 그대로 쓴다 — 두 장이 같은 도형이어야 한다 */
  var personSvg = window.SB_PERSON || function () { return ''; };

  /* 지정 영역 — 바닥에 놓인 직사각형이라 소실점 쪽으로 좁아지는 사다리꼴로 보인다.
     뒷변은 타일이 시작되는 y740. 앞변은 설명 패널(y811)에 맞춰 자르지 않고
     y900 까지 내려 패널 뒤로 흘려보낸다. 패널 앞에서 닫아 버리면 바닥에 놓인
     구역이 아니라 떠 있는 띠처럼 보이는데, 가려진 채로 이어지면 카메라 쪽으로
     계속되는 바닥으로 읽힌다.
     양옆 변은 바닥 소실점(968,490)을 지나는 직선이라 어디서 잘라도 원근이 맞는다.
     사람 발끝은 y780 — 06p(790)와 거의 같아 두 페이지가 같은 바닥을 쓴다.
     그 높이에서 폭이 x 719..1217 이라 지정 위치(765·1171)는 품고
     물러난 자리(640·1296)는 79px 바깥으로 벗어난다. */
  var FOOT = 780;
  var ZONE = 'M615 900 L1321 900 L1183 740 L753 740 Z';

  function senseSvg(people, walk) {
    return '' +
      '<span class="tech-sense">' +
        '<svg viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
          '<defs><radialGradient id="tsFanK" cx="' + LED_CX + '" cy="222" r="580" gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="#fff" stop-opacity=".26"/>' +
            '<stop offset="100%" stop-color="#fff" stop-opacity=".05"/>' +
          '</radialGradient></defs>' +
          /* 감지 범위 — 기기에서 아래로 열리는 반원 부채꼴.
             LED 화면과 그 앞에 선 사람이 한 영역 안에 통째로 들어간다. */
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="url(#tsFanK)"/>' +
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="none"' +
            ' stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 11"/>' +
          /* 지정 영역 — 감지 범위(무엇을 보는가)와 판정 영역(어디를 기준으로 자르는가)은
             다른 것이므로 선 굵기와 점선 간격을 달리해 구분한다. */
          '<path d="' + ZONE + '" fill="#fff" fill-opacity=".07"/>' +
          '<path d="' + ZONE + '" fill="none" stroke="#fff" stroke-opacity=".72"' +
            ' stroke-width="4" stroke-dasharray="22 12" stroke-linejoin="round"/>' +
          /* 라벨은 띠 한가운데 — 두 픽토그램 사이가 비어 있어 여기밖에 자리가 없다 */
          '<rect x="878" y="753" width="180" height="34" rx="17"' +
            ' fill="#000" fill-opacity=".62" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>' +
          '<text x="968" y="777" text-anchor="middle" font-size="21" font-weight="700"' +
            ' letter-spacing="1.2" fill="#fff" fill-opacity=".92">지정 영역</text>' +
          people.map(function (x, n) { return personSvg(x, FOOT, walk && walk[n]); }).join('') +
          /* 천장 플레이트 → 짧은 브래킷 봉 → 기기.
             이 구도에서는 기기가 LED 쪽을 향하므로 보이는 면은 뒷면이다.
             렌즈는 반대편에 있으니 그리지 않는다. */
          '<rect x="' + (LED_CX - 16) + '" y="96" width="32" height="7" rx="2.5" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2"/>' +
          '<path d="M' + LED_CX + ' 103v101" stroke="#f5f5f7" stroke-width="3.5" stroke-linecap="round"/>' +
          '<rect x="' + (LED_CX - 35) + '" y="204" width="70" height="18" rx="6" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2.5"/>' +
        '</svg>' +
        '<span class="tech-sense__tag" style="left:50.4%;top:7.4%">KINECT · 천장 브래킷 · LED 방향</span>' +
      '</span>';
  }

  /* 두 뷰는 같은 도식 위에서 사람 위치와 걷는 방향만 뒤집힌다.
     06p 는 자리를 알려주려고 바닥에 / \ 마크를 깔지만 여기는 깔지 않는다 —
     지정 영역 사각형이 같은 말을 이미 하고 있고, 두 선이 거의 같은 높이에서 섞인다.
     방향 화살표는 픽토그램 몸통 옆에 함께 그려지므로 여기서 따로 얹을 것이 없다.

     화면도 사람을 따라 바뀐다(img → after). 판정이 무엇을 일으키는지가 이 페이지의
     요지인데, 화면이 고정돼 있으면 사람만 왔다 갔다 하는 그림이 된다.
     걸음 · 화살표 · 화면 전환이 모두 같은 3.2s 주기 위에 있고, 화면은 도착보다
     한 박자 늦게 바뀐다 — 실제 연출의 2초 여유와 같은 순서다. */
  /* 화면 비주얼이 아직 없어 ph(이름 판)로 둔다. img 를 채우면 그대로 그림이 된다. */
  var VIEWS = [
    { ph: '도미노가 넘어간다', cap: '<b>CUT 01</b> · 도미노 판정',
      people: [878, 1058], walk: [-215, 215] },   /* 영역 밖 → 가운데 나란히 */
    { ph: '마을이 밝아진다', cap: '<b>CUT 02 ~ 05</b> · 판정 없음',
      people: [740, 1196], walk: [138, -138] }    /* 가운데 → 양옆으로 물러나 관람 */
  ];

  var media = document.querySelector('#techShot .tech-shot__media');
  var screenWrap = document.querySelector('#techShot .tech-shot__screen');
  var cap = document.getElementById('techCap');
  var tabsWrap = document.getElementById('techTabs');
  var cardIn = document.getElementById('techCardIn');
  var cardOut = document.getElementById('techCardOut');
  if (!screenWrap || !tabsWrap) return;

  var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('.tech-tab'));

  /* 도식은 처음부터 얹혀 있다.
     한때는 「화면 먼저, 가이드 한 박자 뒤」로 두 단계를 밟게 했는데, 이 장은
     판정 도식 자체가 본문이라 그것이 없는 첫 단계는 빈 화면을 한 번 더 넘기는
     일이 됐다. 두 뷰를 오가는 것만으로 충분하다.
     삽입되는 순간 애니메이션이 시작되고 한 번만 재생된 뒤 그 자리에 남는다 —
     루프를 돌리면 설명이 끝난 뒤에도 계속 움직여 LED 화면을 방해한다. */
  var idx = 0;

  function show(i) {
    var v = VIEWS[i];
    idx = i;
    if (cap) cap.innerHTML = v.cap;
    screenWrap.innerHTML = v.img
      ? '<img src="' + v.img + '" alt="" />' +
        (v.after ? '<img class="is-after" src="' + v.after + '" alt="" />' : '')
      : '<span class="tech-ph">' + v.ph + '</span>';
    /* 센서 도식은 목업 프레임 위에 얹는다. 뷰를 바꿀 때마다 다시 넣는다 —
       DOM 에 들어오는 시점이 곧 애니메이션 시작점이다. */
    if (media) {
      media.querySelectorAll(':scope > .tech-sense').forEach(function (el) { el.remove(); });
      media.insertAdjacentHTML('beforeend', senseSvg(v.people, v.walk));
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

  /* 슬라이드 이동을 여기서 한 번 붙잡는다 — 두 판정을 모두 보고 나서야 다음 장으로.
     스토리보드 카드 스트립(window.SB)과 같은 규약이다. */
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
