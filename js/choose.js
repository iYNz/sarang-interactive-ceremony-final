/* choose.js — 05p 고르실 것 (1안 · 2안 나란히)

   한때 이 장은 글로만 두 안을 설명하고, 옆 칸을 길 끝 오브제에 내줬다.
   오브제가 등대로 정해지면서 물을 것이 하나만 남았으므로, 남은 자리를 두 안을
   **나란히 보여 주는 데** 쓴다.

   「실물 도미노가 있다 / 없다」는 말보다 그림이 빠르다. 두 장을 붙여 놓으면
   다른 것이 하나뿐이라는 것 — 화면도 사람 자리도 같고 바닥의 도미노 두 장만
   있고 없다는 것 — 이 한눈에 보인다.

   3p CUT 01 과 **같은 도형 · 같은 좌표**를 쓴다. 앞 장에서 본 그 장면이 그대로
   두 갈래로 갈라져야 「같은 연출의 두 시작점」으로 읽힌다. */
(function () {
  'use strict';

  /* 3p 에서 정의한 도형을 그대로 가져온다 — 세 장이 같은 물건을 그려야 한다 */
  var personSvg = window.SB_PERSON || function () { return ''; };
  var dominoesHtml = window.SB_DOMINOES || function () { return ''; };

  /* CUT 01 의 값 그대로다. 소실점 (968, 437) 은 좌 · 우 벽 밑선 실측값이고,
     사람 깊이 배율 k 는 바닥선이 그 소실점에서 얼마나 떨어졌는지로 정해진다. */
  var DOMINOES = [{ y: 806 }, { y: 719 }];
  var PEOPLE = [883, 1053];
  var FOOT = 890, PERSON_REF = 419, VP_Y = 437;
  var K = (FOOT - VP_Y) / PERSON_REF;

  /* 무대 가운데만 당겨 본다 — 크기와 좌표의 근거는 css/final.css 의 .ch-shot__in */
  function shot(withDominoes) {
    return '<span class="ch-shot__in">' +
      '<span class="sb-shot__screen">' +
        '<img src="assets/led/cut01.jpg" alt="" draggable="false" />' +
      '</span>' +
      '<img class="sb-shot__frame" src="assets/mockup/mockup10.png" alt="현장 LED 월" draggable="false" />' +
      '<svg class="sb-people" viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
        (withDominoes ? dominoesHtml(DOMINOES) : '') +
        PEOPLE.map(function (x) { return personSvg(x, FOOT, 0, K); }).join('') +
      '</svg>' +
    '</span>';
  }

  var a = document.getElementById('chShotA');
  var b = document.getElementById('chShotB');
  if (!a || !b) return;

  a.innerHTML = shot(true);
  b.innerHTML = shot(false);
})();
