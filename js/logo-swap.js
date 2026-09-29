/* logo-swap.js — 04p 로고 · 재사용

   「로고는 맨 처음과 마지막에만 나옵니다」를 말이 아니라 **훑어서** 보여 준다.
   아래에 열여섯 장을 전부 깔아 두면, 앞뒤 두 장에만 로고가 있고 가운데 열네
   장이 통째로 비어 있다는 것이 한눈에 잡힌다. 몇 장만 골라 놓으면 「고른 것만
   비어 있는 것 아니냐」가 남으므로 전부 깐다. 덤으로 이 장에서 흐름도 한 번
   더 훑어진다.

   그래서 후원사 버튼은 **처음과 끝에서만** 살아 있다. 가운데 컷에서 눌러
   바뀌는 것이 있으면 「로고 없음」이 거짓말이 된다.

   고른 후원사는 프레임을 옮겨도 유지된다. 처음에서 A 를 고르고 끝으로 가면
   같은 A 가 떠 있어야 「한 번 올리면 앞뒤가 같이 바뀐다」가 읽힌다.

   다음 장으로 넘어가기 전에 **인트로와 아웃로를 한 번씩은 보게** 한다(window.LOGO).
   이 장의 값어치가 그 두 장에 있는데, 발표 중에 화살표만 눌러 지나가면
   가운데 컷들만 보고 넘어가게 된다. */
(function () {
  'use strict';

  var SPONSORS = [
    { k: 'KB국민은행',   file: 'kb' },
    { k: 'HYUNDAI',      file: 'hyundai' },
    { k: '우리은행',     file: 'woori' },
    { k: '신한금융그룹', file: 'shinhan' }
  ];

  function introSrc(sponsor) { return 'assets/sponsor/intro-' + sponsor.file + '.jpg'; }
  function outroSrc(sponsor) { return 'assets/sponsor/' + sponsor.file + '.jpg'; }

  /* 가운데는 03p 의 컷 02~16 을 순서대로 전부 건다 */
  var MID = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(function (n) {
    var s = n < 10 ? '0' + n : String(n);
    return { k: s, src: 'assets/led/cut' + s + '.jpg' };
  });

  var FRAMES = [{ k: '인트로', tag: '로고', pick: introSrc }]
    .concat(MID)
    .concat([{ k: '아웃로', tag: '로고', pick: outroSrc }]);
  var LAST = FRAMES.length - 1;

  var shot  = document.getElementById('lgShot');
  var strip = document.getElementById('lgStrip');
  var picks = document.getElementById('lgPicks');
  if (!shot || !strip || !picks) return;

  var frame = 0, sponsor = 0, seenIntro = false, seenOutro = false;

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

  /* 버튼 줄에 설명을 붙였었다. 고를 때마다 길이가 달라져 가운데 정렬이 흔들렸고,
     위 본문이 이미 같은 말을 하고 있다. 버튼만 남긴다. */
  picks.innerHTML =
    '<span class="lg-picks__k">후원사 로고 · CMS 등록</span>' +
    SPONSORS.map(function (p, i) {
      return '<button class="lg-pick' + (i === 0 ? ' is-on' : '') + '" type="button"' +
             ' data-no-advance data-i="' + i + '">' + esc(p.k) + '</button>';
    }).join('');

  var ths     = strip.querySelectorAll('.lg-th');
  var pickBtn = picks.querySelectorAll('.lg-pick');

  /* 미리 받아 둔다 — 처음 누를 때 한 프레임 비는 것을 없앤다 */
  FRAMES.forEach(function (f) {
    if (f.src) { new Image().src = f.src; return; }
    SPONSORS.forEach(function (p) { new Image().src = f.pick(p); });
  });

  /* 그냥 갈아 끼운다. 한때 페이드로 받았다 — src 를 바로 바꾸면 한 프레임 비어
     깜빡일까 봐였는데, 위에서 전부 미리 받아 두므로 그럴 일이 없다. 페이드가
     남아 있으면 컷을 훑을 때마다 검게 꺼졌다 켜져서 흐름이 뚝뚝 끊긴다. */
  function paint() {
    var f = FRAMES[frame], next = srcOf(f);
    if (shot.getAttribute('src') === next) return;
    shot.src = next;
    shot.alt = f.k + (f.pick ? ' — ' + SPONSORS[sponsor].k : '');
  }

  function show(n) {
    frame = n;
    if (n === 0) seenIntro = true;
    if (n === LAST) seenOutro = true;
    render();
  }

  function render() {
    var on = !!FRAMES[frame].pick;
    paint();
    Array.prototype.forEach.call(ths, function (t, i) {
      t.classList.toggle('is-on', i === frame);
      if (i === frame) t.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    /* 가운데 컷에서는 후원사 버튼을 잠근다 — 여기서 바뀌는 것이 있으면
       「로고 없음」이 거짓말이 된다 */
    picks.classList.toggle('is-off', !on);
    Array.prototype.forEach.call(pickBtn, function (b, i) {
      b.disabled = !on;
      b.classList.toggle('is-on', on && i === sponsor);
    });
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
      show(parseInt(t.getAttribute('data-i'), 10));
    });
  });
  Array.prototype.forEach.call(pickBtn, function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      if (b.disabled) return;
      setSponsor(parseInt(b.getAttribute('data-i'), 10));
    });
  });

  /* 슬라이드 이동을 붙잡는다 — 앞뒤 두 장을 다 보고 나서야 다음 장으로.
     뒤로 가는 것은 막지 않는다. 되돌아가는 길까지 잠그면 발표 중에 답답하다. */
  window.LOGO = {
    next: function () {
      if (!seenOutro) { show(LAST); return true; }
      if (!seenIntro) { show(0); return true; }
      return false;
    },
    prev: function () { return false; },
    reset: function (fromEnd) { show(fromEnd ? LAST : 0); }
  };

  show(0);
})();
