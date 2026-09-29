/* tech2.js — 07p 기술 · 운영 (2안 · LED 단독)

   6p 와 같은 판을 쓰되 보는 곳이 다르다. 실물 도미노가 없으므로 키넥트는
   **화면 속 첫 도미노가 서 있는 자리**를 본다. 그 자리에 손이 들어와 1초를
   머물면 쓰러진다.

   그 1초를 말로 적지 않고 **아래에서 차오르는 게이지**로 보여 준다. 두 분이
   언제까지 손을 두고 있어야 하는지가 그림 하나로 끝나고, 실제 현장에서도
   화면에 이 게이지가 떠 있으면 따로 안내할 말이 없어진다.
   애니메이션은 루프다 — 한 번만 돌면 못 보고 지나간다.

   화면 · 사람은 03p CUT 01 · 06p 와 같은 도형, 같은 좌표를 쓴다. */
(function () {
  'use strict';

  var personSvg = window.SB_PERSON || function () { return ''; };

  /* 좌표계는 목업 원본 1920×1080 기준. 사람은 06p 와 같다. */
  var PEOPLE = [883, 1053], FOOT = 890, PERSON_K = (FOOT - 437) / 419;

  /* LED 창(투명으로 빠진 자리)의 실측 좌표. 화면 안의 자리를 목업 좌표로
     옮기려면 이 창 안에서의 비율을 쓴다. */
  var LED = { x1: 606, y1: 286, x2: 1330, y2: 690 };
  var LED_CX = (LED.x1 + LED.x2) / 2;
  function sx(f) { return LED.x1 + f * (LED.x2 - LED.x1); }
  function sy(f) { return LED.y1 + f * (LED.y2 - LED.y1); }

  /* 첫 도미노가 화면 안에서 차지하는 자리 — cut01.jpg 에서 실측했다
     (1920×1080 기준 x 882..1029 / y 670..1001 → 화면 비율로 환산). */
  var D = { x1: sx(0.459), x2: sx(0.536), y1: sy(0.620), y2: sy(0.927) };
  var PAD = 16;
  var Z = { x1: D.x1 - PAD, x2: D.x2 + PAD, y1: D.y1 - PAD, y2: D.y2 + 6 };
  var DCX = (D.x1 + D.x2) / 2;

  /* 게이지 — 도미노 밑변에서 윗변까지 수직으로 차오른다. 채워지는 데 1초,
     그 뒤 잠깐 머물다 사라지고 다시 시작한다(CSS .t2-fill).
     가는 직선이다. 도미노 폭의 17% — 한때 52% 짜리 둥근 막대였는데, 그 두께면
     나무 판을 덮어 「도미노에 칠해진 것」으로 보이고 모서리가 둥글어 알약처럼
     읽혔다. 얇은 직선이라야 **차오르는 눈금**으로 읽힌다. */
  var GW = (D.x2 - D.x1) * 0.173;

  /* 두 손이 놓이는 자리 — 게이지 양옆, 도미노 아랫동아리. 같은 높이에 두어
     「둘이 함께 민다」로 읽히게 한다. 손 모양이 뚜렷해져 얼굴로 볼 일은 없다. */
  var HL = { x: DCX - 30, y: D.y2 - 34 };
  var HR = { x: DCX + 30, y: D.y2 - 34 };

  /* 손 — 손목을 원점에 두고 손가락이 +x 로 뻗은 모양을 만들어 놓고, 자리에서
     돌려 쓴다. rot 은 손가락이 향하는 각도(0 = 오른쪽, -90 = 위).
     동그라미로는 「무엇이 닿았다」까지만 읽히고 사람 손인지는 안 읽힌다. 이 장은
     **손이 들어왔는지**를 보는 이야기라 손인 것이 보여야 한다.
     손가락은 선 네 개 + 엄지 하나다. 이 크기(가로 32)에서는 마디를 그려 봐야
     뭉치므로, 길이만 조금씩 달리해 손 모양의 윤곽만 남긴다.

     `flip` 은 좌우 손의 구분이다. -1 이면 먼저 거울로 뒤집고 돌리므로, 손가락은
     rot 이 아니라 **180 + rot** 을 향한다. 호출부에서 그 값을 맞춰 넘긴다. */
  function handSvg(x, y, rot, flip, sc) {
    var f = 'stroke="#f5f5f7" stroke-width="5" stroke-linecap="round" fill="none"';
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ')' +
             ' scale(' + (flip * (sc || 1)) + ',' + (sc || 1) + ')">' +
      '<rect x="-14" y="-11" width="20" height="22" rx="7"' +
        ' fill="#0a0a0c" fill-opacity=".78" stroke="#f5f5f7" stroke-width="4.5"/>' +
      '<path d="M5 -7h11" ' + f + '/>' +
      '<path d="M5 -2h13" ' + f + '/>' +
      '<path d="M5 3h12" ' + f + '/>' +
      '<path d="M5 8h9" ' + f + '/>' +
      '<path d="M-7 -10l6 -9" ' + f + '/>' +
    '</g>';
  }

  function diagram() {
    return '' +
      '<span class="tech-sense">' +
        '<svg viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
          '<defs>' +
            '<radialGradient id="t2Fan" cx="' + LED_CX + '" cy="222" r="580" gradientUnits="userSpaceOnUse">' +
              '<stop offset="0%" stop-color="#fff" stop-opacity=".26"/>' +
              '<stop offset="100%" stop-color="#fff" stop-opacity=".05"/>' +
            '</radialGradient>' +
            /* 게이지는 위로 갈수록 옅어진다 — 아래가 채워진 쪽이라는 것이 색으로 읽힌다 */
            '<linearGradient id="t2Glow" x1="0" y1="1" x2="0" y2="0">' +
              '<stop offset="0%" stop-color="#ffd166" stop-opacity=".95"/>' +
              '<stop offset="100%" stop-color="#ffd166" stop-opacity=".45"/>' +
            '</linearGradient>' +
          '</defs>' +

          /* 감지 범위 — 기기에서 아래로 열리는 반원 부채꼴. 6p 와 같은 값이다 */
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="url(#t2Fan)"/>' +
          '<path d="M' + LED_CX + ' 222 L423 420 A580 580 0 0 0 1513 420 Z" fill="none"' +
            ' stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 11"/>' +

          /* 사람 — 06p 와 같은 자리, 같은 자세. 여기서는 **먼저** 그린다.
             6p 의 영역은 바닥에 있어 두 분이 그 앞에 서는 것이 맞는 겹침이었지만,
             이 영역은 **화면 위**에 있다. 물리적으로는 사람 뒤인데, 그 순서로
             그리면 두 몸통 사이 76px 틈에만 보여 정작 볼 것이 안 보인다.
             그래서 이 장에서는 영역 · 게이지를 설명 표시로 보고 위에 얹는다. */
          '<g class="tech-ppl">' +
            PEOPLE.map(function (x) { return personSvg(x, FOOT, 0, PERSON_K); }).join('') +
          '</g>' +

          /* 판정 영역 — 바닥이 아니라 화면 위의 사각형이다. 6p 의 사다리꼴과
             모양이 다른 것이 곧 「보는 곳이 다르다」는 표시가 된다. */
          /* 안을 어둡게 깐다. 화면이 한낮 들판이라 흰 테두리도 금색 게이지도
             밝은 잔디 · 하늘 위에서 묻힌다. 스크림 한 겹이면 둘 다 살아난다. */
          '<rect x="' + Z.x1 + '" y="' + Z.y1 + '" width="' + (Z.x2 - Z.x1) + '" height="' + (Z.y2 - Z.y1) + '"' +
            ' rx="7" fill="#08080c" fill-opacity=".58" stroke="#fff" stroke-opacity=".85"' +
            ' stroke-width="4" stroke-dasharray="18 10"/>' +

          /* 1초 게이지 — 밑변에 붙여 두고 세로로만 늘린다 */
          '<rect class="t2-fill" x="' + (DCX - GW / 2) + '" y="' + D.y1 + '"' +
            ' width="' + GW + '" height="' + (D.y2 - D.y1) + '"' +
            ' fill="url(#t2Glow)"/>' +
          /* 다 찼을 때 밝아지는 윗선 — 「여기까지 차면 넘어간다」 */
          '<path class="t2-top" d="M' + (DCX - GW * 2.4) + ' ' + D.y1 + 'h' + (GW * 4.8) + '"' +
            ' stroke="#ffd166" stroke-width="4"/>' +
          /* 손 — 두 분이 도미노를 **앞으로 민다.** 손가락은 옆이 아니라 위를
             향해야 미는 동작이 된다. 다만 곧게 세우면 뻣뻣하므로 안쪽으로
             기울여 ／ ＼ 모양으로 둔다(각각 위에서 28도).
             팔은 짧은 토막이다. 판정 자리가 두 몸통 사이 좁은 틈(930~1006)에
             있어 어깨부터 길게 그리면 거의 수직선이 되고 죽마처럼 읽힌다.
             몸통 안쪽에서 손목까지만 잇는다 — 팔 자체는 이 도식의 내용이 아니다. */
          '<g class="t2-hand">' +
            '<path d="M916 ' + (D.y2 + 34) + 'L' + (HL.x - 8) + ' ' + (HL.y + 20) + '"' +
              ' stroke="#f5f5f7" stroke-width="7" stroke-linecap="round"/>' +
            '<path d="M1018 ' + (D.y2 + 34) + 'L' + (HR.x + 8) + ' ' + (HR.y + 20) + '"' +
              ' stroke="#f5f5f7" stroke-width="7" stroke-linecap="round"/>' +
            handSvg(HL.x, HL.y, -62, 1, 1.15) +   /* ／ 위-안쪽 */
            handSvg(HR.x, HR.y, 62, -1, 1.15) +   /* ＼ 위-안쪽 (거울) */
          '</g>' +

          /* 라벨 — 영역 왼쪽. 아래는 설명 패널이 덮고 위는 화면이라 옆이 유일하게
             비어 있는 자리다. 짧은 지시선으로 영역과 이어 둔다. */
          '<path d="M596 592L' + (Z.x1 - 6) + ' 600" stroke="#fff" stroke-opacity=".45" stroke-width="2.5"/>' +
          '<rect x="322" y="573" width="274" height="38" rx="19"' +
            ' fill="#000" fill-opacity=".62" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/>' +
          '<text x="459" y="599" text-anchor="middle" font-size="21" font-weight="700"' +
            ' letter-spacing="1.2" fill="#fff" fill-opacity=".92">첫 도미노 지점 · 손 1초</text>' +

          /* 천장 플레이트 → 브래킷 봉 → 기기 (LED 를 향하므로 보이는 면은 뒷면) */
          '<rect x="' + (LED_CX - 16) + '" y="96" width="32" height="7" rx="2.5" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2"/>' +
          '<path d="M' + LED_CX + ' 103v101" stroke="#f5f5f7" stroke-width="3.5" stroke-linecap="round"/>' +
          '<rect x="' + (LED_CX - 35) + '" y="204" width="70" height="18" rx="6" fill="#0c0c0e" stroke="#f5f5f7" stroke-width="2.5"/>' +
        '</svg>' +
        '<span class="tech-sense__tag" style="left:50.4%;top:7.4%">KINECT · 천장 브래킷 · LED 방향</span>' +
      '</span>';
  }

  var media = document.querySelector('#tech2Shot .tech-shot__media');
  if (!media) return;
  media.insertAdjacentHTML('beforeend', diagram());
})();
