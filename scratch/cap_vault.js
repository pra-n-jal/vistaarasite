const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  await page.goto('http://localhost:8000', {waitUntil: 'networkidle0'});
  await page.waitForSelector('#prizes');
  const el = await page.$('#prizes');
  await el.screenshot({path: 'C:/Users/pranj/.gemini/antigravity/brain/476d285d-ce5e-492d-8624-5d9f3d4f292c/shot_vault_prizes.png'});
  await browser.close();
  console.log('Saved shot_vault_prizes.png');
})();
