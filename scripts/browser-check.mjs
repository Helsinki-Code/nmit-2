import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4175/';
const executablePath = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const artifacts = path.resolve('artifacts');
await mkdir(artifacts, { recursive: true });
let reference;
try { reference = await readFile(process.env.REFERENCE_HTML || '../website-review/ex.html', 'utf8'); } catch { /* Reference is optional in a fresh clone. */ }
const browser = await chromium.launch({ executablePath, headless: true });
const routes = ['', 'services', 'about', 'careers', 'blog', 'blog/telecom-cloud-migration', 'blog/partner-payment-apis', 'blog/hp-qualcomm-partnership', 'contact', 'contact/workshop'];
const results = [];
const errors = [];
async function ready(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('h1').waitFor();
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 8000))]));
}
async function snapshot(page) {
  return page.evaluate(() => ({
    title: document.title,
    text: document.querySelector('main').innerText.replace(/\s+/g,' ').trim(),
    heading: document.querySelector('h1').textContent,
    boxes: [...document.querySelectorAll('main section, main h1, main h2, main p, main .service-row')].map(el => {
      const r = el.getBoundingClientRect();
      return [el.tagName, ...[r.x,r.y,r.width,r.height].map(n => Math.round(n * 100)/100)];
    })
  }));
}
try {
  const context = await browser.newContext({ viewport: { width:1280, height:900 }, colorScheme:'light', reducedMotion:'reduce' });
  if (reference) await context.route('http://reference.test/**', route => route.fulfill({ contentType:'text/html', body:reference }));
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const refPage = reference ? await context.newPage() : null;
  for (const route of routes) {
    await ready(page, `${base}#/${route}`);
    assert.equal(await page.locator('h1').count(),1);
    const actual = await snapshot(page);
    if (refPage && route) {
      await ready(refPage, `http://reference.test/#/${route}`);
      const expected = await snapshot(refPage);
      assert.equal(actual.title,expected.title, `${route}: title`);
      assert.equal(actual.text,expected.text, `${route}: page content`);
      assert.deepEqual(actual.boxes,expected.boxes, `${route}: layout geometry`);
    }
    results.push({ route:`/#/${route}`, heading:actual.heading, referenceMatched:!!reference && !!route });
    console.log(`PASS /#/${route}${reference && route ? ' — content and layout match reference' : ''}`);
  }
  await page.locator('#theme-toggle').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.reload();
  await page.locator('h1').waitFor();
  assert.equal(await page.locator('#theme-toggle').getAttribute('aria-checked'),'true');
  assert.equal(await page.locator('#subject').inputValue(),'workshop');
  assert.equal(await page.locator('#contact-form').evaluate(form => form.checkValidity()),false);
  await page.locator('#name').fill('Browser check');
  await page.locator('#email').fill('invalid');
  await page.locator('#message').fill('Test enquiry');
  assert.equal(await page.locator('#contact-form').evaluate(form => form.checkValidity()),false);
  await page.locator('#email').fill('test@example.com');
  assert.equal(await page.locator('#contact-form').evaluate(form => form.checkValidity()),true);
  console.log('PASS theme persistence, workshop preset, and required/email validation');
  await context.close();
  for (const [name, viewport, colorScheme] of [
    ['home-light',{width:1280,height:900},'light'],
    ['home-dark',{width:1280,height:900},'dark'],
    ['home-mobile',{width:390,height:844},'light']
  ]) {
    const ctx = await browser.newContext({ viewport,colorScheme,reducedMotion:'reduce' });
    if(reference) await ctx.route('http://reference.test/**', route => route.fulfill({ contentType:'text/html',body:reference }));
    const app = await ctx.newPage();
    await ready(app,base+'#/');
    await app.locator('.model-stage[data-status="ready"]').waitFor();
    assert.equal(await app.locator('.model-label').count(),9);
    await app.locator('.model-label').getByText('Cloud',{exact:true}).click();
    await app.locator('.explainer-board[data-system="7"][aria-hidden="false"]').waitFor({state:'visible'});
    assert.equal(await app.locator('.explainer-board[data-system="7"] h3').textContent(),'Cloud infrastructure');
    for(let i=0;i<9;i++) {
      await app.locator('.model-system-picker button').nth(i).click();
      const board=app.locator(`.explainer-board[data-system="${i}"][aria-hidden="false"]`);
      await board.waitFor({state:'visible'});
      assert.equal(await board.locator('ol li').count(),2);
      assert.equal(await app.locator('.explainer-board[aria-hidden="false"]').count(),1);
      await board.locator('button').click();
      assert.equal(await app.locator('.explainer-board[aria-hidden="false"]').count(),0);
    }
    const canvasBounds=await app.locator('canvas').boundingBox();
    const cloudLabel=app.locator('.model-label').getByText('Cloud',{exact:true});
    const hitX=Number(await cloudLabel.getAttribute('data-mesh-x'));
    const hitY=Number(await cloudLabel.getAttribute('data-mesh-y'));
    await app.mouse.click(canvasBounds.x+canvasBounds.width*hitX,canvasBounds.y+canvasBounds.height*hitY);
    await app.locator('.explainer-board[data-system="7"][aria-hidden="false"]').waitFor({state:'visible'});
    await app.keyboard.press('Escape');
    assert.equal(await app.locator('.explainer-board[aria-hidden="false"]').count(),0);
    assert.equal(await app.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true,`${name}: no horizontal overflow`);
    const messages = [
      ['Show connected systems message','We connect your business systems. From ERP and CRM to payments and cloud.'],
      ['Show integration layer message','We build your integration layer. One architecture for systems built apart.'],
      ['Show apis and cloud message','We connect your APIs and cloud. From existing infrastructure to connected services.']
    ];
    for(const [label,expected] of messages) {
      await app.getByRole('button',{name:label,exact:true}).click();
      const rendered = await app.locator('.headline-frame').innerText();
      assert.equal(rendered.replace(/\s+/g,' ').trim(),expected,'Animated words retain visible spaces');
    }
    const stableHeading = await app.locator('.headline-frame').textContent();
    await app.waitForTimeout(4400);
    assert.equal(await app.locator('.headline-frame').textContent(),stableHeading,'Reduced motion keeps headline stable');
    assert.equal(await app.getByRole('button',{name:'Motion off'}).isDisabled(),true);
    await app.screenshot({path:path.join(artifacts,name+'.png'),fullPage:true});
    await app.screenshot({path:path.join(artifacts,name+'-hero.png')});
    console.log(`PASS ${name}: all 9 explainer boards, mesh clicks, keyboard dismissal, responsive layout, reduced motion`);
    if(name==='home-mobile') {
      await app.locator('#menu-btn').click();
      assert.equal(await app.locator('#menu-btn').getAttribute('aria-expanded'),'true');
      await app.locator('#primary-nav').getByText('services',{exact:true}).click();
      await app.getByRole('heading',{name:'Four ways we get involved'}).waitFor();
      assert.equal(await app.locator('#menu-btn').getAttribute('aria-expanded'),'false');
      console.log('PASS mobile menu navigation');
    }
    await ctx.close();
  }
  const motionContext = await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'no-preference'});
  const motionPage = await motionContext.newPage();
  motionPage.on('pageerror',error=>errors.push(error.message));
  await ready(motionPage,base+'#/');
  await motionPage.locator('.model-stage[data-status="ready"]').waitFor();
  const movingBefore=await motionPage.locator('canvas').screenshot();
  await motionPage.waitForTimeout(1300);
  assert.equal(movingBefore.equals(await motionPage.locator('canvas').screenshot()),false,'The complete architecture moves automatically');
  const initialWord = await motionPage.locator('.headline-frame').textContent();
  await motionPage.waitForFunction(word => document.querySelector('.headline-frame').textContent !== word,initialWord);
  await motionPage.getByRole('button',{name:'Pause motion'}).click();
  const pausedWord = await motionPage.locator('.headline-frame').textContent();
  const before = await motionPage.locator('canvas').screenshot();
  await motionPage.waitForTimeout(4500);
  assert.equal(await motionPage.locator('.headline-frame').textContent(),pausedWord);
  assert.equal(before.equals(await motionPage.locator('canvas').screenshot()),true,'Paused 3D canvas remains stable');
  const box = await motionPage.locator('canvas').boundingBox();
  await motionPage.mouse.move(box.x+box.width/2,box.y+box.height/2);
  await motionPage.mouse.down();
  await motionPage.mouse.move(box.x+box.width/2+65,box.y+box.height/2+15,{steps:10});
  await motionPage.mouse.up();
  assert.equal(before.equals(await motionPage.locator('canvas').screenshot()),false,'Dragging rotates the model');
  await motionPage.getByRole('button',{name:'Reset view'}).click();
  assert.equal(before.equals(await motionPage.locator('canvas').screenshot()),false,'Reset restores default orientation after idle motion');
  await motionPage.getByRole('button',{name:'Play motion'}).click();
  await motionPage.waitForFunction(word => document.querySelector('.headline-frame').textContent !== word,pausedWord);
  await motionPage.waitForFunction(() => document.querySelector('.headline-frame').textContent.includes('APIs and cloud'));
  assert.equal(await motionPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth),true,'Longest rotating phrase fits');
  await motionPage.screenshot({path:path.join(artifacts,'hero-animated.png')});
  await motionPage.evaluate(() => document.querySelector('canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
  await motionPage.locator('.model-stage[data-status="fallback"]').waitFor();
  assert.equal(await motionPage.locator('.model-fallback svg').count(),1);
  console.log('PASS full-message animation, automatic model motion, shared pause/play, 3D drag/reset, and WebGL fallback');
  await motionContext.close();
  const fallbackContext = await browser.newContext();
  await fallbackContext.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type,...args) { return type.startsWith('webgl') ? null : original.call(this,type,...args); };
  });
  const fallbackPage = await fallbackContext.newPage();
  await ready(fallbackPage,base+'#/');
  await fallbackPage.locator('.model-stage[data-status="fallback"]').waitFor();
  assert.equal(await fallbackPage.locator('.model-fallback svg').count(),1);
  await fallbackContext.close();
  console.log('PASS initial WebGL unavailability fallback');
  assert.deepEqual(errors,[],'No React browser errors');
  await writeFile(path.join(artifacts,'browser-results.json'),JSON.stringify({base,routes:results,errors},null,2));
} finally { await browser.close(); }
