import request from 'supertest';
import { app } from '../../../src/index.js';
import { NAVIGATION_TIMEOUT } from '../../../src/config.js';
import { browser } from '../../../src/utils/browser.js';
import { redisClient } from '../../../src/utils/cache.js';

// const email = 'jqlnsjyolctuckjirk@cazlq.com';
// const email = 'gycxipvwahqqpjkxnp@cwmxc.com';
const email = 'zfzxczblzzwcccnsqm@bbitj.com';
// const password = 'FuckThis1!';
const password = 'x9WGsrmDcM7HBuC';

describe('POST /prenota/login', () => {

    // it('should login, cache session, and return 200 OK', async () => {
    //     const response = await request(app).post('/prenota/login')
    //     .send({
    //         email,
    //         password,
    //     });
    //     expect(response.status).toBe(200);
    //     expect(response.body.sessionId).toBe(email);
    // }, NAVIGATION_TIMEOUT*2);

    it('should return 500 if email missing from body', async () => {
        const response = await request(app).post('/prenota/auth/login')
        .send({
            password
        })
        expect(response.status).toBe(500);
        expect(response.text).toBe('\"email\" is required')
    });

    it('should return 500 if password fails regex validation', async() => {
        const password = '123456789';
        const response = await request(app).post('/prenota/auth/login')
        .send({
            email,
            password,
        })
        expect(response.status).toBe(500);
        expect(response.text).toContain(`\"password\" with value "${password}" fails to match the required pattern`);
    });

    it('should return 500 if invalid key passed in body', async () => {
        const response = await request(app).post('/prenota/auth/login')
        .send({
            email,
            password,
            key: 'invalid key'
        })
        expect(response.status).toBe(500);
        expect(response.text).toBe('\"key\" is not allowed')
    });

    it('should return 500 if wrong password passed in body', async () => {
        const response = await request(app).post('/prenota/auth/login')
        .send({
            email,
            password: '1234asdfASDF!@#$'
        })
        expect(response.status).toBe(500);
        expect(response.text).toBe(`Authentication failed for ${email} 1234asdfASDF!@#$`);
    }, NAVIGATION_TIMEOUT*2);
});

afterAll(async () => {
    await redisClient.quit();
    await browser.close();
});