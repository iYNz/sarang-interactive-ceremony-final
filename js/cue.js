/* cue.js — 08p 식순 · 큐 관리

   이 장이 답하는 것은 「나눔이벤트가 식의 어디에 들어가는가」다.
   앞 장들이 도미노 열여섯 컷만 붙들고 있었으므로, 그것이 **전달식 한가운데의
   한 구간**일 뿐이고 앞뒤는 같은 시스템이 이어서 돈다는 것을 여기서 한 번
   보여 준다. 그래야 「그럼 나머지 화면은 누가 띄우나」가 안 남는다.

   식순은 사랑의열매 진행(안)의 여덟 순서를 그대로 따른다.
     01 내빈입장 · 착석 / 02 내빈소개 / 03 캠페인 영상 상영 / 04 인사말씀(기부자)
     05 감사말씀(모금회) / 06 나눔이벤트 / 07 성금 전달 / 08 기념촬영 및 폐회
   멘트는 사회자 시나리오에서 줄여 옮겼다.

   06 만 다섯 줄로 펴 둔다. 이번에 만드는 구간이라 안에서 무엇이 도는지가
   보여야 하고, 나머지는 「준비된 화면을 넘긴다」 한 줄이면 충분하다.

   라이트박스는 걸지 않는다. 크게 볼 것은 앞 장들에서 이미 다 크게 보여 줬고,
   여기서 볼 것은 **순서**다. */
