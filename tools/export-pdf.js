/* export-pdf.js — 덱을 **상황마다 한 장씩** 찍어 PDF 한 권으로 묶는다.
 *
 *   node tools/export-pdf.js [url] [out.pdf]
 *
 * 왜 이렇게 하는가 —
 * 이 덱은 장을 넘기는 것만으로 끝나지 않는다. 03p 스토리보드는 열일곱 컷을
 * 캐러셀로 넘기고, 그중 셋은 한 컷 안에서 「지나기 전 / 지나간 뒤」를 또 밟는다.
 * 04p 로고도 같은 자리에서 그림이 바뀐다. 슬라이드 수만큼만 찍으면 그 전부가
 * 첫 상태 하나로 납작해진다.
 *
 * 그래서 **→ 를 눌러 가며 찍는다.** deck.js 의 next() 가 「안에서 더 밟을 것이
 * 있으면 밟고, 없으면 다음 장」이라, 눌러만 주면 모든 상황이 순서대로 지나간다.
 *
 * 묶는 방법 — 찍은 그림을 한 쪽에 한 장씩 얹은 HTML 을 만들어 크롬으로 인쇄한다.
 * 쪽 크기 20in x 11.25in 는 96dpi 기준 1920x1080 과 정확히 같다.
 */
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.argv[2] || 'http://localhost:4173/';
const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(process.argv[3] || path.join(ROOT, 'dist', '나눔이벤트_연출_시안.pdf'));
const W = 1920, H = 1080;
const MAX = 90;                 /* 무한 루프 방지 */
const SETTLE = 1250;            /* 장 전환 700ms + rise 스태거 440ms + 여유 */

/* → 만으로는 안 열리는 장.
 *
 * 08p 큐 콘솔은 **포커스가 있을 때만** 방향키를 가로챈다(cue.js 의 isArmed).
 * 자동 캡처는 콘솔을 누른 적이 없으니 방향키가 그대로 deck.js 로 가고, 그래서
 * CUE 01 한 장만 찍힌 채 다음 장으로 넘어갔다. 여기만 번호를 집어 눌러 준다.
 *
 * 열세 개를 다 싣지는 않는다 — 02 · 04 · 05 는 타이틀 화면 유지라 그림이 같고,
 * 08-1 · 08-2 는 행사 밖이다. 이 자료가 설명할 것은 **나눔이벤트 구간(06)** 과
 * 그 앞뒤 맥락(01 · 03 · 07) 이다. */
const EXPAND = {
  cue: ['01', '03', '06-1', '06-2', '06-3', '06-4', '06-5', '07']
};

/* 번호를 보고 그 항목을 누른다. data-i 로 집으면 목록이 바뀔 때 조용히 엇나간다. */
function clickCue(no) {
  return "(function(){var b=Array.prototype.slice.call(" +
         "document.querySelectorAll('#cue .cue-item'))" +
         ".filter(function(e){var n=e.querySelector('.cue-item__no');" +
         "return n && n.textContent.trim()===" + JSON.stringify(no) + ";})[0];" +
         "if(b){b.click();return true;}return false;})()";
}

/* 큐 항목을 누르면 콘솔이 포커스를 가져간다. 그대로 두면 다음 → 가 슬라이드가
   아니라 큐를 넘겨서 그 장에서 못 빠져나온다. */
const BLUR = "(function(){if(document.activeElement&&document.activeElement.blur)" +
             "document.activeElement.blur();})()";

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'deckpdf-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* 상태 지문 — 활성 장 + 캐러셀 위치 + 단계 + 가로 스크롤 + 그림 경로와 켜짐 표시.
   처음엔 앞의 넷만 봤다. 04p 로고 장은 스크롤도 캐러셀도 아니고 그림을 통째로
   바꿔 끼우는 방식이라 지문이 그대로였고, 그 자리에서 끝으로 오인해 멈췄다.
   그림 경로와 is-* 표시를 섞어 짧은 수로 접는다. */
const SIG = [
  '(function () {',
  "  var s = document.querySelector('.slide.is-active');",
  "  if (!s) return 'none';",
  "  var card = document.querySelector('#storyboard .sb-card.is-active');",
  "  var v = card ? card.querySelector('.sb-var.is-on') : null;",
  '  var vi = v ? Array.prototype.indexOf.call(v.parentNode.children, v) : -1;',
  "  var scrolls = Array.prototype.slice.call(s.querySelectorAll('*'))",
  '    .filter(function (e) { return e.scrollWidth > e.clientWidth + 2; })',
  "    .map(function (e) { return Math.round(e.scrollLeft / 10); }).join(',');",
  "  var srcs = Array.prototype.slice.call(s.querySelectorAll('img'))",
  "    .map(function (e) { return e.getAttribute('src') || ''; }).join(',');",
  "  var on = Array.prototype.slice.call(s.querySelectorAll('.is-on,.is-sel,.is-active'))",
  "    .map(function (e) { return e.className; }).join('/');",
  "  var h = 0, t = srcs + '#' + on;",
  '  for (var i = 0; i < t.length; i++) { h = (h * 31 + t.charCodeAt(i)) | 0; }',
  "  return [s.id, card ? card.getAttribute('data-i') : '-', vi, scrolls, h].join('|');",
  '})()'
].join('\n');

