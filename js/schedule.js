/* schedule.js — 09p 일정을 실제 달력에 표시한다

   한때 칸반 다섯 칸이었다. 「10월 중」 「11월 2주」가 글로만 적혀 있으니 그게
   언제인지 각자 머릿속에서 달력을 펴 봐야 했고, 그러면 PC 반입과 리허설 사이에
   몇 주가 있는지 같은 것이 안 잡힌다.

   달력으로 옮긴 뒤에도 한 번 더 손봤다. 달력 둘을 왼쪽에 몰고 오른쪽에 범례를
   세웠더니, 달력이 작아지고 일정은 또 옆에서 읽어야 해서 시선이 두 번 움직였다.
   지금은 **달력 둘을 화면 폭으로 키우고 일정을 칸 안에 직접 적는다.** 그러면
   「언제 · 무엇」이 한 자리에서 끝난다.

   못 박힌 날(9/29 · 10/9)과 아직 폭으로만 잡힌 구간을 다르게 그린다 —
   구간을 점 하나로 찍으면 정해진 날짜처럼 읽힌다. */
(function () {
  'use strict';

  var MONTHS = [{ y: 2026, m: 10 }, { y: 2026, m: 11 }];

  /* kind: 'fix' 못 박힌 날 · 'peak' 밀리면 뒤가 통째로 밀리는 구간 ·
           'span' 영상 작업 · 'sys' 시스템 작업
     lane: 같은 주에 여러 건이 겹치므로 줄을 나눠 쌓는다.
       0  못 박힌 날과 붉은 구간 — 붉은 띠 둘을 같은 줄에 둬야 서로 묶인 것이 보인다
       1  영상 — 터치디자이너 한 씬을 세우고 카메라로 컷을 뽑는다
       2  시스템 — 판정 · CMS · 환영 화면 · 큐 관리

     제작 한 달을 「제작 — 도미노 씬 · 로고 교체 CMS · …」 한 줄로 덮어 뒀었다.
     한 달이 한 덩어리라 언제 무엇이 끝나는지가 안 잡혔고, 늦어지는 것이 보이려면
     기준이 되는 주가 있어야 한다. **주마다 무엇을 만드는지로 쪼갠다.**

     영상 줄의 컷 번호는 03p 스토리보드(17컷)를 따른다 — 앞단에 컷이 더 붙으면
     여기 범위도 같이 옮겨야 한다.

     2026년 10월 달력의 주 구분: 9/27~10/3 · 10/4~10 · 10/11~17 · 10/18~24 · 10/25~31.
     9/30 로 시작하는 첫 주는 달을 넘어가므로 `run` 으로 한 건으로 묶는다. */
  var MARKS = [
    /* --- 못 박힌 날 · 서로 묶인 붉은 구간 --- */
    { lane: 0, kind: 'fix',  y: 2026, m: 9,  d1: 29, d2: 29, t: '본 시안 제출' },
    { lane: 0, kind: 'fix',  y: 2026, m: 10, d1: 9,  d2: 9,  t: '계약' },
    { lane: 0, kind: 'peak', y: 2026, m: 10, d1: 26, d2: 30, t: '미디어 서버 PC 반입 · 센서 설치' },
    { lane: 0, kind: 'span', y: 2026, m: 11, d1: 2,  d2: 6,  t: '현장 시뮬레이션 · 리허설' },
    { lane: 0, kind: 'peak', y: 2026, m: 11, d1: 9,  d2: 13, t: '운용 시작' },

    /* --- 영상 — 씬을 먼저 세우고, 이야기 순서대로 컷을 뽑는다 --- */
    { lane: 1, kind: 'span', y: 2026, m: 9,  d1: 30, d2: 30, t: '씬 구축 — 도시 · 길 · 라이팅 기준', run: 1 },
    { lane: 1, kind: 'span', y: 2026, m: 10, d1: 1,  d2: 3,  t: '씬 구축 — 도시 · 길 · 라이팅 기준', run: 1 },
    { lane: 1, kind: 'span', y: 2026, m: 10, d1: 4,  d2: 10, t: 'CUT 01~06 — 도미노가 골목을 지나 광장으로' },
    { lane: 1, kind: 'span', y: 2026, m: 10, d1: 11, d2: 17, t: 'CUT 07~11 — 구체가 켜지고 등대가 밝아진다' },
    { lane: 1, kind: 'span', y: 2026, m: 10, d1: 18, d2: 24, t: 'CUT 12~17 — 마을이 밝아지고 처음 자리로' },
    { lane: 1, kind: 'span', y: 2026, m: 10, d1: 25, d2: 30, t: '색보정 · 사운드 · 컷별 길이 확정' },

    /* --- 시스템 — 판정을 맨 앞에 둔다. 1안 · 2안 어느 쪽이든 여기서 갈린다 --- */
    { lane: 2, kind: 'sys',  y: 2026, m: 9,  d1: 30, d2: 30, t: '센서 판정 — 감지 영역 · 트리거', run: 2 },
    { lane: 2, kind: 'sys',  y: 2026, m: 10, d1: 1,  d2: 3,  t: '센서 판정 — 감지 영역 · 트리거', run: 2 },
    { lane: 2, kind: 'sys',  y: 2026, m: 10, d1: 4,  d2: 10, t: '로고 교체 CMS — PNG 한 장으로 앞뒤 화면' },
    { lane: 2, kind: 'sys',  y: 2026, m: 10, d1: 11, d2: 17, t: '환영 콘텐츠 — 평시 중앙 · 촬영 시 상단' },
    { lane: 2, kind: 'sys',  y: 2026, m: 10, d1: 18, d2: 24, t: '큐 관리 시스템 — 행사별 큐 구성 저장' },
    { lane: 2, kind: 'sys',  y: 2026, m: 10, d1: 25, d2: 30, t: '전 구간 연결 — 큐 순서대로 한 번에 돌린다' }
  ];

  var DOW = ['일', '월', '화', '수', '목', '금', '토'];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function last(y, m) { return new Date(y, m, 0).getDate(); }
  function dow(y, m, d) { return new Date(y, m - 1, d).getDay(); }

  /* 달을 넘어가는 구간은 MARKS 에 두 줄로 적되 `run` 이 같으면 한 건으로 센다 —
     이름을 두 번 적지 않기 위해서다. */
  function markAt(y, m, d, lane) {
    for (var i = 0; i < MARKS.length; i++) {
      var k = MARKS[i];
      if (k.lane === lane && k.y === y && k.m === m && d >= k.d1 && d <= k.d2) return k;
    }
    return null;
  }
  function keyOf(k) { return k.run ? 'run' + k.run : k.t; }
  var LANES = 3;

  /* 한 주(7칸)를 그리고, 그 주에 걸친 일정을 **칸 위에 띠로 얹는다.**
     띠는 주 단위로 잘라 놓는다 — 한 구간이 여러 주에 걸치면 띠도 여럿이 되고,
     각 띠는 자기 줄에서 시작 칸부터 끝 칸까지만 덮는다.
     이름은 **그 구간이 가장 넓게 깔리는 줄**에 한 번만 적는다. 첫 줄에 적으면
     9/30 처럼 한 칸에서 시작하는 구간의 이름이 잘린다. */
  function weekBars(cells, lane) {
    var out = [], i = 0;
    while (i < 7) {
      var c = cells[i], mk = c ? markAt(c.y, c.m, c.d, lane) : null;
      if (!mk) { i++; continue; }
      var j = i;
      while (j + 1 < 7 && cells[j + 1] &&
             keyOf(markAt(cells[j + 1].y, cells[j + 1].m, cells[j + 1].d, lane) || {}) === keyOf(mk)) j++;
      out.push({ key: keyOf(mk), t: mk.t, kind: mk.kind, lane: lane, from: i, span: j - i + 1 });
      i = j + 1;
    }
    return out;
  }

  function week(cells, bars) {
    return '<div class="cal__wk">' +
             cells.map(function (c) {
               var on = false;
               for (var L = 0; L < LANES; L++) if (markAt(c.y, c.m, c.d, L)) { on = true; break; }
               return '<span class="cal__d' + (c.out ? ' is-out' : '') +
                      (on ? ' is-on' : '') + '">' + c.d + '</span>';
             }).join('') +
             bars.map(function (b) {
               return '<span class="cal__bar is-' + b.kind + '"' +
                      ' style="left:' + (b.from / 7 * 100) + '%;width:' + (b.span / 7 * 100) + '%' +
                      ';top:' + (32 + b.lane * 22) + 'px">' +
                      (b.label ? '<b>' + esc(b.t) + '</b>' : '') +
                      '</span>';
             }).join('') +
           '</div>';
  }

  function month(y, m) {
    var lead = dow(y, m, 1);
    var lm = m === 1 ? 12 : m - 1, ly = m === 1 ? y - 1 : y;
    var nm = m === 12 ? 1 : m + 1, ny = m === 12 ? y + 1 : y;
    var lastPrev = last(ly, lm), lastThis = last(y, m);

    var cells = [];
    for (var i = lead; i > 0; i--) cells.push({ y: ly, m: lm, d: lastPrev - i + 1, out: true });
    for (var d = 1; d <= lastThis; d++) cells.push({ y: y, m: m, d: d, out: false });
    while (cells.length % 7) {
      var n = cells.length - lead - lastThis + 1;
      cells.push({ y: ny, m: nm, d: n, out: true });
    }

    /* 줄마다 띠를 먼저 모두 구해 놓고, 같은 구간 중 가장 넓은 것에만 이름을 단다 */
    var weeks = [], widest = {};
    for (var w = 0; w < cells.length; w += 7) {
      var wk = cells.slice(w, w + 7), bars = [];
      for (var L = 0; L < LANES; L++) bars = bars.concat(weekBars(wk, L));
      bars.forEach(function (b) {
        if (!widest[b.key] || b.span > widest[b.key].span) widest[b.key] = b;
      });
      weeks.push({ cells: wk, bars: bars });
    }
    Object.keys(widest).forEach(function (k) { widest[k].label = true; });
    var rows = weeks.map(function (o) { return week(o.cells, o.bars); }).join('');

    return '' +
      '<div class="cal">' +
        '<div class="cal__hd">' + y + '. ' + (m < 10 ? '0' + m : m) + '</div>' +
        '<div class="cal__w">' +
          DOW.map(function (t, i) {
            return '<span' + (i === 0 ? ' class="is-sun"' : '') + '>' + t + '</span>';
          }).join('') +
        '</div>' +
        rows +
      '</div>';
  }

  var wrap = document.getElementById('scCal');
  if (!wrap) return;
  wrap.innerHTML = MONTHS.map(function (o) { return month(o.y, o.m); }).join('');
})();
