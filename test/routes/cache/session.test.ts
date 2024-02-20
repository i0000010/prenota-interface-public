import request from 'supertest';
import { app } from '../../../src/index.js';
import { browser } from '../../../src/utils/browser.js';
import { redisClient } from '../../../src/utils/cache.js';

describe('POST /cache/session', () => {
    const email = 'user@test.com';

    it('should write session to cache using email as key and return 200', async () => {
        const response = await request(app).post('/cache/session')
        .send({email});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.sessionId).toBeDefined();
        expect(response.body.sessionId).not.toBe('');
    });

    it('should fail if email is not provided', async () => {
        const response = await request(app).post('/cache/session')
        .send({});
        expect(response.status).toBe(500);
    });

    it('should fail if email is not a valid email', async () => {
        const response = await request(app).post('/cache/session')
        .send({email: 'notavalidemail'});
        expect(response.status).toBe(500);
    });
});

describe('GET /cache/session/:sessionId', () => {
    const email = 'user@test.com';

    it('should fetch session from cache using email as key and return session data with status code 200', async () => {
        const sessionId = email;
        const response = await request(app).get(`/cache/session/${sessionId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.email).toBe(email);
        expect(response.body.userAgent).toBeDefined();
        expect(response.body.cookies).toBeDefined();
        expect(response.body.cookies).not.toBe('');
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.updatedAt).toBeDefined();
    });

    it('should return empty body if session not found', async () => {
        const sessionId = 'notavalidkey';
        const response = await request(app).get(`/cache/session/${sessionId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.email).toBeUndefined();
        expect(response.body.userAgent).toBeUndefined();
        expect(response.body.cookies).toBeUndefined();
    });

    it('should fail if sessionId is not provided', async () => {
        const response = await request(app).get(`/cache/session/`);
        expect(response.status).toBe(404);
    });
});

afterAll(async () => {
    await browser.close();
    // await redisClient.flushDb();
    await redisClient.quit();
});