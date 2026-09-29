/* tech.js — 06p 기술 · 운영 (1안 · 실물 도미노 + LED)

   한때 이 장은 「사람이 지정 영역에 들어오는가」를 그렸고, 그 다음에는 바닥에
   깔린 사다리꼴을 판정 영역으로 그렸다. 둘 다 아니다.

   키넥트는 천장에서 LED 를 향해 매달려 **화면 앞의 한 자리**를 본다. 그 자리는
   07p(2안)가 보는 자리와 **같은 곳**이다. 다른 것은 거기 무엇이 있느냐뿐이다.

     1안(이 장)  그 자리에 실물 도미노가 서 있다가, 쓰러지면서 **사라진다**
     2안(07p)    그 자리에 손이 들어와 **1초를 머문다**

   그래서 두 장이 같은 상자를 쓴다. 상자가 같아야 「장비도 보는 곳도 같고,
   무엇을 세느냐만 다르다」가 그림으로 읽힌다.

   탭 두 개로 「밀기 전 / 쓰러진 순간」을 눌러 보게 했었다. 07p 와 같은 방식으로
   **루프 애니메이션**으로 바꾼다 — 눌러야 보이는 것보다 계속 도는 편이 설명하는
   동안 쥐고 있기 좋고, 두 장의 문법도 같아진다.

   화면 · 도미노 · 사람은 03p(storyboard.js)와 같은 그림, 같은 좌표를 쓴다. */
