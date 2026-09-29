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

  /* kind: 'fix' 못 박힌 날 · 'peak' 밀리면 뒤가 통째로 밀리는 구간 · 'span' 그 밖 */
  var MARKS = [
    { kind: 'fix',  y: 2026, m: 9,  d1: 29, d2: 29, t: '본 시안 제출' },
    { kind: 'fix',  y: 2026, m: 10, d1: 9,  d2: 9,  t: '계약' },
    { kind: 'peak', y: 2026, m: 10, d1: 12, d2: 23, t: '미디어 서버 PC 반입' },
    { kind: 'span', y: 2026, m: 11, d1: 2,  d2: 6,  t: '현장 시뮬레이션 · 리허설' },
    { kind: 'peak', y: 2026, m: 11, d1: 9,  d2: 13, t: '운용 시작' }
  ];

  var DOW = ['일', '월', '화', '수', '목', '금', '토'];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function last(y, m) { return new Date(y, m, 0).getDate(); }
  function dow(y, m, d) { return new Date(y, m - 1, d).getDay(); }

  function markAt(y, m, d) {
    for (var i = 0; i < MARKS.length; i++) {
      var k = MARKS[i];
      if (k.y === y && k.m === m && d >= k.d1 && d <= k.d2) return k;
    }
    return null;
  }

  /* 한 주(7칸)를 그리고, 그 주에 걸친 일정을 **칸 위에 띠로 얹는다.**
     띠는 주 단위로 잘라 놓는다 — 한 구간이 두 주에 걸치면 띠도 둘이 되고,
     각 띠는 자기 줄에서 시작 칸부터 끝 칸까지만 덮는다. 이름은 그 구간이
     처음 나오는 줄에만 적는다(같은 글씨가 두 줄에 뜨면 두 건으로 읽힌다). */
  function week(cells, seen) {
    var bars = '', i = 0;
    while (i < 7) {
      var c = cells[i], mk = c ? markAt(c.y, c.m, c.d) : null;
      if (!mk) { i++; continue; }
      var j = i;
      while (j + 1 < 7 && cells[j + 1] && markAt(cells[j + 1].y, cells[j + 1].m, cells[j + 1].d) === mk) j++;
      var first = !seen[mk.t];
      seen[mk.t] = true;
      bars += '<span class="cal__bar is-' + mk.kind + '"' +
                ' style="left:' + (i / 7 * 100) + '%;width:' + ((j - i + 1) / 7 * 100) + '%">' +
                (first ? '<b>' + esc(mk.t) + '</b>' : '') +
              '</span>';
      i = j + 1;
    }
    return '<div class="cal__wk">' +
             cells.map(function (c) {
               var mk = markAt(c.y, c.m, c.d);
               return '<span class="cal__d' + (c.out ? ' is-out' : '') +
                      (mk ? ' is-on' : '') + '">' + c.d + '</span>';
             }).join('') +
             bars +
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

    var seen = {}, rows = '';
    for (var w = 0; w < cells.length; w += 7) rows += week(cells.slice(w, w + 7), seen);

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
