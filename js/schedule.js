/* schedule.js — 08p 일정을 실제 달력에 표시한다

   한때 칸반 다섯 칸이었다. 「10월 중」 「11월 2주」가 글로만 적혀 있으니 그게
   언제인지 각자 머릿속에서 달력을 펴 봐야 했고, 그러면 PC 반입과 리허설 사이에
   몇 주가 있는지 같은 것이 안 잡힌다.

   실제 10 · 11월 달력에 칠하면 그 간격이 눈에 바로 들어온다. 이 장에서 확인받을
   것이 「무엇을 만드나」가 아니라 **「이 순서가 가능한가」**이므로, 간격이 보이는
   쪽이 맞다.

   못 박힌 날(9/29 · 10/9)과 아직 폭으로만 잡힌 구간을 다르게 그린다 —
   구간을 점 하나로 찍으면 정해진 날짜처럼 읽힌다. */
(function () {
  'use strict';

  var MONTHS = [{ y: 2026, m: 10 }, { y: 2026, m: 11 }];

  /* kind: 'fix' 못 박힌 날 · 'peak' 밀리면 뒤가 통째로 밀리는 구간 · 'span' 그 밖의 구간 */
  var MARKS = [
    { kind: 'fix',  y: 2026, m: 9,  d1: 29, d2: 29, k: '9 / 29',   t: '본 시안 제출',            s: '계약 근거자료' },
    { kind: 'fix',  y: 2026, m: 10, d1: 9,  d2: 9,  k: '10 / 9',   t: '계약',                   s: '이후 구축 착수' },
    { kind: 'peak', y: 2026, m: 10, d1: 12, d2: 23, k: '10월 중',  t: '미디어 서버 PC 반입',     s: '설치가 선행되어야 콘텐츠가 돕니다' },
    { kind: 'span', y: 2026, m: 11, d1: 2,  d2: 6,  k: '11월 초',  t: '현장 시뮬레이션 · 리허설', s: '인식 확정 · 초 단위 배분 확정' },
    { kind: 'peak', y: 2026, m: 11, d1: 9,  d2: 13, k: '11월 2주', t: '운용 시작',               s: '여러 기업 연속 진행' }
  ];

  var DOW = ['일', '월', '화', '수', '목', '금', '토'];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function last(y, m) { return new Date(y, m, 0).getDate(); }
  function dow(y, m, d) { return new Date(y, m - 1, d).getDay(); }   /* 0 = 일 */

  function markOf(y, m, d) {
    for (var i = 0; i < MARKS.length; i++) {
      var k = MARKS[i];
      if (k.y === y && k.m === m && d >= k.d1 && d <= k.d2) {
        return { i: i, kind: k.kind, head: d === k.d1, tail: d === k.d2 };
      }
    }
    return null;
  }

  /* 한 달치 격자. 앞뒤로 인접한 달의 날짜를 흐리게 채워 한 줄을 이룬다 —
     9/29 처럼 **앞 달에 있는 못 박힌 날**이 10월 격자 안에 같이 보여야 한다. */
  function month(y, m) {
    var lead = dow(y, m, 1);                    /* 1일 앞에 비는 칸 수 */
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

    return '' +
      '<div class="cal">' +
        '<div class="cal__hd">' + y + '. ' + (m < 10 ? '0' + m : m) + '</div>' +
        '<div class="cal__grid">' +
          DOW.map(function (w, i) {
            return '<span class="cal__w' + (i === 0 ? ' cal__w--sun' : '') + '">' + w + '</span>';
          }).join('') +
          cells.map(function (c) {
            var mk = c.out ? markOf(c.y, c.m, c.d) : markOf(c.y, c.m, c.d);
            var cls = 'cal__d' + (c.out ? ' is-out' : '');
            if (mk) {
              cls += ' is-mark is-' + mk.kind + (mk.head ? ' is-head' : '') + (mk.tail ? ' is-tail' : '');
            }
            return '<span class="' + cls + '">' + c.d + '</span>';
          }).join('') +
        '</div>' +
      '</div>';
  }

  var wrap = document.getElementById('scCal');
  if (!wrap) return;

  /* 달력 둘과 범례를 한 줄에 세운다. 범례를 아래로 빼면 세로가 길어져 이 장의
     나머지(만드는 것 · PC 사양 · 순서)가 밀려 나간다. */
  wrap.innerHTML =
    '<div class="cal-lay">' + MONTHS.map(function (o) { return month(o.y, o.m); }).join('') +
    '<ol class="cal-key">' +
      MARKS.map(function (k) {
        return '<li class="cal-key__i is-' + k.kind + '">' +
                 '<span class="cal-key__d">' + esc(k.k) + '</span>' +
                 '<b>' + esc(k.t) + '</b>' +
                 '<em>' + esc(k.s) + '</em>' +
               '</li>';
      }).join('') +
    '</ol>' +
    '</div>';
})();
