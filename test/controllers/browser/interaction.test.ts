import { Request, Response, NextFunction } from 'express';
import { click, setValue, check, closeModal, selectByText } from '../../../src/controllers/browser/interaction.js';
import { goTo } from '../../../src/controllers/browser/navigation.js';
import { API_URL, NAVIGATION_TIMEOUT } from '../../../src/config.js';
import { browser, page } from '../../../src/utils/browser.js';
import  { jest } from '@jest/globals';

// describe('goTo middleware', () => {
//     it('should go to valid url', async () => {
//         const req = {} as Request;
//         const res = {} as Response;
//         const next = jest.fn() as NextFunction;
//         await goTo(page, API_URL)(req, res, next);
//         const resultUrl = await page.url();
//         expect(next).toHaveBeenCalledWith();
//         // expect(resultUrl).toContain(url);
//         expect(resultUrl).toBe(API_URL+'/');
//     }, NAVIGATION_TIMEOUT);

//     it('should not go to invalid url', async () => {
//         const url = 'blah';
//         const req = {} as Request;
//         const res = {} as Response;
//         const next = jest.fn() as NextFunction;
//         await goTo(page, url)(req, res, next);
//         const resultUrl = await page.url();
//         // expect(resultUrl).not.toContain(url);
//         expect(resultUrl).not.toBe(url+'/');
//         expect(next).toHaveBeenCalledWith(expect.any(Error));
//         // @ts-ignore
//         const error = next.mock.calls[0][0] as Error;
//         expect(error.message).toContain(`Cannot navigate to invalid URL`);
//     }, NAVIGATION_TIMEOUT);
// });

// describe('click middleware', () => {
//     beforeAll(async () => {
//         const req = {} as Request;
//         const res = {} as Response;
//         const next = jest.fn() as NextFunction;
//         await goTo(page, API_URL)(req, res, next);
//     }, NAVIGATION_TIMEOUT);

//     it('should click on valid selector', async () => {
//         const selector = '#login-email';
//         const req = {} as Request;
//         const res = {} as Response;
//         const next = jest.fn() as NextFunction;
//         await click(page, selector)(req, res, next);
//         const responseUrl = await page.url();
//         expect(next).toHaveBeenCalledWith();
//         expect(responseUrl).toBe(API_URL+'/');

//     });

//     it('should not click on invalid selector', async () => {
//         const selector = '#blah';
//         const req = {} as Request;
//         const res = {} as Response;
//         const next = jest.fn() as NextFunction;
//         await click(page, selector)(req, res, next);
//         expect(next).toHaveBeenCalledWith(expect.any(Error));
        
//         // @ts-ignore
//         const error = next.mock.calls[0][0] as Error;
//         expect(error.message).toBe(`${selector} not found in page at ${API_URL}/`);
//     });
// });

describe("setValue middleware", () => {
    beforeAll(async () => {
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await goTo(page, API_URL)(req, res, next);
    }, NAVIGATION_TIMEOUT);

    it('should set value on valid selector', async () => {
        const selector = '#login-email';
        const email = 'user@email.com';
        const req = {
            body: {
                email,
            }
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setValue(page, selector, 'email')(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });

    it('should pass error for invalid selector', async () => {
        const selector = '#blah';
        const req = {
            body: {
                'blah': 'blah',
            }
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await setValue(page, selector, 'email')(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        // @ts-ignore
        const error = next.mock.calls[0][0] as Error;
        expect(error.message).toBe(`${selector} not found in page at ${API_URL}/`);
    });

});

describe('closeModal middleware', () => {
    beforeAll(async () => {
        const url = `${API_URL}/Account/Register`;
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await goTo(page, url)(req, res, next);
    }, NAVIGATION_TIMEOUT);

    it('should close modal', async () => {
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await closeModal(page)(req, res, next);
        // await page.waitForTimeout(2000);
        expect(next).toHaveBeenCalledWith();
    });
});

describe('check middleware', () => {
    beforeAll(async () => {
        const url = `${API_URL}/Account/Register`;
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await goTo(page, url)(req, res, next);
        await closeModal(page)(req, res, next);
    }, NAVIGATION_TIMEOUT);

    it('should check valid selector', async () => {
        const selector = '#PersonalDataAgreement';
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await check(page, selector)(req, res, next);
        await page.waitForTimeout(2000);
        expect(next).toHaveBeenCalledWith();
    });
});

describe('selectByText middleware', () => {
    beforeAll(async () => {
        const url = `${API_URL}/Account/Register`;
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await goTo(page, url)(req, res, next);
        await closeModal(page)(req, res, next);
    }, NAVIGATION_TIMEOUT);

    it('should select valid option', async () => {
        const selector = '#Consulate';
        const consulate = 'option[value="40"]';

        const req = {
            body: {
                consulate,
            }
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await selectByText(page, selector, 'consulate')(req, res, next);
        await page.waitForTimeout(25000);
        expect(next).toHaveBeenCalledWith();
    }, NAVIGATION_TIMEOUT);

    it('should pass error if selector is missing from body', async () => {
        const selector = '#Consulate';

        const req = {
            body: {}
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await selectByText(page, selector, 'consulate')(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        // // @ts-ignore
        // const error = next.mock.calls[0][0] as Error;
        // expect(error.message).toBe(`${selector} not found in request body`);
    });

    it('should pass error if selector is invalid', async () => {
        const selector = '#blah';
        const consulate = 'option[value="40"]';
        const req = {
            body: {
                consulate,
            }
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await selectByText(page, selector, 'consulate')(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        // @ts-ignore
        const error = next.mock.calls[0][0] as Error;
        expect(error.message).toBe(`${selector} not found in page at ${API_URL}/Account/Register`);
    });

    it('should pass error if option is invalid', async () => {
        const selector = '#Consulate';
        const consulate = 'option[value="blah"]';
        const req = {
            body: {
                consulate,
            }
        } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;
        await selectByText(page, selector, 'consulate')(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        // @ts-ignore
        const error = next.mock.calls[0][0] as Error;
        expect(error.message).toBe(`${consulate} not found for element ${selector}`);
    });

});

afterAll(async () => {
    await browser.close();
});