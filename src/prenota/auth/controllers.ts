import { Request, Response, NextFunction } from 'express'
import { requireLoggedIn } from './middleware.js'
import { goTo, wait, click, setValue, clearCookies } from '../../utils/browser/middleware.js'
import { page } from '../../utils/browser/index.js'
import { axiosInstance } from '../../utils/axios/index.js'
import { cacheSession, removeSessionFromCache, setPageSession} from '../../utils/cache/middleware.js'
import { LoginSchema, LoginResponseSchema, LogoutSchema } from './schema.js'
import { catchAllErrors, validateSchema } from '../../middleware.js'
import { getRandomNumber } from '../../middleware.js'
import { API_URL, NAVIGATION_TIMEOUT } from '../../config.js'
import { GenerateOTPSchema } from './schema.js'
import { connectMailbox, waitForOTP } from '../../utils/mail/middleware.js'

export const isAuthenticatedController = [
    validateSchema(LoginSchema),
    setPageSession(page),
    requireLoggedIn(page),
    (req: Request, res: Response) => {
        res.send(true);
    },
    catchAllErrors(),
]
        

export const loginController = [
    validateSchema(LoginSchema),
    goTo(page, API_URL),
    // clearCookies(page),
    wait(page, getRandomNumber(500,1000)),
    setValue(page, '#login-email', 'email'),
    wait(page, getRandomNumber(500, 1000)),
    setValue(page, '#login-password', 'password'),
    wait(page, getRandomNumber(500, 1000)),
    click(page, '.button.button'),
    wait(page, getRandomNumber(500, 1000)),
    requireLoggedIn(page),
    cacheSession(page),
    clearCookies(page),
    (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            sessionId: res.locals.sessionId,
            consulateId: req.body.consulateId,
            success: true,
        };
        const { error, value } = LoginResponseSchema.validate(payload);
        if (error) {
            next(error);
        } else {
            res.send(value);
        }
    },
    catchAllErrors(),
]

export const logoutController = [
    validateSchema(LogoutSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        // remove all cookies from browser
            const cookies = await page.cookies();
            await page.deleteCookie(...cookies);
            res.locals.sessionId = req.body.sessionId;
            next();

        // remove all cookies from axios instance
            axiosInstance.defaults.headers.common['Cookie'] = '';

        } catch (error) {
            next(error);
        }
    },
    removeSessionFromCache(),
    (req: Request, res: Response) => {
        res.send({ success: true });
    },
    catchAllErrors(),    
]

export const generateOTPController = [
    validateSchema(GenerateOTPSchema),
    connectMailbox(),
    clearCookies(page),
    setPageSession(page),
    requireLoggedIn(page),
    async (req: Request, res: Response, next: NextFunction) => {
        await page.goto(`${API_URL}/Services/Booking/${req.body.serviceId}`, { timeout: NAVIGATION_TIMEOUT })
            .then(() => {
                next();
            })
            .catch((err: Error) => {
                const error = new Error('wtf');
                next(error);
                // next(err);
            });
    },
    // goTo(page, `${API_URL}/Services/Booking/${req.body.serviceId}`),
    wait(page, getRandomNumber(500, 1000)),
    // validateAuthenticationForService(page),
    click(page, '#otp-send'),
    waitForOTP(),
    (req: Request , res: Response, next: NextFunction) => {
        res.locals.imap.destroy();
        res.send({ otpCode: res.locals.otpCode });
    },
    catchAllErrors(),
]