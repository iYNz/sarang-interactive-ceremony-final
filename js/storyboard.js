/* storyboard.js — 나눔이벤트 퍼포먼스 상세 스토리보드 (도미노 · 최종안)

   지난 안(천지창조)은 진입 · 이탈 두 번을 판정했는데, 도미노는 한 번뿐이다 —
   「첫 도미노가 쓰러졌는가」. 그 뒤로는 판정 없이 흐른다. 현장에서 어긋날
   지점이 절반으로 줄었고, 그것이 이 컷 구성의 골격이다.

     대사 HUD — 사회자 멘트. 어디서 말이 나가고 어디서 화면이 받는지를 컷 위에 둔다.
     배지     — sensor 는 그 컷에서 일하는 센서, tag 는 퍼포먼스를 넘기는 트리거.
                판정이 일어나는 CUT 01 에만 붙는다.
     소리     — 컷마다 그 순간에 나는 소리를 한 줄로 적는다. 콘텐츠 음향은 우리가
                만들어 붙이므로 화면과 같은 자리에서 설계되어야 한다.
     동선     — CUT 01 에서 두 분이 걸어 들어와 도미노를 민다. 그 뒤로는 물러난
                자리 그대로다 — 이동이 한 번뿐이라 동선도 단순하다.
     img 없음 — 비주얼이 아직 없는 컷은 번호와 이름만 든 판으로 그려진다(sb-led__ph).
                레이아웃이 먼저 서야 이미지가 들어올 자리를 알 수 있다. */
