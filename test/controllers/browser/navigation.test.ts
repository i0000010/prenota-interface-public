import { Request, Response, NextFunction } from 'express';
import { goTo } from '../../../src/controllers/browser/navigation.js';
import { API_URL, NAVIGATION_TIMEOUT } from '../../../src/config.js';
import { browser, page } from '../../../src/utils/browser.js';
import  { jest } from '@jest/globals';

describe('goTo middleware', () => {
    it('should go to valid url', async () => {
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await goTo(page, API_URL)(req, res, next);
        const resultUrl = await page.url();
        expect(next).toHaveBeenCalledWith();
        // expect(resultUrl).toContain(url);
        expect(resultUrl).toBe(API_URL+'/');
    }, NAVIGATION_TIMEOUT);

    it('should not go to invalid url', async () => {
        const url = 'blah';
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await goTo(page, url)(req, res, next);
        const resultUrl = await page.url();
        // expect(resultUrl).not.toContain(url);
        expect(resultUrl).not.toBe(url+'/');
        expect(next).toHaveBeenCalledWith(expect.any(Error));
    }, NAVIGATION_TIMEOUT);
});

afterAll(async () => {
    await browser.close();
});