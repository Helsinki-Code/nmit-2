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
    if (refPage) {
      await ready(refPage, `http://reference.test/#/${route}`);
      const expected = await snapshot(refPage);
      assert.equal(actual.title,expected.title, `${route}: title`);
      assert.equal(actual.text,expected.text, `${route}: page content`);
      assert.deepEqual(actual.boxes,expected.boxes, `${route}: layout geometry`);
    }
    results.push({ route:`/#/${route}`, heading:actual.heading, referenceMatched:!!reference });
    console.log(`PASS /#/${route}${reference ? ' — content and layout match reference' : ''}`);
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
    const screenshot = await app.screenshot({path:path.join(artifacts,name+'.png'), fullPage:true});
    if(reference) {
      const ref = await ctx.newPage();
      await ready(ref,'http://reference.test/#/');
      assert.deepEqual((await snapshot(app)).boxes,(await snapshot(ref)).boxes,`${name}: layout geometry`);
      const refScreenshot = await ref.screenshot({path:path.join(artifacts,name+'-reference.png'),fullPage:true});
      console.log(`${name}: screenshot bytes ${screenshot.equals(refScreenshot) ? 'match exactly' : 'differ; layout geometry matches'}`);
    }
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
  assert.deepEqual(errors,[],'No React browser errors');
  await writeFile(path.join(artifacts,'browser-results.json'),JSON.stringify({base,routes:results,errors},null,2));
} finally { await browser.close(); }
