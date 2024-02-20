import { Request, Response, NextFunction } from 'express'
import { Page } from 'puppeteer'
import { API_URL, NAVIGATION_TIMEOUT } from '../../config.js'
import { AxiosInstance } from 'axios'
import Joi from 'joi'

export function requireLoggedIn(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const url =`${API_URL}/UserArea`;
        const go = await page.goto(url, { timeout: NAVIGATION_TIMEOUT })
            .then((_response) => {
                return true
            })
            .catch((err) => {
                next(err);
                return false
            });
        if (!go) {return}

        const responseUrl = page.url();
        if (responseUrl === url) {
            next();
        } else {
            const error = new Error(`Authentication failed for ${req.body.email} ${req.body.password}. ${responseUrl} !== ${url}`);
            next(error);
        }
    };
}

export function requiredAxiosLoggedIn(axiosInstance: AxiosInstance) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const url =`${API_URL}/Reservation/RetrieveReservations`;
        const response = await axiosInstance.get(url);
        if (response.data !== undefined && Array.isArray(response.data)) {
            next();
        } else {
            const error = new Error(`Unauthorized for ${req.body.sessionId}`);
            next(error);
        }
    }
}


export function requireAuthorizationForService(axiosInstance: AxiosInstance) {
    return async (req: Request, res: Response, next: NextFunction) => {

        const url =`${API_URL}/BookingCalendar/RetrieveCalendarAvailability`;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toLocaleDateString('it-IT');
        const payload = {
            'selectedDay': tomorrowString,
            '_servizio': req.body.serviceId,
        };
        await axiosInstance.post(url, payload)
        .then((response) => {
            try {
                JSON.parse(response.data)
                next();
            } catch (err) {
                const error = new Error(`Unauthorized for service ${req.body.serviceId}`);
                next(error);
            }
        })
        .catch((err) => {
            next(err);
        })

    }
}    

export function authorizedForService(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const url =`${API_URL}/BookingCalendar`;
        await page.goto(url, { timeout: NAVIGATION_TIMEOUT });
        const responseUrl = page.url();
        if (responseUrl === url) {
            next();
        } else {
            const error = new Error(`Authorization for service ${req.body.serviceId} failed for ${req.body.email}`);
            next(error);
        }
    }
}

export function validateAuthenticationForService(page: Page, serviceId: number = null) {
    return (req: Request, res: Response, next: NextFunction) => {
        serviceId = serviceId === null ? req.body.serviceId : serviceId;
        const url = page.url();
        if (url !== `${API_URL}/Services/Booking/${serviceId}`) {
            const error = new Error(`Authentication for service ${serviceId} failed for ${req.body.email}. ${url} !== ${API_URL}/Services/Booking/${serviceId}`);
            next(error);
        } else {
            next();
        }
    }
}

export function serviceRouteController(findId: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const serviceId = req.params.serviceId;
        if (!serviceId) {
            const error = new Error(`Missing: serviceId path param`);
            next(error);
        } else if (serviceId !== findId.toString()) {
            next('route');
        } else {
            next();
        }
    }
}

export function validateAndSendResponseSchema(schema: Joi.ObjectSchema, payload: object) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(payload);
        if (error) {
            next(error);
        } else {
            res.send(value);
        }
    }
}