import { Request, Response, NextFunction } from 'express';
import { requireAuthorizationForService } from '../../../src/controllers/prenota/validation.js';
import { axiosInstance } from '../../../src/utils/axios.js';
import { jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../../../src/index.js';
import { NAVIGATION_TIMEOUT } from '../../../src/config.js';
import { browser } from '../../../src/utils/browser.js';
import { setAxiosSession } from '../../../src/controllers/axios.js';
import { redisClient } from '../../../src/utils/cache.js';

describe('requireAuthorizationForService', () => {
    it ('should pass error if cookies invalid', async () => {
        const req = {body: {sessionId: 'invalid@email.com', serviceId: '306'}} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await requireAuthorizationForService(axiosInstance)(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error('Unauthorized for service 306'));
    })

    it ('should succeed if cookies valid', async () => {
        const email = 'zfzxczblzzwcccnsqm@bbitj.com';
        const password = 'x9WGsrmDcM7HBuC';
        const response = await request(app).get(`/cache/session/${email}`);
        if (response.body.cookies === undefined || response.body.cookies === null || response.body.cookies === '') {
            await request(app).post('/prenota/login')
            .send({
                '#login-email':email,
                '#login-password': password,
                email,
            });
        }
        await request(app).post('/prenota/services/authorize/306')
        .send({
            email,
            '#typeofbookingddl': 1, //'option[value="1"]',
            '#BookingNotes':'',
        });
        const req = {body: {sessionId: email, serviceId: '306'}} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setAxiosSession()(req, res, next);
        await requireAuthorizationForService(axiosInstance)(req, res, next);
        expect(next).toHaveBeenCalledWith();
    }, NAVIGATION_TIMEOUT * 4);
})

afterAll(async () => {
    await browser.close();
    // await redisClient.flushDb();
    await redisClient.quit();
});