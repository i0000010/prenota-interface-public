import request from 'supertest';
import { app } from '../../../src/index.js';
import { NAVIGATION_TIMEOUT } from '../../../src/config.js';
import { browser } from '../../../src/utils/browser.js';
import { redisClient } from '../../../src/utils/cache.js';

const email = 'zfzxczblzzwcccnsqm@bbitj.com';
const password = 'x9WGsrmDcM7HBuC';

describe('POST /prenota/appointments/BookingCalendar/RetrieveCalendarAvailability', () => {

    it('unauthorized request should receive invalid JSON and return 500', async () => {
        const email = 'nosession@email.com';
        const response = await request(app).post('/prenota/appointments/BookingCalendar/RetrieveCalendarAvailability')
        .send({
            serviceId:306,
            selectedDay: '2023-09-26',
            sessionId: email,
        });
        expect(response.status).toBe(500);
        expect(response.text).toBe(`session for ${email} not found in cache`);
    }, NAVIGATION_TIMEOUT);

    it('authorized request should receive valid JSON then return array of available dates with status code 200', async () => {

        // Ensure session cookies cached and authorized for service
        let response = await request(app).get(`/cache/session/${email}`);
        if (response.body.cookies === undefined || response.body.cookies === null || response.body.cookies === '') {
            await request(app).post('/prenota/login')
            .send({
                email,
                password,
            });
        }
        await request(app).post('/prenota/services/authorize/306')
        .send({
            email,
            typeofbooking: 1, //'option[value="1"]',
            notes:'',
        });

        response = await request(app).post('/prenota/appointments/BookingCalendar/RetrieveCalendarAvailability')
        .send({
            serviceId:306,
            selectedDay: '2023-09-26',
            sessionId: email,
        });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.dates)).toBe(true);
    }, NAVIGATION_TIMEOUT * 4);

    it('should return 500 if selectedDay does not conform to regex', async () => {
        const date = '20-09-2023';
        const response = await(request(app).post('/prenota/appointments/BookingCalendar/RetrieveCalendarAvailability')
        .send({
            serviceId:306,
            selectedDay: date,
            sessionId: email,
            })
        );
        expect(response.status).toBe(500);
        expect(response.text).toContain(`"selectedDay" with value "${date}" fails to match the required pattern`);
    });

    it('should return 500 if selectedDay does not conform to regex', async () => {
        const date = '20/09/2023';
        const response = await(request(app).post('/prenota/appointments/BookingCalendar/RetrieveCalendarAvailability')
        .send({
            serviceId:306,
            selectedDay: date,
            sessionId: email,
            })
        );
        expect(response.status).toBe(500);
        expect(response.text).toContain(`"selectedDay" with value "${date}" fails to match the required pattern`);
    });

    it('should return 500 if serviceId is not a number', async () => {
        const serviceId = 'three';
        const response = await(request(app).post('/prenota/appointments/BookingCalendar/RetrieveCalendarAvailability')
        .send({
            serviceId,
            selectedDay: '2023-09-26',
            sessionId: email,
            })
        );
        expect(response.status).toBe(500);
        expect(response.text).toContain(`"serviceId" must be a number`);
    });

    it('should return 500 if sessionId is not an email', async () => {
        const response = await(request(app).post('/prenota/appointments/BookingCalendar/RetrieveCalendarAvailability')
        .send({
            serviceId:306,
            selectedDay: '2023-09-26',
            sessionId: 'notanemail',
            })
        );
        expect(response.status).toBe(500);
        expect(response.text).toContain(`"sessionId" must be a valid email`);
    })
});

describe('POST /prenota/appointments/BookingCalendar/RetrieveTimeSlots', () => {

    it ('authorized request should receive valid JSON then return array of available timeslots with status code 200', async () => {
        const dateString = '2023-09-26';
        const response = await request(app).post('/prenota/appointments/BookingCalendar/RetrieveTimeSlots')
        .send({
            serviceId:306,
            selectedDay: dateString,
            sessionId: email,
        });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.timeslots)).toBe(true);
    }, NAVIGATION_TIMEOUT);
});

describe('POST /prenota/appointments/BookingCalendar/RetrieveTimeSlotsOnMultipleDates', () => {

    it ('authorized request should receive valid JSON then return array of available timeslots with status code 200', async () => {
        const dates = [
            '2023-09-26',
            '2023-09-27',
            '2023-09-28',
        ];

        const response = await request(app).post('/prenota/appointments/BookingCalendar/RetrieveTimeSlotsOnMultipleDates')
        .send({
            serviceId:'306',
            dates: dates,
            sessionId: email,
        });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.timeslots)).toBe(true);
    }, NAVIGATION_TIMEOUT);

    it('should fail if dates are not unique', async () => {
        const dates = [
            '2023-09-26',
            '2023-09-26',
        ]

        const response = await request(app).post('/prenota/appointments/BookingCalendar/RetrieveTimeSlotsOnMultipleDates')
        .send({
            serviceId:'306',
            dates: dates,
            sessionId: email,
        });
        expect(response.status).toBe(500);
        expect(response.text).toContain(`contains a duplicate value`);
    }, NAVIGATION_TIMEOUT);
});

afterAll(async () => {
    await browser.close();
    // await redisClient.flushDb();
    await redisClient.quit();
});