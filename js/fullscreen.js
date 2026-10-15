/* fullscreen.js — 표지에서 브라우저를 전체화면으로 바꾼다.
 *
 * 이 자료는 현장 LED 에 띄워 놓고 크게 보는 용도로도 쓴다. 주소창과 탭이
 * 남아 있으면 그 띠만큼 화면이 깎이고, 보는 쪽은 그게 자료의 일부인지
 * 브라우저인지 구분하지 못한다.
 *
 * 전체화면이 되면 글자를 감춘다 — 할 일이 끝난 글자다. 되돌리기는 브라우저의
 * ESC 가 이미 맡고 있으므로 따로 버튼을 두지 않는다. */
(function () {
  'use strict';

  var root = document.documentElement;

  function isFs() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }
  function syncFsClass() { document.body.classList.toggle('is-fs', isFs()); }

  document.addEventListener('fullscreenchange', syncFsClass);
  document.addEventListener('webkitfullscreenchange', syncFsClass);
  syncFsClass();

  var cta = document.getElementById('fsCta');
  if (!cta) return;

  cta.addEventListener('click', function (e) {
    /* 덱이 클릭을 받아 장을 넘기지 않게 끊는다 */
    e.stopPropagation();
    var fn = root.requestFullscreen || root.webkitRequestFullscreen;
    if (fn) { var p = fn.call(root); if (p && p.catch) p.catch(function () {}); }
  });
})();