(function () {
  'use strict';

  /* 03p 에서 정의한 도형을 그대로 가져온다 — 두 장이 같은 물건을 그려야 한다 */
  var personSvg = window.SB_PERSON || function () { return ''; };
  var dominoesHtml = window.SB_DOMINOES || function () { return ''; };

  /* 좌표계는 목업 원본 1920×1080 기준. 소실점은 03p 와 같은 실측값 (968, 437). */
  var LED = { x1: 606, y1: 286, x2: 1330, y2: 690 };
  var LED_CX = (LED.x1 + LED.x2) / 2;
  function sx(f) { return LED.x1 + f * (LED.x2 - LED.x1); }
  function sy(f) { return LED.y1 + f * (LED.y2 - LED.y1); }

  /* 사람 · 도미노 모두 03p CUT 01 의 값 그대로다. */
  var DOMINOES = [{ y: 806 }, { y: 719 }];
  var PEOPLE = [883, 1053], FOOT = 890, PERSON_K = (FOOT - 437) / 419;

  /* 판정 영역 — 07p 와 **같은 자리**다. 07p 는 화면 속 첫 도미노가 선 자리를
     cut01.jpg 에서 실측해(x 882..1029) 화면 비율로 옮겼는데, 실물 도미노도 같은
     중심선(소실점 x 968) 위에 서므로 **가로 폭이 그대로 맞는다.**

     세로만 다르다. 실물 도미노는 화면 속 그림보다 크다 — 밑변 806, 윗변 614
     (앞 장), 뒤 장은 719 · 572. 그 높이에 맞춰 상자를 늘린다. 같은 자리를 보되
     거기 선 물건이 커서 상자도 큰 것이고, 두 장을 나란히 놓으면 그 차이가 곧
     「1안은 실물이 서 있다」가 된다.
     아래는 814 에서 끊는다 — 설명 패널(y824)에 가리지 않는 값이다. */
  var D = { x1: sx(0.459), x2: sx(0.536) };
  var Z = { x1: D.x1 - 20, x2: D.x2 + 24, y1: 556, y2: 814 };

  function diagram() {
    return '' +
      '<span class="tech-sense">' +
        '<svg viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
          '<defs><radialGradient id="tsFanK" cx="' + LED_CX + '" cy="222" r="580" gradientUnits="userSpaceOnUse">' +
            '<stop offset="0%" stop-color="#fff" stop-opacity=".26"/>' +
            '<stop offset="100%" stop-color="#fff" stop-opacity=".05"/>' +
          '</radialGradient></defs>' +

          /* 감지 범위 — 기기에서 아래로 열리는 반원 부채꼴. 07p 와 같은 값이다 */
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="url(#tsFanK)"/>' +
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="none"' +
            ' stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 11"/>' +

          /* 판정 영역. 안은 **밝게** 깐다 — 07p 는 금색 게이지를 띄워야 해서 어둡게
             깔았지만, 여기 들어 있는 것은 어두운 유리 도미노다. 같이 어두우면 상자와
             도미노가 한 덩어리로 뭉쳐 「영역 안에 물건이 있다」가 안 보인다.
             도미노가 빠져나간 뒤에는 테두리가 붉게 살아난다(.t1-zone). */
          '<rect class="t1-zone" x="' + Z.x1 + '" y="' + Z.y1 + '"' +
            ' width="' + (Z.x2 - Z.x1) + '" height="' + (Z.y2 - Z.y1) + '"' +
            ' rx="7" fill="#fff" fill-opacity=".11" stroke="#fff" stroke-opacity=".85"' +
            ' stroke-width="4" stroke-dasharray="18 10"/>' +

          /* 실물 도미노 — 이 상자 안에 서 있다가 쓰러지며 빠져나간다.
             「사라졌다」를 말로 적는 대신 실제로 없애는 것이 이 장의 전부다.
             밑변을 축으로 돌린다(CSS .t1-dom). */
          '<g class="t1-dom">' + dominoesHtml(DOMINOES) + '</g>' +

          /* 사람 — 두 뷰에서 같은 자리, 같은 자세. 흐리게 둬서 주인공이 아님을
             보인다. 움직이지 않는다는 것이 곧 「판정과 무관하다」는 설명이다.
             영역보다 나중에 그려 두 분이 그 앞에 서 있는 것으로 보이게 한다. */
          '<g class="tech-ppl">' +
            PEOPLE.map(function (x) { return personSvg(x, FOOT, 0, PERSON_K); }).join('') +
          '</g>' +

          /* 라벨 — 영역 왼쪽. 아래는 설명 패널이 덮고 위는 화면이라 옆이 유일하게
             비어 있는 자리다. 짧은 지시선으로 영역과 이어 둔다. */
          '<path d="M596 592L' + (Z.x1 - 6) + ' 600" stroke="#fff" stroke-opacity=".45" stroke-width="2.5"/>' +
          '<rect x="322" y="573" width="274" height="38" rx="19"' +
            ' fill="#000" fill-opacity=".62" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>' +
          '<text x="459" y="599" text-anchor="middle" font-size="21" font-weight="700"' +
            ' letter-spacing="1.2" fill="#fff" fill-opacity=".92">도미노 감지 영역</text>' +

          /* 천장 플레이트 → 브래킷 봉 → 기기 (LED 를 향하므로 보이는 면은 뒷면) */
          '<rect x="' + (LED_CX - 16) + '" y="96" width="32" height="7" rx="2.5" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2"/>' +
          '<path d="M' + LED_CX + ' 103v101" stroke="#f5f5f7" stroke-width="3.5" stroke-linecap="round"/>' +
          '<rect x="' + (LED_CX - 35) + '" y="204" width="70" height="18" rx="6" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2.5"/>' +
        '</svg>' +
        '<span class="tech-sense__tag" style="left:50.4%;top:7.4%">KINECT · 천장 브래킷 · LED 방향</span>' +
      '</span>';
  }

  var media = document.querySelector('#techShot .tech-shot__media');
  var screenWrap = document.querySelector('#techShot .tech-shot__screen');
  if (!media || !screenWrap) return;

  screenWrap.innerHTML = '<img src="assets/led/cut01.jpg" alt="" draggable="false" />';
  media.insertAdjacentHTML('beforeend', diagram());
})();