(function () {
  'use strict';

  var CUTS = [
    /* 유일한 판정. 키넥트는 지정 구간에서 「도미노가 있다가 사라졌는가」만 본다 —
       사람의 손이나 제스처를 읽지 않으므로 변수가 적다. 1안(실물)과 2안(LED 단독)이
       갈리는 곳도 여기뿐이라, 이 컷만 두 단계를 두고 좌우로 넘겨 본다. */
    { no: 'CUT 01', ph: '쓰러뜨린다',
      variants: [{ k: '1안 · 실물 + LED' },
                 { k: '2안 · LED 단독' }],
      /* 두 안은 ← → 로 밟히기도 하지만 버튼을 따로 둔다 — 03p 에서 「시작점만 다르다」고
         해 놓고 여기서 우연히 밟아야 보이면 그 말이 확인되지 않는다. */
      pick: true,
      guideFirst: true,
      sensor: 'KINECT', tag: 'DOMINO DOWN',
      people: [765, 1171],
      walk: [-215, 215],
      arrive: true,
      floor: [{ x: 39.84, y: 73.15, type: 'mark', rot: -57 },
              { x: 60.99, y: 73.15, type: 'mark', rot:  57 }],
      say: ['나눔은 한 사람의 손끝에서 시작됩니다.',
            '대표님 두 분, 표시된 자리에서 앞의 도미노를 밀어 주시겠습니다.'], sayWide: true,
      snd: '탁. — 첫 한 장만 또렷하고, 뒤로 갈수록 멀어진다',
      l1: '좌 · 우에 떠 있던 로고가 물러나고, 첫 도미노가 넘어간다.',
      l2: '1안은 무대 바닥의 실물 도미노를 밀고, 그것이 멈추는 자리에서 화면 속 도미노가 그대로 이어받는다. 2안은 지정 자리에서 미는 동작만으로 화면 안의 첫 장이 넘어간다. 둘 다 이 순간 한 번만 판정하고, 이후는 판정 없이 흐른다.' },

    /* 판정은 끝났다. 여기부터는 자체 연출 구간이라 현장 변수가 들어올 자리가 없다. */
    { no: 'CUT 02', ph: '번져 간다',
      people: [640, 1296],
      floor: [{ x: 33.33, y: 73.15, type: 'mark', rot: -44 },
              { x: 67.50, y: 73.15, type: 'mark', rot:  44 }],
      say: '한 사람의 마음이 옆으로, 또 옆으로 이어집니다.',
      snd: '또르르— 연쇄음이 화면 안쪽으로 번지며 잦아든다',
      l1: '마을의 길을 따라 도미노가 순차적으로 쓰러진다.',
      l2: '허공에 늘어선 줄이 아니라 마을 안의 길이다. 도미노가 지나간 자리마다 길가의 창에 불이 하나씩 들어와, 쓰러지는 동작이 곧 켜지는 동작이 된다. 카메라는 쓰러짐을 따라 안쪽으로 밀려 들어간다.' },

    { no: 'CUT 03', ph: '채운다',
      people: [640, 1296],
      floor: [{ x: 33.33, y: 73.15, type: 'mark', rot: -44 },
              { x: 67.50, y: 73.15, type: 'mark', rot:  44 }],
      say: '이어진 마음이 모여, 오늘의 온도를 채웁니다.',
      snd: '차오름 — 낮게 깔린 음이 반음씩 올라간다',
      l1: '마지막 한 장이 중앙 오브제를 건드리고, 온도가 오른다.',
      l2: '길의 끝에서 도미노가 중앙 오브제에 닿는다. 온도계의 눈금이 아래에서부터 차오르고 열매가 붉어진다. 오브제는 그 해 온도탑 조형을 따라가지 않고 온도계와 열매라는 기호만 쓰므로, 다음 해에도 같은 씬을 그대로 쓴다.' },

    /* 이 덱에서 가장 오래 머무는 컷이다. 앞을 빠르게 지나온 이유가 전부 여기에 있다. */
    { no: 'CUT 04', ph: '밝아진다', lit: true,
      people: [640, 1296],
      floor: [{ x: 33.33, y: 73.15, type: 'mark', rot: -44 },
              { x: 67.50, y: 73.15, type: 'mark', rot:  44 }],
      say: '두 분이 채운 온도가, 마을 전체를 밝힙니다.',
      snd: '한 방 — 마을이 켜지는 순간 전 음역이 열린다',
      l1: '온도가 끝까지 차고, 마을 전체가 한 번에 켜진다.',
      l2: '눈금이 정점에 닿는 순간 빛이 중앙에서 바깥으로 퍼지며 마을의 모든 창과 거리가 동시에 밝아진다. 카메라가 뒤로 빠지며 밝아진 마을 전체를 한 화면에 담는다. 화면과 소리가 같은 프레임에서 터지는 지점이고, 이 구간에 가장 긴 시간을 둔다.' },

    { no: 'CUT 05', ph: '남는다', lit: true,
      people: [838, 1098], banner: { pad: 103, cy: 624, h: 148 },
      say: '○○기업과 사랑의열매가 함께 만든 오늘을, 사진으로 남기겠습니다.',
      snd: '여운 — 잔향만 남기고 배경음으로 내려앉는다',
      l1: '밝아진 마을 위로 좌 · 우 로고가 떠오른다.',
      l2: '왼쪽에 후원사, 오른쪽에 사랑의열매 로고가 등장 애니메이션으로 올라온다. 연출 중에는 로고가 한 번도 나오지 않았기 때문에 이 한 컷만 기업마다 바뀌고, 나머지 네 컷은 그대로 재사용된다. 이 화면을 유지한 채 기념촬영과 성금 전달로 이어진다.' }
  ];

  var strip = document.getElementById('sbStrip');
  var dotsWrap = document.getElementById('sbDots');
  var curEl = document.getElementById('sbCur');
  var totEl = document.getElementById('sbTot');
  if (!strip) return;

  var STAGE_W = 1920, CARD_W = 1180, GAP = 20;
  var OFFSET = (STAGE_W - CARD_W) / 2;   /* 활성 카드를 무대 중앙에 */
  var idx = 0;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* 센서 배지(조용함) + 트리거 배지(흰 알약) + CI 선택 토글을 같은 줄에 늘어놓는다 */
  function tagsHtml(c) {
    if (!c.sensor && !c.tag && !(c.pick && c.variants)) return '';
    var out = '';
    if (c.sensor) {
      (Array.isArray(c.sensor) ? c.sensor : [c.sensor]).forEach(function (s) {
        out += '<span class="sb-tag sb-tag--sensor">' + esc(s) + '</span>';
      });
    }
    if (c.tag) {
      (Array.isArray(c.tag) ? c.tag : [c.tag]).forEach(function (t) {
        out += '<span class="sb-tag sb-tag--trigger">' + esc(t) + '</span>';
      });
    }
    if (c.pick && c.variants) {
      out += '<span class="sb-pick">' + c.variants.map(function (v, n) {
        return '<button class="sb-pick__b' + (n === 0 ? ' is-on' : '') + '" type="button" data-no-advance data-v="' + n + '">' + esc(v.k) + '</button>';
      }).join('') + '</span>';
    }
    return '<span class="sb-tags">' + out + '</span>';
  }

  function sayHtml(c) {
    if (!c.say) return '';
    var lines = Array.isArray(c.say) ? c.say : [c.say];
    return '<div class="sb-say' + (c.sayWide ? ' sb-say--wide' : '') + '"><span class="sb-say__who">사회자</span>' +
             '<p class="sb-say__t">' + lines.map(esc).join('<br />') + '</p>' +
           '</div>';
  }

  /* 바닥 유도 그래픽 — 지정 자리를 표시하는 글로우 마크(/ \).
     목업 16:9 기준 백분율이라 프레임 위에 얹으면 바닥에 놓인 것처럼 보인다.
     이동 방향 화살표는 여기 없다 — 픽토그램 몸통 옆에 함께 그린다(personSvg). */
  function guideHtml(g) {
    /* 기울기는 목업 바닥 타일의 소실선 각도다 — 자리마다 달라서 인라인으로 준다 */
    return '<span class="sb-g sb-g--mark" style="left:' + g.x + '%;top:' + g.y + '%">' +
             '<span class="sb-g__mark" style="transform:rotate(' + (g.rot || -70) + 'deg)"></span>' +
           '</span>';
  }
  /* 프레임(z 1) 위에 놓여야 바닥에 보인다.
     사람보다 먼저 그린다 — 바닥에 놓인 마크를 밟고 선 것이므로 사람이 위에 와야 한다.
     몸통이 반투명이라 가려진 부분도 비쳐 보이고, 발 아래로 삐져나온 쪽만 또렷하다. */
  function floorHtml(c) { return (c.floor || []).map(guideHtml).join(''); }

  /* ---- 사람 픽토그램 ----
     07p 센서 도식과 같은 도형을 이 장 모든 컷에도 세운다. 화면 앞에 사람이 서 있다는 게
     컷마다 보여야 클라이언트가 동선을 읽을 수 있다.
     상반신이 LED를 가리는 자리라 화면 위에서는 어둡게 빠지고 테두리만 밝게 남긴다.
     가로 0.5 · 세로 1.02 를 기준으로, 몸통에만 가로 1.21 을 더 준다.
     다만 비균등 스케일을 도형에
     그대로 먹이면 머리가 찌그러지고 몸통 라운드도 타원이 되어 뭉개진다. 그래서
       머리 — 가로 스케일에 맞춘 지름의 '정원'
       몸통 — 가로만 1.1배 더 준 뒤, 좌우 라운드는 rx=ry 인 정상 원호
     로 따로 잡는다. 좌표는 목업 16:9(1920×1080) 기준이라 07p 와 그대로 공유한다.
     wx 를 주면 그 자리로 걸어오는 루프가 붙는다 — cx 는 도착 지점이고 wx 는
     출발 지점까지의 오프셋이다. 방향 표시도 같은 <g> 안에 그려 함께 움직인다. */
  var P = { h: 345, sx: 0.5, sy: 1.02, bx: 1.21 };
  function personSvg(cx, footY, wx) {
    var H = P.h * P.sy;
    var hr = P.h * 0.13 * P.sx;                     /* 정원 반지름 */
    var headY = footY - H + hr;
    var hw = P.h * 0.21 * P.sx * P.bx;              /* 몸통 반폭 */
    var shY = headY + hr * 1.7;                     /* 목 간격 */
    var r = hw * 0.62;                              /* 좌우 동일한 라운드 */
    var body = 'M' + (cx - hw) + ' ' + footY + 'V' + (shY + r) +
               'Q' + (cx - hw) + ' ' + shY + ' ' + (cx - hw + r) + ' ' + shY +
               'H' + (cx + hw - r) +
               'Q' + (cx + hw) + ' ' + shY + ' ' + (cx + hw) + ' ' + (shY + r) +
               'V' + footY + 'Z';
    var moving = typeof wx === 'number' && wx !== 0;
    var attr = moving
      ? ' class="sb-person sb-person--walk" style="--wx:' + wx + 'px"'
      : ' class="sb-person"';
    return '<g' + attr + '>' +
      '<circle cx="' + cx + '" cy="' + headY + '" r="' + hr + '"' +
        ' fill="#0a0a0c" fill-opacity=".6" stroke="#f5f5f7" stroke-width="3.5"/>' +
      '<path d="' + body + '" fill="#0a0a0c" fill-opacity=".6" stroke="#f5f5f7" stroke-width="3.5" stroke-linejoin="round"/>' +
      (moving ? goSvg(cx, (footY + shY) / 2, hw, wx) : '') +
    '</g>';
  }

  /* 이동 방향 표시 — 바닥이 아니라 몸통 옆, 가슴께 높이에 붙인다.
     바닥에 두면 마크 · 목업 타일과 섞여 잘 안 보이는데, 몸통 옆은 배경이 비어 있다.
     사람과 같은 <g> 안이라 걸음 트랜스폼을 그대로 타고 함께 움직인다.
     대(帶)가 있는 화살표(→) 대신 홑화살표(›) 하나만 쓴다 — 획이 최소라 이 크기에서
     가장 또렷하고, 픽토그램 옆에서 형태가 경쟁하지 않는다.
     진행 방향은 -sign(wx) 이고(wx 는 출발 오프셋), 표시는 그 반대편 —
     뒤에서 미는 자리에 둔다. */
  function goSvg(cx, cy, hw, wx) {
    var d = wx > 0 ? -1 : 1;                 /* 진행 방향 */
    var ax = cx - d * (hw + 24);             /* 몸통 옆으로 살짝 떨어뜨린다 */
    return '<g class="sb-person__go" transform="translate(' + ax + ' ' + cy + ')' +
             (d < 0 ? ' scale(-1 1)' : '') + '">' +
      '<path d="M-5 -11L6 0-5 11" fill="none" stroke="#fff" stroke-width="4"' +
        ' stroke-linecap="round" stroke-linejoin="round"/>' +
    '</g>';
  }
  window.SB_PERSON = personSvg;   /* 3p(tech.js) 가 같은 도형을 쓴다 */

  /* 기념촬영 컷 — 두 사람이 가로로 긴 전달판을 함께 든다.
     몸 앞에서 드는 것이므로 사람보다 나중에(위에) 그린다.
     안쪽 가로줄 세 개는 판에 글자가 들어간다는 표시다. */
  function bannerSvg(x1, x2, cy, h) {
    var w = x2 - x1, cx = (x1 + x2) / 2, gap = h * 0.26;
    var lines = [0.56, 0.78, 0.42].map(function (k, n) {
      var lw = (w - 56) * k;
      return '<path d="M' + (cx - lw / 2) + ' ' + (cy + (n - 1) * gap) + 'h' + lw + '"' +
        ' stroke="#f5f5f7" stroke-opacity=".85" stroke-width="7" stroke-linecap="round"/>';
    }).join('');
    return '<g class="sb-person">' +
      '<rect x="' + x1 + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" rx="8"' +
        ' fill="#0a0a0c" fill-opacity=".72" stroke="#f5f5f7" stroke-width="3.5"/>' +
      lines +
    '</g>';
  }

  function peopleHtml(c) {
    if (!c.people) return '';
    var b = c.banner;
    var inner = c.people.map(function (x, n) {
      return personSvg(x, 790, c.walk && c.walk[n]);
    }).join('');
    if (b && c.people.length === 2) {
      inner += bannerSvg(c.people[0] - b.pad, c.people[1] + b.pad, b.cy, b.h);
    }
    return '<svg class="sb-people" viewBox="0 0 1920 1080" preserveAspectRatio="none">' +
             inner +
           '</svg>';
  }

  /* 현장 목업 위에 LED 화면만 얹는다.
     mockup10 은 LED 자리가 투명으로 빠진 파일이라, 화면 레이어를 뒤에 깔고
     목업을 위에 덮으면 창 안에만 그림이 들어간다.
     창 좌표는 mockup10 의 알파 bbox 를 실측해 CSS 에 박아뒀다. */
  function mediaHtml(c, i) {
    var screen = c.variants
      /* 단계가 있는 컷 — 모든 상태를 겹쳐 두고 불투명도로 넘긴다.
         ← → 로 한 단계씩 밟으며, 전환은 CSS 트랜지션이 받는다 */
      ? c.variants.map(function (v, n) {
          var on = (n === 0 ? ' is-on' : '');
          return v.img
            ? '<img class="sb-var' + on + '" src="' + v.img + '" alt="' + esc(c.no) + '" draggable="false" />'
            : '<span class="sb-var' + on + ' sb-led__ph">' +
                '<span class="sb-led__no">' + String(i + 1).padStart(2, '0') + '</span>' +
                '<span class="sb-led__t">' + esc(v.k) + '</span>' +
              '</span>';
        }).join('')
      : c.img
      ? '<img src="' + c.img + '" alt="' + esc(c.no) + '" draggable="false" />'
      : '<span class="sb-led__ph">' +
          '<span class="sb-led__no">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="sb-led__t">' + esc(c.ph) + '</span>' +
        '</span>';
    /* lit — 기념촬영 컷은 장내 조명이 올라오므로 목업을 어둡게 누르지 않는다 */
    return '<span class="sb-shot' + (c.lit ? ' sb-shot--lit' : '') + '">' +
             '<span class="sb-shot__screen">' + screen + '</span>' +
             '<img class="sb-shot__frame" src="assets/mockup/mockup10.png" alt="행사장 LED 월 설치 뷰" draggable="false" />' +
             /* 동선 가이드는 비워 두고 필요할 때 채워 넣는다 — DOM 에 들어오는
                순간이 곧 걸음 애니메이션의 시작점이라, 마크업에 미리 깔아 두면
                그 컷을 펼치기도 전에 이미 다 끝나 있다. */
             '<span class="sb-guide"></span>' +
           '</span>';
  }

  /* ---- 렌더 ---- */
  var html = '';
  CUTS.forEach(function (c, i) {
    html +=
      '<div class="sb-card" data-i="' + i + '">' +
        '<div class="sb-card__inner">' +
          mediaHtml(c, i) +
          tagsHtml(c) +
          sayHtml(c) +
          '<span class="sb-card__grad"></span>' +
          '<div class="sb-card__text">' +
            '<span class="sb-card__no">' + c.no + '</span>' +
            '<p class="sb-card__cap"><span class="l1">' + esc(c.l1) + '</span> <span class="l2">' + esc(c.l2) + '</span></p>' +
            (c.snd ? '<span class="sb-snd"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"/><path d="M16 8.6a5 5 0 0 1 0 6.8M18.7 6a8.6 8.6 0 0 1 0 12"/></svg>' + esc(c.snd) + '</span>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
  });
  strip.innerHTML = html;

  var dotsHtml = '';
  CUTS.forEach(function (c, i) {
    dotsHtml += '<button class="sb-dot" type="button" data-no-advance data-i="' + i + '" aria-label="' + c.no + '"></button>';
  });
  dotsWrap.innerHTML = dotsHtml;

  /* 동선 가이드 토글 — LED 화면을 가릴 일이 있을 때 손으로 걷어내는 버튼이다.
     CUT 01 은 가이드가 단계에 묶여 있고 나머지는 처음부터 켜져 있으므로, 버튼은
     그 두 경우를 구분하지 않고 「지금 보이면 끄고, 안 보이면 켠다」만 한다.
     다시 켤 때는 새로 만들어 넣어 걸음을 처음부터 보여준다. */
  var peopleBtn = document.getElementById('sbPeopleBtn');
  function syncBtn() {
    if (!peopleBtn) return;
    var on = guideOn(idx);
    peopleBtn.classList.toggle('is-on', on);
    peopleBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  if (peopleBtn) {
    peopleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (guideOn(idx)) {
        goff[idx] = true;
        applyStep(idx, ssel[idx]);
      } else {
        goff[idx] = false;
        /* 단계 때문에 꺼져 있었다면(CUT 01 의 0단계) 켜지는 단계까지 올린다 */
        applyStep(idx, Math.max(ssel[idx], guideAt(idx)), true);
      }
      syncBtn();
    });
  }

  /* 라이트박스는 걸지 않는다 — 발표 중 목업을 잘못 눌러 확대가 열리면 흐름이 끊긴다.
     같은 화면들은 08p CMS 목업의 미리보기에서 크게 볼 수 있으므로 잃는 것이 없다. */

  var cards = Array.prototype.slice.call(strip.querySelectorAll('.sb-card'));
  var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('.sb-dot'));
  if (totEl) totEl.textContent = '/ ' + String(CUTS.length).padStart(2, '0');

  function render() {
    strip.style.transform = 'translateX(' + (OFFSET - idx * (CARD_W + GAP)) + 'px)';
    cards.forEach(function (el, i) { el.classList.toggle('is-active', i === idx); });
    dots.forEach(function (el, i) { el.classList.toggle('is-on', i === idx); });
    if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
    syncBtn();
  }

  /* ---- 단계 상태 ----
     컷 하나는 여러 단계로 나뉜다. 가이드가 켜지는 단계(guideAt)가 컷마다 다르다.

       CUT 01 (guideFirst)      0 화면만 · 1 가이드+변형0 · 2 가이드+변형1
       나머지 컷                0 부터 가이드가 이미 켜져 있고, 변형이 있으면 그 수만큼

     한때는 모든 컷이 0단계에서 가이드를 껐다. 화면을 먼저 보여주고 동선을 얹는
     순서가 컷 하나만 놓고 보면 옳지만, 다섯 장을 이어서 넘기면 컷마다 사람이
     사라졌다 다시 걸어 들어와 한 장면으로 이어지지 않는다.
     그래서 그 순서가 실제로 의미를 갖는 CUT 01 — 빈 화면의 파티클이 사람을
     불러들이는 컷 — 에만 남기고, 나머지는 처음부터 세워 둔다.
     변형이 가이드보다 뒤인 이유는 CUT 01 의 「파티클 → (걸어 들어옴) → 형상 완성」이
     실제 순서이기 때문이다. */
  var vsel = CUTS.map(function () { return 0; });   /* 카드 → 현재 변형 */
  var ssel = CUTS.map(function () { return 0; });   /* 카드 → 현재 단계 */
  var goff = CUTS.map(function () { return false; }); /* 카드 → 「사람 위치」로 직접 끈 상태 */
  var setVariant = [];          /* 카드 인덱스 → 이미지·버튼을 바꾸는 함수 */
  var setGuide = [];            /* 카드 인덱스 → 가이드를 넣고 빼는 함수 */

  function guideAt(i) { return CUTS[i].guideFirst ? 1 : 0; }   /* 가이드가 켜지는 단계 */
  function stepsOf(i) {
    var c = CUTS[i];
    return (c.variants ? c.variants.length : 1) + guideAt(i);
  }
  function guideOn(i) { return !goff[i] && ssel[i] >= guideAt(i); }

  /* 단계를 실제 화면에 반영한다. rebuild 가 참이면 가이드를 새로 만들어 넣어
     걸음이 처음부터 다시 재생된다 — 가이드를 방금 켰거나 그 컷에 막 도착했을 때다.
     변형만 바뀔 때는 다시 만들지 않는다. */
  function applyStep(i, sN, rebuild) {
    var g = guideAt(i);
    sN = Math.max(0, Math.min(stepsOf(i) - 1, sN));
    var was = ssel[i];
    ssel[i] = sN;
    if (setVariant[i]) setVariant[i](Math.max(0, sN - g));
    if (setGuide[i]) setGuide[i](guideOn(i), !!rebuild || (was < g && sN >= g));
    /* 카드 안에서 단계만 밟을 때는 render() 를 거치지 않으므로 여기서 버튼을 맞춘다 —
       CUT 01 의 0단계로 되돌아왔는데 버튼만 켜진 채로 남던 것을 막는다. */
    if (i === idx) syncBtn();
  }

  /* ---- 이동 ---- */
  function goTo(i, dir) {
    var nx = Math.max(0, Math.min(CUTS.length - 1, i));
    if (nx === idx) return false;
    idx = nx;
    /* 앞에서 오면 첫 단계, 뒤에서 오면 마지막 단계부터.
       도착할 때마다 가이드를 새로 만들어 넣는다 — 걸음이 있는 컷(CUT 03 의 물러남)은
       그 컷을 펼친 순간부터 재생되어야 한다. 이미 다 끝난 자세로 서 있으면
       무엇이 트리거인지 보이지 않는다. */
    applyStep(idx, dir < 0 ? stepsOf(idx) - 1 : 0, true);
    render();
    return true;
  }
  window.SB = {
    next: function () {
      if (ssel[idx] < stepsOf(idx) - 1) { applyStep(idx, ssel[idx] + 1); return true; }
      return goTo(idx + 1, 1);
    },
    prev: function () {
      if (ssel[idx] > 0) { applyStep(idx, ssel[idx] - 1); return true; }
      return goTo(idx - 1, -1);
    },
    reset: function (fromEnd) {
      idx = fromEnd ? CUTS.length - 1 : 0;
      CUTS.forEach(function (c, i) {
        goff[i] = false;             /* 손으로 걷어낸 상태는 슬라이드를 다시 열면 풀린다 */
        applyStep(i, i === idx && fromEnd ? stepsOf(i) - 1 : 0, i === idx);
      });
      render();
    }
  };

  /* ---- 클릭 ---- */
  cards.forEach(function (el) {
    el.addEventListener('click', function () {
      if (dragged) return;
      /* 활성 카드는 deck.js 의 라이트박스가 받는다 */
      var i = parseInt(el.getAttribute('data-i'), 10);
      if (i !== idx) goTo(i);
    });
  });
  dots.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      goTo(parseInt(el.getAttribute('data-i'), 10));
    });
  });

  /* 단계 전환 — 카드 안 LED 이미지와 버튼 상태를 함께 바꾼다.
     좌우 이동(window.SB)도 이 함수를 그대로 쓰므로 조작 경로가 하나로 모인다.
     버튼 클릭은 전파를 끊어야 카드 이동이나 라이트박스가 같이 열리지 않는다. */
  cards.forEach(function (card) {
    var i = parseInt(card.getAttribute('data-i'), 10);
    var c = CUTS[i];

    /* 변형 전환 — 이미지 레이어와 CI 버튼 상태를 함께 바꾼다 */
    var vs = c && c.variants;
    if (vs) {
      var layers = Array.prototype.slice.call(card.querySelectorAll('.sb-shot__screen .sb-var'));
      var btns = Array.prototype.slice.call(card.querySelectorAll('.sb-pick__b'));
      setVariant[i] = function (n) {
        n = Math.max(0, Math.min(vs.length - 1, n));
        vsel[i] = n;
        layers.forEach(function (im, m) { im.classList.toggle('is-on', m === n); });
        btns.forEach(function (o, m) { o.classList.toggle('is-on', m === n); });
        /* 도착 단계에서는 걸음을 멈추고 방향 표시도 걷는다 — 이미 자리에 섰으므로 */
        if (c.arrive) card.classList.toggle('is-arrived', n > 0);
      };
      btns.forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          /* CI 버튼은 변형만 고른다 — 가이드가 단계에 묶인 컷이면 그만큼 밀어 준다 */
          applyStep(i, parseInt(b.getAttribute('data-v'), 10) + guideAt(i));
        });
      });
    }

    /* 동선 가이드 — 켤 때 만들어 넣고 끌 때 걷어낸다.
       DOM 에 들어오는 순간이 걸음 애니메이션의 시작점이라, 이렇게 해야 「누르면
       그때부터 걸어 들어온다」가 된다. 변형만 바뀔 때는 다시 만들지 않는다. */
    var slot = card.querySelector('.sb-guide');
    setGuide[i] = function (on, rebuild) {
      if (!slot) return;
      if (!on) { slot.innerHTML = ''; card.classList.remove('is-guide'); return; }
      if (rebuild || !slot.innerHTML) slot.innerHTML = floorHtml(c) + peopleHtml(c);
      card.classList.add('is-guide');
    };
  });

  /* ---- 드래그 · 스와이프 ---- */
  var down = false, startX = 0, dragged = false;
  strip.addEventListener('mousedown', function (e) {
    down = true; dragged = false; startX = e.clientX;
    strip.classList.add('is-drag');
  });
  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    if (Math.abs(e.clientX - startX) > 10) dragged = true;
  });
  window.addEventListener('mouseup', function (e) {
    if (!down) return;
    down = false; strip.classList.remove('is-drag');
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 60) goTo(idx + (dx < 0 ? 1 : -1));
    setTimeout(function () { dragged = false; }, 0);
  });

  var touchX = 0;
  strip.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  strip.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (dx < -50) goTo(idx + 1);
    else if (dx > 50) goTo(idx - 1);
  }, { passive: true });

  render();
})();
