import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from './world';

dotenv.config();
setDefaultTimeout(60000);

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

BeforeAll(async function () {
  const browserType = process.env.BROWSER || 'chromium';
  const headless = process.env.HEADLESS === 'true';
  const slowMo = process.env.SLOW_MO ? parseInt(process.env.SLOW_MO, 10) : 0;

  if (browserType === 'firefox') {
    browser = await firefox.launch({ headless, slowMo });
  } else if (browserType === 'webkit') {
    browser = await webkit.launch({ headless, slowMo });
  } else {
    browser = await chromium.launch({ headless, slowMo });
  }
});

Before(async function (this: CustomWorld) {
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  await context.route('**/*{google,doubleclick,adservice,adnxs,analytics}*/**', route => route.abort());
  page = await context.newPage();
  this.browser = browser;
  this.context = context;
  this.page = page;
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && page) {
    const dir = path.resolve('test-results/screenshots');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const screenshot = await page.screenshot({
      path: path.join(dir, `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`),
      fullPage: true,
    });
    this.attach(screenshot, 'image/png');
  }
  if (page) await page.close();
  if (context) await context.close();
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
