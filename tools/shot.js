/* shot.js — 페이지를 띄우고, 필요하면 **조작한 뒤에** 캡처한다.
 *
 *   node tools/shot.js <url> <out.png> ["자바스크립트 한 줄"]
 *
 * chrome --screenshot 은 연 화면만 찍는다. 눌러야 보이는 것(확대 보기 덮개 같은)은
 * 못 찍으므로, DevTools 프로토콜로 붙어서 스크립트를 한 번 실행하고 찍는다.
 * node 22 부터 WebSocket 이 내장이라 의존성이 없다. */
const { spawn } = require('child_process');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [url, out, script] = process.argv.slice(2);
if (!url || !out) { console.error('usage: node tools/shot.js <url> <out.png> [js]'); process.exit(1); }

const PORT = 9333;
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars',
  '--window-size=1920,1080', '--remote-debugging-port=' + PORT,
  '--user-data-dir=' + require('os').tmpdir() + '/cdp-shot', url
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + PORT + '/json/list');
      const list = await r.json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) { /* 아직 안 떴다 */ }
    await sleep(250);
  }
  throw new Error('크롬이 안 뜬다');
}

(async () => {
  const ws = new WebSocket(await target());
  let id = 0;
  const waiting = new Map();
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m.result); waiting.delete(m.id); }
  });
  await new Promise(r => ws.addEventListener('open', r));
  const send = (method, params) => new Promise(res => {
    const n = ++id; waiting.set(n, res);
    ws.send(JSON.stringify({ id: n, method, params: params || {} }));
  });

  await sleep(2500);                                   /* 그림 · 폰트 */
  if (script) { await send('Runtime.evaluate', { expression: script }); await sleep(900); }
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(out, Buffer.from(r.data, 'base64'));
  console.log('wrote ' + out);
  ws.close(); chrome.kill(); process.exit(0);
})().catch(e => { console.error(e.message); chrome.kill(); process.exit(1); });
