import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../../src/utils/cache.js';
import { jest } from '@jest/globals';
import { sessionRepository } from '../../src/models/session.js';
import { Session } from '../../src/models/session.js';
import  { setAxiosSession, stringifyCookies } from '../../src/controllers/axios.js';
import { axiosInstance } from '../../src/utils/axios.js';
import { browser, page } from '../../src/utils/browser.js';
import { API_URL, NAVIGATION_TIMEOUT } from '../../src/config.js';

describe('setAxiosSession', () => {

    it('should pass error if no req.body', async () => {
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setAxiosSession()(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error('req.body is undefined'));
    });

    it('should pass error if no session in cache', async () => {
        const sessionId = 'invalidId';
        const req = {
            body: {sessionId},
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setAxiosSession()(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error(`session for ${sessionId} not found in cache`));
    });

    it('should pass error if there are no cookies in session', async () => {
        const sessionId = 'user@test.com';
        let cookieString = JSON.stringify([]);
        const userAgent = await browser.userAgent();
        const session: Session = {
            email: sessionId,
            userAgent: userAgent,
            cookies: cookieString,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await sessionRepository.save(sessionId, session);
        await sessionRepository.expire(sessionId, 60)
        const req = {
            body: {sessionId},
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setAxiosSession()(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error(`${sessionId} cookies are empty`));
    });

    it('should set axios headers', async () => {
        const sessionId = 'user@test.com';
        await page.goto(API_URL);
        const cookies = await page.cookies();
        let cookieString = JSON.stringify(cookies);
        const userAgent = await browser.userAgent();
        const session: Session = {
            email: sessionId,
            userAgent: userAgent,
            cookies: cookieString,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await sessionRepository.save(sessionId, session);
        await sessionRepository.expire(sessionId, 60)
        const req = {
            body: {sessionId},
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setAxiosSession()(req, res, next);

        cookieString = stringifyCookies(cookies);
        expect(next).toHaveBeenCalledWith();
        expect(axiosInstance.defaults.headers.Cookie).toBe(cookieString);
        expect(axiosInstance.defaults.headers['User-Agent']).toBe(userAgent);
    }, NAVIGATION_TIMEOUT);

});

afterAll(async () => {
    await browser.close();
    // await redisClient.flushDb();
    await redisClient.quit();
});