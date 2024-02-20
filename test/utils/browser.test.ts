import { browser, page } from '../../src/utils/browser.js';

describe('Puppeteer browser', () => {
    it('a browser instance should connected', async () => {
        expect(browser).toBeDefined();
        expect(browser.isConnected()).toBe(true);
    });

    it('should have a page', async () => {
        expect(page).toBeDefined();
        expect(page.url()).toBe('about:blank');
    });
});

describe('Navigation', () => {
    it('should navigate to a url', async () => {
        await page.goto('https://example.com');
        expect(page.url()).toBe('https://example.com/');
    });
});

afterAll(async () => {
    await browser.close();
});