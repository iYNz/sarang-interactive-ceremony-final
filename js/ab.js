/* ab.js — 03p 1안 · 2안 무대 도형

   두 안의 차이는 「무대에 실물이 있는가」 하나뿐이다. 그 하나가 눈에 들어오려면
   양쪽에 같은 사람이 서 있고 한쪽에만 도미노가 있어야 한다 — 사람이 없으면
   도미노 크기가 무엇에 견주어 그만한지 알 수 없고, 그러면 「작은 블록」으로 보인다.
   사람 픽토그램은 05p(storyboard.js)가 내보낸 것을 그대로 쓴다.

   도미노는 가로로 늘어세우지 않는다. 무대 가운데에 화면 쪽을 향해 종으로 서고
   앞에서부터 차례로 화면 안쪽으로 넘어간다 — 그래야 마지막 한 장이 화면 아래에
   닿고 그 지점에서 화면 속 도미노가 받아 가는 그림이 성립한다.

   쓰러지는 모습도, 쓰러질 방향 표시도 그리지 않는다. 카메라 쪽으로 오는 줄이
   눕는 것은 2D 에서 옆으로 눕는 것처럼 보여 네 장이 엉킨 덩어리가 되고, 화살표를
   얹으면 설명이 하나 더 붙는다. 여기서 말할 것은 「이만한 것이 여기에 서 있다」
   하나뿐이다 — 서 있는 상태로 두고 원근만 살린다. 쓰러지는 장면은 05p CUT 01 이 맡는다.

   1안과 2안의 차이는 그 줄이 어디에 있느냐다. 1안은 무대 바닥(목업 위)에,
   2안은 같은 줄이 LED 화면 안에 그려진다 — 무대에는 아무것도 놓이지 않는다. */
(function () {
  'use strict';

  var person = window.SB_PERSON;
  if (!person) return;

  /* 목업 바닥 기준값 — 1920×1080 원본 좌표계. 소실점은 대략 (968, 490)이고,
     발끝 y 에서 소실점까지의 거리가 그 자리의 크기다. 05p 와 같은 바닥을 쓴다. */
  var VP_Y = 490, REF = 300;

  /* 사람은 도미노 줄의 바깥에 세운다. 05p 는 두 분을 가운데 모으지만, 여기서는
     가운데를 도미노가 차지하므로 그만큼 벌린다 — 겹치면 크기 비교가 안 된다. */
  var FOOT = 800, PEOPLE = [812, 1124];

  /* 성인 남성 기준 가슴과 배꼽 사이 — 픽토그램 키(약 352)의 0.65 쯤이다.
     발끝 790 자리에서 230 으로 잡고 자리마다 원근으로 줄인다. */
  var BASE_H = 252;

  /* 앞에서 뒤로 네 장. x 를 34 씩 물리는 것은 카메라 축에 정확히 얹으면 앞의 한 장이
     뒤의 셋을 다 가려서다 — 비스듬한 줄이어야 네 장이 다 보인다.
     y 가 작을수록 화면(안쪽)에 가깝고 그만큼 작아진다. */
  var DOMINOES = [
    { x: 1035, y: 842 },
    { x: 1001, y: 815 },
    { x:  967, y: 789 },
    { x:  933, y: 763 }
  ];

  function dominoSvg(d) {
    var s = (d.y - VP_Y) / REF;            /* 그 자리의 원근 배율 */
    var h = BASE_H * s;
    var w = h * 0.52;                      /* 도미노 한 장의 앞면 비율 */
    var x = d.x - w / 2, y = d.y - h;
    return '<g>' +
             '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' +
               ' rx="' + (w * 0.08) + '"' +
               ' fill="#0a0a0c" fill-opacity=".62" stroke="#f5f5f7" stroke-width="3.5"' +
               ' stroke-linejoin="round"/>' +
             /* 가운데 홈 — 블록이 아니라 도미노라는 것을 한 줄로 말한다 */
             '<line x1="' + (x + w * 0.22) + '" y1="' + (d.y - h * 0.5) + '"' +
                  ' x2="' + (x + w * 0.78) + '" y2="' + (d.y - h * 0.5) + '"' +
               ' stroke="#f5f5f7" stroke-opacity=".45" stroke-width="2.5" stroke-linecap="round"/>' +
           '</g>';
  }

  /* ---- 2안 — 같은 줄이 LED 화면 안에 있다 ----
     화면 안의 장면이므로 좌표계가 다르다. LED 창(724×405) 자체를 viewBox 로 쓰고
     그 안에 소실점을 따로 잡는다. 목업 바닥의 원근과 화면 속 원근은 별개다. */
  var S = { w: 724, h: 405, vpx: 330, vpy: 170, ref: 190 };
  var SCREEN_DOMINOES = [
    { x: 432, y: 362 },
    { x: 401, y: 332 },
    { x: 372, y: 303 },
    { x: 345, y: 276 }
  ];

  function screenDominoSvg(d) {
    var s = (d.y - S.vpy) / S.ref;
    var h = 96 * s;
    var w = h * 0.52;
    var x = d.x - w / 2, y = d.y - h;
    return '<g>' +
             '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' +
               ' rx="' + (w * 0.08) + '"' +
               ' fill="#0f1524" fill-opacity=".9" stroke="#cfd6e4" stroke-width="1.6"' +
               ' stroke-linejoin="round"/>' +
             '<line x1="' + (x + w * 0.22) + '" y1="' + (d.y - h * 0.5) + '"' +
                  ' x2="' + (x + w * 0.78) + '" y2="' + (d.y - h * 0.5) + '"' +
               ' stroke="#cfd6e4" stroke-opacity=".45" stroke-width="1.2" stroke-linecap="round"/>' +
           '</g>';
  }

  /* 무대 위 레이어 — 목업 프레임 위에 얹힌다 */
  function stageLayer(withDominoes) {
    /* 사람을 먼저 그린다 — 도미노 줄이 그 앞을 지나므로 위에 와야 앞뒤가 읽힌다 */
    var inner = PEOPLE.map(function (x) { return person(x, FOOT); }).join('');
    if (withDominoes) inner += DOMINOES.map(dominoSvg).join('');
    return '<svg class="ab-stage" viewBox="0 0 1920 1080" preserveAspectRatio="none"' +
             ' aria-hidden="true">' + inner + '</svg>';
  }

  var a = document.querySelector('#ab .ab-col--a .ab-shot');
  var b = document.querySelector('#ab .ab-col--b .ab-shot');
  if (a) a.insertAdjacentHTML('beforeend', stageLayer(true));
  if (b) {
    b.insertAdjacentHTML('beforeend', stageLayer(false));
    var scr = b.querySelector('.ab-shot__screen');
    if (scr) {
      scr.insertAdjacentHTML('beforeend',
        '<svg class="ab-inled" viewBox="0 0 ' + S.w + ' ' + S.h + '"' +
          ' preserveAspectRatio="none" aria-hidden="true">' +
          SCREEN_DOMINOES.map(screenDominoSvg).join('') +
        '</svg>');
    }
  }
})();
