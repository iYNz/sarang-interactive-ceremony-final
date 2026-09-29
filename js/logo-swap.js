/* logo-swap.js — 04p 로고 · 재사용

   「로고는 맨 처음과 마지막에만 나옵니다」를 말이 아니라 **훑어서** 보여 준다.
   아래에 컷을 작게 쭉 깔아 두면, 앞뒤 두 장에만 로고가 있고 가운데는 전부
   비어 있다는 것이 한눈에 잡힌다. 가운데를 눌러 봐도 로고는 나오지 않는다 —
   그 「안 나온다」가 이 장이 파는 값어치다.

   그래서 후원사 버튼은 **처음과 끝에서만** 살아 있다. 가운데 컷에서 눌러
   바뀌는 것이 있으면 「로고 없음」이 거짓말이 된다.

   고른 후원사는 프레임을 옮겨도 유지된다. 처음에서 A 를 고르고 끝으로 가면
   같은 A 가 떠 있어야 「한 번 올리면 앞뒤가 같이 바뀐다」가 읽힌다. */
(function () {
  'use strict';

  var SPONSORS = [
    { k: 'KB국민은행',   file: 'kb',      note: '가로로 매우 긴 국문 lockup' },
    { k: 'HYUNDAI',      file: 'hyundai', note: '영문 워드마크 — 심볼이 앞에 붙는다' },
    { k: '우리은행',     file: 'woori',   note: '짧은 국문 — 가로로 가장 좁다' },
    { k: '신한금융그룹', file: 'shinhan', note: '심볼 + 다섯 글자' }
  ];

  /* 인트로는 아직 그림이 없다. 네 장 모두 CUT 01 을 걸어 두고, 자리만 잡아 둔다.
     실제 판이 나오면 아래 한 줄을 아웃로와 같은 모양으로 바꾸면 된다. */
  function introSrc()          { return 'assets/led/cut01.jpg'; }
  function outroSrc(sponsor)   { return 'assets/sponsor/' + sponsor.file + '.jpg'; }

  var FRAMES = [
    { k: '인트로', tag: '로고', pick: introSrc },
    { k: 'CUT 03', src: 'assets/led/cut03.jpg' },
    { k: 'CUT 06', src: 'assets/led/cut06.jpg' },
    { k: 'CUT 09', src: 'assets/led/cut09.jpg' },
    { k: 'CUT 12', src: 'assets/led/cut12.jpg' },
    { k: '아웃로', tag: '로고', pick: outroSrc }
  ];

  var shot   = document.getElementById('lgShot');
  var strip  = document.getElementById('lgStrip');
  var picks  = document.getElementById('lgPicks');
  if (!shot || !strip || !picks) return;

  var frame = 0, sponsor = 0;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function srcOf(f) { return f.pick ? f.pick(SPONSORS[sponsor]) : f.src; }

  strip.innerHTML = FRAMES.map(function (f, i) {
    return '<button class="lg-th' + (i === 0 ? ' is-on' : '') + (f.pick ? ' lg-th--logo' : '') +
           '" type="button" data-no-advance data-i="' + i + '">' +
             '<img src="' + srcOf(f) + '" alt="" draggable="false" />' +
             '<span class="lg-th__k">' + esc(f.k) + '</span>' +
             (f.tag ? '<span class="lg-th__tag">' + esc(f.tag) + '</span>' : '') +
           '</button>';
  }).join('');

  picks.innerHTML =
    '<span class="lg-picks__k">후원사 로고 · CMS 등록</span>' +
    SPONSORS.map(function (p, i) {
      return '<button class="lg-pick' + (i === 0 ? ' is-on' : '') + '" type="button"' +
             ' data-no-advance data-i="' + i + '">' + esc(p.k) + '</button>';
    }).join('') +
    '<span class="lg-picks__n" id="lgNote"></span>';

  var ths     = strip.querySelectorAll('.lg-th');
  var pickBtn = picks.querySelectorAll('.lg-pick');
  var noteEl  = document.getElementById('lgNote');

  /* 미리 받아 둔다 — 처음 누를 때 한 프레임 비는 것을 없앤다 */
  FRAMES.forEach(function (f) {
    if (f.src) { new Image().src = f.src; return; }
    SPONSORS.forEach(function (p) { new Image().src = f.pick(p); });
  });

  /* src 를 바로 갈아끼우면 한 프레임 비어 깜빡인다 — 페이드로 받는다 */
  function paint() {
    var f = FRAMES[frame], next = srcOf(f);
    if (shot.getAttribute('src') === next) return;
    shot.classList.add('is-swap');
    var im = new Image();
    im.onload = function () {
      shot.src = next;
      shot.alt = f.k + (f.pick ? ' — ' + SPONSORS[sponsor].k : '');
      requestAnimationFrame(function () { shot.classList.remove('is-swap'); });
    };
    im.src = next;
  }

  function render() {
    var f = FRAMES[frame], on = !!f.pick;
    paint();
    Array.prototype.forEach.call(ths, function (t, i) { t.classList.toggle('is-on', i === frame); });
    /* 가운데 컷에서는 후원사 버튼을 잠근다 — 여기서 바뀌는 것이 있으면
       「로고 없음」이 거짓말이 된다 */
    picks.classList.toggle('is-off', !on);
    Array.prototype.forEach.call(pickBtn, function (b, i) {
      b.disabled = !on;
      b.classList.toggle('is-on', on && i === sponsor);
    });
    noteEl.textContent = on ? SPONSORS[sponsor].note : '이 구간에는 로고가 나오지 않습니다';
  }

  function setSponsor(n) {
    sponsor = n;
    /* 앞뒤 두 썸네일도 같이 갈아 끼운다 — 한 번 올리면 둘 다 바뀐다는 것이
       이 장의 결론이므로, 목록에서도 같이 바뀌어야 말이 맞는다 */
    Array.prototype.forEach.call(ths, function (t, i) {
      if (FRAMES[i].pick) t.querySelector('img').src = srcOf(FRAMES[i]);
    });
    render();
  }

  Array.prototype.forEach.call(ths, function (t) {
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      frame = parseInt(t.getAttribute('data-i'), 10);
      render();
    });
  });
  Array.prototype.forEach.call(pickBtn, function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      if (b.disabled) return;
      setSponsor(parseInt(b.getAttribute('data-i'), 10));
    });
  });

  render();
})();