/* HUD 와 좌우 화살표는 화면용 장치다. 종이에는 쪽 번호가 따로 있다. */
const HIDE = [
  '(function () {',
  "  var st = document.createElement('style');",
  "  st.textContent = '#hud,#navPrev,#navNext,#boot,.fs-cta{display:none !important}';",
  '  document.head.appendChild(st);',
  '})()'
].join('\n');

const LAST_ID =
  "(function(){var s=document.querySelectorAll('.slide');return s[s.length-1].id})()";

async function cdp(port) {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
      const p = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (p) return p.webSocketDebuggerUrl;
    } catch (e) { /* 아직 안 떴다 */ }
    await sleep(250);
  }
  throw new Error('크롬이 안 뜬다');
}

(async () => {
  const port = 9344;
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
    '--window-size=' + W + ',' + H, '--remote-debugging-port=' + port,
    '--user-data-dir=' + path.join(work, 'profile'), URL
  ], { stdio: 'ignore' });

  const ws = new WebSocket(await cdp(port));
  let id = 0;
  const waiting = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m.result); waiting.delete(m.id); }
  });
  await new Promise((r) => ws.addEventListener('open', r));
  const send = (method, params) => new Promise((res) => {
    const n = ++id;
    waiting.set(n, res);
    ws.send(JSON.stringify({ id: n, method: method, params: params || {} }));
  });
  const evalJs = async (expr) =>
    (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value;

  /* 뷰포트를 1920x1080 에 딱 맞춘다 — 덱의 스케일러가 배율 1 이 되어 레터박스가 없다 */
  await send('Emulation.setDeviceMetricsOverride',
    { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await sleep(2600);
  await evalJs(HIDE);
  await sleep(200);

  /* 마지막 장이 무엇인지 미리 알아 둔다 — 「지문이 같다」만으로 멈추면 중간에
     아무 일도 안 일어나는 한 번이 끝으로 둔갑한다. 마지막 장에서 같은 지문이
     나왔을 때만 끝이다. 그 밖에서 거푸 같으면 걸린 것이므로 세 번까지만 본다. */
  const lastId = await evalJs(LAST_ID);

  const pages = [];
  const seen = new Set();
  const expanded = new Set();
  let stuck = 0;

  async function shoot(sig, label) {
    seen.add(sig);
    const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88 });
    const f = 'p' + String(pages.length + 1).padStart(3, '0') + '.jpg';
    fs.writeFileSync(path.join(work, f), Buffer.from(r.data, 'base64'));
    pages.push(f);
    console.log(String(pages.length).padStart(2) + '장  ' + label);
  }

  async function arrowRight() {
    for (const type of ['keyDown', 'keyUp']) {
      await send('Input.dispatchKeyEvent', {
        type: type, key: 'ArrowRight', code: 'ArrowRight',
        windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39
      });
    }
    await sleep(SETTLE);
  }

  for (let i = 0; i < MAX; i++) {
    const sig = await evalJs(SIG);
    const here = String(sig).split('|')[0];

    /* 번호를 집어 눌러야 열리는 장 */
    if (EXPAND[here] && !expanded.has(here)) {
      expanded.add(here);
      for (const no of EXPAND[here]) {
        const ok = await evalJs(clickCue(no));
        if (!ok) { console.log('   ' + here + ' ' + no + ' 를 못 찾았다 — 건너뛴다'); continue; }
        await sleep(650);
        await shoot(await evalJs(SIG), here + '  CUE ' + no);
      }
      await evalJs(BLUR);
      await sleep(150);
      await arrowRight();
      continue;
    }

    if (seen.has(sig)) {
      if (here === lastId) break;
      if (++stuck > 3) { console.log(here + ' 에서 더 안 바뀐다 — 여기서 멈춘다'); break; }
    } else {
      stuck = 0;
      await shoot(sig, String(sig).slice(0, 46));
    }

    await arrowRight();
  }

  console.log('찍은 장면 ' + pages.length + '개');
  ws.close();
  chrome.kill();

  /* ---- 한 권으로 묶기 ---- */
  const html = '<!doctype html><meta charset="utf-8"><style>' +
    '@page{size:20in 11.25in;margin:0}' +
    'html,body{margin:0;padding:0;background:#000}' +
    'img{display:block;width:' + W + 'px;height:' + H + 'px;break-after:page;page-break-after:always}' +
    'img:last-of-type{break-after:auto;page-break-after:auto}' +
    '</style>' + pages.map((f) => '<img src="' + f + '">').join('');
  fs.writeFileSync(path.join(work, 'book.html'), html);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run',
    '--no-pdf-header-footer', '--print-to-pdf-no-header',
    '--virtual-time-budget=60000',
    '--user-data-dir=' + path.join(work, 'profile2'),
    '--print-to-pdf=' + OUT,
    'file:///' + path.join(work, 'book.html').split(path.sep).join('/')
  ], { stdio: 'ignore' });

  console.log('wrote ' + path.relative(ROOT, OUT) +
    '  (' + Math.round(fs.statSync(OUT).size / 1024) + ' KB, ' + pages.length + '쪽)');
  console.log('중간 캡처: ' + work);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
