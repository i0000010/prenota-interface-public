import { redisClient } from '../../src/utils/cache.js';
import { browser, page } from '../../src/utils/browser.js';
import { Session, sessionRepository } from '../../src/models/session.js';


describe('Redis client', () => {
    it('should be connected', async () => {
        expect(redisClient).toBeDefined();
        expect(redisClient.isReady).toBe(true);
    });
});

describe('Redis client', () => {
    const email = 'user@test.com';

    it('should write a new session to redis', async () => {
        const userAgent = await browser.userAgent();
        const cookies = await page.cookies();
        const cookieString = JSON.stringify(cookies);
        const createdAt = new Date();
        const updatedAt = new Date();

        const session: Session = {
            email,
            userAgent,
            cookies: cookieString,
            createdAt,
            updatedAt,
        };
        const response = await sessionRepository.save(session);

        expect(response).toBeDefined();
        expect(response).toHaveProperty('email', email);
        expect(response).toHaveProperty('userAgent', userAgent);
        expect(response).toHaveProperty('cookies', cookieString);
        expect(response).toHaveProperty('createdAt', createdAt);
        expect(response).toHaveProperty('updatedAt', updatedAt);
    });

    it('should retrieve sessions from redis by email', async () => {
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
    await redisClient.flushDb();
    await redisClient.quit();
});