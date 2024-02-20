import request from 'supertest';
import { app } from '../../../src/index.js';
import { NAVIGATION_TIMEOUT } from '../../../src/config.js';
import { browser } from '../../../src/utils/browser.js';
import { redisClient } from '../../../src/utils/cache.js';

describe('POST /prenota/services/authorize/306', () => {
    const email = 'zfzxczblzzwcccnsqm@bbitj.com';

    // it('should authorize service 306 and return 200 OK', async() => {
    //     const response = await request(app).post('/prenota/services/authorize/306')
    //     .send({
    //         email,
    //         typeofbooking: 1,
    //         notes:'',
    //     });
    //     expect(response.status).toBe(200);
    //     expect(response.body).toBe(true);
    // }, NAVIGATION_TIMEOUT * 2);

    it('should return 500 if email is missing from body', async () => {
        const response = await request(app).post('/prenota/services/authorize/306')
        .send({
            typeofbooking: 1,
            notes:'',
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe('\"email\" is required')
    });

    it('should return 500 if typeofbooking missing from body', async () => {
        const response = await request(app).post('/prenota/services/authorize/306')
        .send({
            email,
            notes:'',
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe('\"typeofbooking\" is required')
    });

    it('should return 500 if invalid typeofbooking', async () => {
        const response = await request(app).post('/prenota/services/authorize/306')
        .send({
            email,
            typeofbooking: 0,
            notes:'',
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe('\"typeofbooking\" must be greater than or equal to 1')
    });

    it('should return 500 if invalid email', async () => {
        const response = await request(app).post('/prenota/services/authorize/306')
        .send({
            email: 'invalid',
            typeofbooking: 1,
            notes:'',
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe('\"email\" must be a valid email')
    });
});

afterAll(async () => {
    await redisClient.quit();
    await browser.close();
});