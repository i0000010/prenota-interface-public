import { Request, Response, NextFunction } from 'express';
import { page, browser } from '../../../src/utils/browser';
import { redisClient } from '../../../src/utils/cache';
import { jest } from '@jest/globals';
import { NAVIGATION_TIMEOUT } from '../../../src/config';
import { cacheSession } from '../../../src/controllers/cache/session';
import { sessionRepository } from '../../../src/models/session';

describe('cacheSession', () => {
    const email = 'user@test.com';
    
    it('should write a new session to redis', async () => {
        const req = {
            body: {email},
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await cacheSession(page)(req, res, next);
        expect(next).toHaveBeenCalledWith();
    }, NAVIGATION_TIMEOUT);

    it('should retrieve session from redis', async () => {
        const sessions = await sessionRepository.search()
            .where('email').eq(email)
            .return.all();
        expect(sessions).toBeDefined();
        expect(sessions).toBeInstanceOf(Array);
        expect(sessions).not.toHaveLength(0);
    });
});

afterAll(async () => {
    await browser.close();
    // await redisClient.flushDb();
    await redisClient.quit();
});