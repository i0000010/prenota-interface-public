import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Page } from 'puppeteer';
import * as config from '../../config.js';
// import userAgents from 'user-agents';

// @ts-ignore
puppeteer.use(StealthPlugin());

// @ts-ignore
export const browser = await puppeteer.launch({
    // executablePath: '/usr/bin/google-chrome',
    headless: config.HEADLESS,
    timeout: config.NAVIGATION_TIMEOUT,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--no-sandbox',],
    // executablePath: config.CHROME_PATH,

});

export const page = await browser.pages().then((pages: Page[]) => pages.pop() as Page);

// Setting a random user agent actually seems ot cause captcha to block the request
// @ts-ignore
// const userAgent = userAgents.random().toString();
export const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
await page.setUserAgent(userAgent);

process.on('exit', async () => {
    await browser.close();
});

process.on('SIGINT', async () => {
    await browser.close();
});