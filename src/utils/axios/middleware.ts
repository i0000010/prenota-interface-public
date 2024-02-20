import { Request, Response, NextFunction } from 'express'
import { Session, sessionRepository } from '../cache/models/session.js'
import { Protocol } from 'puppeteer-core';
import { AxiosInstance } from 'axios';

export function stringifyCookies(cookies: Protocol.Network.Cookie[]): string {
    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    return cookieString;
};

export function setAxiosSession(axiosInstance: AxiosInstance) {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.body === undefined) {
            const err = new Error('req.body is undefined');
            next(err);
            return
        }
        if (req.body.sessionId === undefined && req.body.email === undefined) {
            const err = new Error('req.body.email is undefined');
            next(err);
            return
        }
        const sessionId = req.body.sessionId || req.body.email;
        const session: Session = await sessionRepository.fetch(sessionId) as Session;
        if (session.cookies === undefined || session.userAgent === undefined) {
            const err = new Error(`session for ${sessionId} not found in cache`);
            next(err);
            return
        }
        // const cookies = JSON.parse(session.cookies);
        let cookies = JSON.parse(session.cookies);

        if (cookies.length === 0) {
            const err = new Error(`${sessionId} cookies are empty`);
            next(err);
            return
        };
        
        const cookieString = stringifyCookies(cookies);
        const userAgent = session.userAgent;
        axiosInstance.defaults.headers.Cookie = cookieString;
        axiosInstance.defaults.headers['User-Agent'] = userAgent;
        next();
    }
}