(function () {
  'use strict';

  /* 식이 도는 동안 LED 에 깔려 있는 화면은 전달식 타이틀이다 */
  var TITLE = 'assets/cue/intro-screen.jpg';
  /* 03 만 다른 화면이다 — 기업이 준 캠페인 영상이 그대로 도는 구간이라
     타이틀 화면이 아니다. */

  /* 두 분이 무대 어디에 서 있는지 — 03p CUT 01 과 같은 도형 · 같은 좌표다.
     `side` 는 나눔이벤트 한가운데의 자리다. 밀고 난 뒤에도 가운데 서 있으면
     정작 봐야 할 화면을 가리므로, 화면 폭(606~1330) 바깥으로 물러난다. */
  var AT_SCREEN = [883, 1053];
  var AT_SIDE   = [548, 1388];
  var FOOT = 890, PERSON_K = (FOOT - 437) / 419;
  var DOMINOES = [{ y: 806 }, { y: 719 }];
  var BANNER = { pad: 58, cy: 645, h: 104 };

  var GROUPS = [
    { g: '1', t: '식 전반 — 준비된 화면을 넘긴다', cues: [
      { n: '01', title: '내빈입장 · 착석', sig: '입장 BGM ON', screen: '전달식 타이틀 화면', img: TITLE,
        ment: '내빈분들께서 입장하고 계십니다. 큰 박수로 환영해 주시기 바랍니다.\n지금부터 희망2027나눔캠페인 ○○기업 성금 전달식을 시작하겠습니다.' },
      { n: '02', title: '내빈소개', sig: '화면 유지', screen: '타이틀 화면 유지', img: TITLE,
        ment: '먼저, 오늘 자리를 빛내주신 내빈 소개가 있겠습니다.' },
      /* 이 큐의 화면은 **기업이 주는 영상**이다. 그럴듯한 정지컷을 깔아 두면
         우리가 만드는 화면처럼 보이므로 그림 없이 글자만 띄운다. */
      { n: '03', title: '캠페인 영상 상영', sig: '영상 ON · 조명 OFF', screen: '기업 캠페인 영상 (기업 제공)', note: '캠페인 영상 재생',
        ment: '2026년 한 해 ○○기업을 통해 만들어진 변화들을 영상으로 담아보았습니다. 함께 보시겠습니다.' },
      { n: '04', title: '인사말씀 (기부자)', sig: '인사말씀 BGM ON', screen: '타이틀 화면 유지', img: TITLE,
        ment: '○○기업 ***님을 앞쪽 단상으로 모시고 인사말씀을 청해 듣도록 하겠습니다.' },
      { n: '05', title: '감사말씀 (모금회)', sig: '감사말씀 BGM ON', screen: '타이틀 화면 유지', img: TITLE,
        ment: '다음으로 사랑의열매 ○○○ 회장님의 감사말씀이 있겠습니다.\n000억원의 소중한 성금을 기탁해주셨습니다. 여러분, 큰 박수 부탁드립니다.' }
    ]},
    /* 이번에 새로 만드는 구간. 앞뒤 큐는 준비된 화면을 넘기는 것이지만
       여기서는 센서가 도미노를 읽어 화면이 그 자리에서 반응한다. */
    { g: '2', t: '나눔이벤트 — 이번에 만드는 구간', cues: [
      { n: '06-1', title: '대기 · 두 분이 선다', sig: 'KINECT 대기', screen: 'CUT 01 — 도미노 앞에 마주 선다',
        img: 'assets/led/cut01.jpg', key: true, ppl: 'stand',
        ment: '두 분께서 가운데 도미노를 함께 밀어 주시겠습니다.\n○○기업의 나눔이 어떻게 퍼져 나가는지 함께 보시겠습니다.' },
      { n: '06-2', title: '민다 · 판정', sig: 'DOMINO DOWN 트리거', screen: 'CUT 02 — 화면 속 첫 장이 넘어간다',
        img: 'assets/led/cut02.jpg', key: true, ppl: 'pushed',
        ment: '여러분, 힘차게 카운트다운 외치겠습니다.\n셋, 둘, 하나!' },
      { n: '06-3', title: '마을로 퍼진다', sig: '판정 없음 · 자체 연출', screen: 'CUT 03 ~ 08 — 길을 따라 번진다',
        img: 'assets/led/cut06.jpg', ppl: 'side',
        ment: '○○기업의 나눔으로 우리사회 곳곳에 희망의 빛이 퍼지고 있습니다.' },
      { n: '06-4', title: '등대가 켜진다', sig: '판정 없음 · 자체 연출', screen: 'CUT 09 ~ 15 — 빛이 마을을 덮는다',
        img: 'assets/led/cut11.jpg', ppl: 'side',
        ment: '함께하는 나눔으로 마을 전체가 밝아집니다.\n다시 한 번, 큰 박수 부탁드립니다.' },
      { n: '06-5', title: '처음 자리로 돌아온다', sig: '화면 정지 · 조명 복귀', screen: 'CUT 16 — 촬영 배경으로 멈춘다',
        img: 'assets/led/cut16.jpg', ppl: 'side',
        ment: '○○기업의 나눔이 이렇게 곳곳으로 퍼져 나갑니다.' }
    ]},
    { g: '3', t: '마무리', cues: [
      { n: '07', title: '성금 전달 · 기념촬영', sig: '전달식 BGM ON', screen: 'CUT 17 — 로고가 뜬 화면 유지',
        img: 'assets/led/cut17.jpg', ppl: 'photo',
        ment: '이어서 성금을 전달하는 시간을 갖도록 하겠습니다.\n성금 전달판은 모니터로 대체하겠습니다. 여러분, 큰 박수 부탁드립니다.' },
      { n: '08-1', title: '인증패 전달', sig: '있는 경우에만', screen: '같은 화면 유지',
        img: 'assets/led/cut17.jpg', ppl: 'photo',
        ment: '희망나눔캠페인 인증패 전달 시간을 갖겠습니다.\n두 분께서는 정면에 있는 카메라를 봐주시면 감사하겠습니다.' },
      /* 식이 끝난 구간이라 평시 운영으로 그대로 돌아간다. 한때 기본 6종 중
         고르는 조작을 붙였는데, 이 덱에서는 고르는 것이 이 장의 내용이 아니다. */
      { n: '08-2', title: '폐회', sig: '평시 운영 복귀', screen: '디지털 앨범 CM', vid: 'assets/cue/album-cm.mp4#t=1',
        ment: '이것으로 희망2027나눔캠페인 ○○기업 성금 전달식을 모두 마치겠습니다.\n참석해주신 내빈 여러분께 감사드립니다.' }
    ]}
  ];

  /* 평탄화 — 화면은 큐 단위로 넘기고, 그룹은 목록에서만 묶어 보여준다 */
  var CUES = [];
  GROUPS.forEach(function (gr) { gr.cues.forEach(function (c) { CUES.push(c); }); });

  /* 03p 에서 정의한 도형을 그대로 가져온다 — 세 장이 같은 물건을 그려야 한다 */
  var personSvg   = window.SB_PERSON   || function () { return ''; };
  var dominoesSvg = window.SB_DOMINOES || function () { return ''; };
  var bannerSvg   = window.SB_BANNER   || function () { return ''; };

  /* 무대 위 사람 · 도미노 — 큐마다 자리가 다르다.
       stand   두 분이 도미노 앞에 선다. 실물 두 장이 함께 서 있다
       pushed  밀고 난 직후. 도미노가 사라졌고 두 분은 아직 그 자리다
       side    화면을 가리지 않게 양옆으로 물러났다
       photo   전달판을 들고 화면 앞에 선다 */
  function stageSvg(kind) {
    if (!kind) return '';
    var at = (kind === 'side') ? AT_SIDE : AT_SCREEN;
    var inner = (kind === 'stand') ? dominoesSvg(DOMINOES) : '';
    inner += at.map(function (x) { return personSvg(x, FOOT, 0, PERSON_K); }).join('');
    if (kind === 'photo') inner += bannerSvg(at[0] - BANNER.pad, at[1] + BANNER.pad, BANNER.cy, BANNER.h);
    return '<svg class="cue-ppl" viewBox="0 0 1920 1080" preserveAspectRatio="none">' + inner + '</svg>';
  }

  var root = document.querySelector('.cue-console');
  if (!root) return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  var listEl  = root.querySelector('.cue-list');
  var vidEl   = root.querySelector('.cue-video');
  var stillEl = root.querySelector('.cue-still');
  var noteEl  = root.querySelector('.cue-pending');
  var mockEl  = root.querySelector('.cue-mock');
  var mentEl  = root.querySelector('.cue-ment__t');
  var noEl    = root.querySelector('.cue-no');
  var titleEl = root.querySelector('.cue-title');
  var nextEl  = root.querySelector('.cue-next');
  var idx = 0;

  /* 큐 리스트 — 그룹 머리 + 큐 항목. 열세 개라 상자를 넘치므로 세로 스크롤이다
     (상자 크기는 그대로 둔다 — 콘솔이 커지면 목업이 줄어든다). */
  var html = '', flat = 0;
  GROUPS.forEach(function (gr) {
    html += '<div class="cue-group"><b>' + gr.g + '</b>' + esc(gr.t) + '</div>';
    gr.cues.forEach(function (c) {
      html += '<button class="cue-item' + (c.key ? ' is-key' : '') + '" type="button" data-no-advance' +
                ' data-i="' + (flat++) + '" role="option">' +
                '<span class="cue-item__no">' + c.n + '</span>' +
                '<span class="cue-item__body"><span class="cue-item__t">' + esc(c.title) + '</span>' +
                '<span class="cue-item__s">' + esc(c.screen) + '</span></span>' +
              '</button>';
    });
  });
  listEl.innerHTML = html;
  var items = Array.prototype.slice.call(listEl.querySelectorAll('.cue-item'));

  function render() {
    var c = CUES[idx];
    items.forEach(function (el, i) { el.classList.toggle('is-on', i === idx); });

    if (noteEl) {
      noteEl.style.display = c.note ? '' : 'none';
      if (c.note) noteEl.textContent = c.note;
    }
    if (c.vid) {
      stillEl.style.display = 'none';
      vidEl.style.display = '';
      if (vidEl.getAttribute('src') !== c.vid) vidEl.src = c.vid;
      var p = vidEl.play(); if (p && p.catch) p.catch(function () {});
    } else {
      vidEl.pause();
      vidEl.removeAttribute('src');
      vidEl.style.display = 'none';
      /* note 가 있는 큐는 그림 자리를 비운다 — src 를 남겨 두면 앞 큐의 화면이
         글자 뒤에 그대로 걸려 있다 */
      stillEl.style.display = c.note ? 'none' : '';
      if (c.img) stillEl.src = c.img; else stillEl.removeAttribute('src');
    }

    /* 사람 · 도미노 레이어는 큐마다 다시 그린다 */
    if (mockEl) {
      var old = mockEl.querySelector('.cue-ppl');
      if (old) old.remove();
      if (c.ppl) mockEl.insertAdjacentHTML('beforeend', stageSvg(c.ppl));
    }

    if (mentEl) mentEl.textContent = c.ment || '';
    noEl.textContent = 'CUE ' + c.n;
    titleEl.textContent = c.title + '  ·  ' + c.sig;
    var nx = CUES[idx + 1];
    nextEl.textContent = nx ? ('NEXT · ' + nx.title) : 'END OF SHOW';

    var on = items[idx];
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
  }

  function step(d) {
    idx = Math.max(0, Math.min(CUES.length - 1, idx + d));
    render();
  }

  items.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      root.focus();
      idx = parseInt(el.getAttribute('data-i'), 10) || 0;
      render();
    });
  });
  root.querySelector('[data-cue-prev]').addEventListener('click', function (e) { e.stopPropagation(); root.focus(); step(-1); });
  root.querySelector('[data-cue-next]').addEventListener('click', function (e) { e.stopPropagation(); root.focus(); step(1); });

  /* 콘솔이 활성(포커스) 상태일 때만 방향키를 가로챈다.
     클래스가 아니라 document.activeElement 를 직접 보므로 focus/blur 유실에
     영향받지 않는다. deck.js 는 window 버블 단계에 걸려 있어, document 캡처에서
     끊으면 슬라이드가 넘어가지 않는다. */
  function isArmed() {
    var a = document.activeElement;
    return a === root || root.contains(a);
  }
  function syncArmed() { root.classList.toggle('is-armed', isArmed()); }

  root.addEventListener('focusin', syncArmed);
  root.addEventListener('focusout', function () { setTimeout(syncArmed, 0); });
  root.addEventListener('mousedown', function () { root.focus(); setTimeout(syncArmed, 0); });
  root.addEventListener('click', function () { root.focus(); syncArmed(); });
  document.addEventListener('focusin', syncArmed);

  document.addEventListener('keydown', function (e) {
    if (!isArmed()) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    e.stopPropagation();
    step(e.key === 'ArrowRight' ? 1 : -1);
  }, true);

  /* 슬라이드를 벗어나면 자동으로 해제해, 다른 슬라이드에서 방향키가 막히지 않게 한다 */
  var slide = root.closest('.slide');
  if (slide && window.MutationObserver) {
    new MutationObserver(function () {
      if (!slide.classList.contains('is-active') && isArmed()) { root.blur(); syncArmed(); }
    }).observe(slide, { attributes: true, attributeFilter: ['class'] });
  }

  render();
})();
