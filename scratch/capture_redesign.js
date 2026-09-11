const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\pranj\\.gemini\\antigravity\\brain\\476d285d-ce5e-492d-8624-5d9f3d4f292c';

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9345;
  const browser = spawn(edgePath, [
    '--remote-debugging-port=' + port,
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,1050',
    'http://localhost:8000'
  ]);

  await new Promise(r => setTimeout(r, 2200));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + port + '/json', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(r => ws.onopen = r);
  await send('Runtime.enable');
  await send('Page.enable');

  // 1. Hero shot
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
  await new Promise(r => setTimeout(r, 1000));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'shot_editorial_hero.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('Saved shot_editorial_hero.png');

  // 2. Triptych strip shot
  await send('Runtime.evaluate', { expression: 'document.querySelector(".triptych-banner").scrollIntoView({ block: "center" });' });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'shot_triptych.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('Saved shot_triptych.png');

  // 3. Tracks Header & Cards shot
  await send('Runtime.evaluate', { expression: 'document.getElementById("tracks").scrollIntoView({ block: "start" });' });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'shot_tracks.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('Saved shot_tracks.png');

  // 4. Showcase ("From Prototype to Production Deploy") shot
  await send('Runtime.evaluate', { expression: 'document.getElementById("manifesto").scrollIntoView({ block: "start" });' });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'shot_showcase.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('Saved shot_showcase.png');

  // 5. Footer with Giant V block shot
  await send('Runtime.evaluate', { expression: 'document.querySelector(".editorial-footer").scrollIntoView({ block: "center" });' });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'shot_footer_v.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('Saved shot_footer_v.png');

  // 6. Click square arrow button to open pass modal and take screenshot
  await send('Runtime.evaluate', { expression: 'document.querySelector(".square-arrow-btn").click();' });
  await new Promise(r => setTimeout(r, 800));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'shot_pass_modal_active.png'), Buffer.from(shot.result.data, 'base64'));
  console.log('Saved shot_pass_modal_active.png');

  browser.kill();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
