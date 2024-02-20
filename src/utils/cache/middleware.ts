import { Session, sessionRepository } from './models/session.js'
import { Request, Response, NextFunction } from 'express'
import { Page } from 'puppeteer'
import { SESSION_TTL } from '../../config.js'



export function cacheSession(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email  = req.body.email;
        // const userAgent = await browser.userAgent();
        const userAgent = await page.evaluate(() => navigator.userAgent);
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
            consulateId: req.body.consulateId,
            
        };

        const entity: Session = await sessionRepository.save(email, session) as Session;
        
        await sessionRepository.expire(email, SESSION_TTL)
            .catch((err: Error) => {
                next(err);
                return
            });
        
        res.locals = res.locals || {};
        res.locals.sessionId = email;
        
        next();
    };
}

export function fetchCachedSession() {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.params === undefined) {
            const err = new Error('req.params is undefined');
            next(err);
            return
        }
        if (req.params.sessionId === undefined) {
            const err = new Error('req.params.sessionId is undefined');
            next(err);
            return
        }
        const sessionId = req.params.sessionId;
        const session: Session = await sessionRepository.fetch(sessionId) as Session;
        res.send(session);
    }
}

export function fetchCachedSessionByConsulateId() {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        const sessions = await sessionRepository.search()
            .where('consulateId').equals(req.params.consulateId)
            .return.all();
        // const session = [];

        // const filteredSessions = sessions.filter((session: Session) => {
        //     const ttl =))
        
        res.send(sessions);
    }
}

export function updateSessionInCache(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const sessionId = req.body.email;
        const cookies = await page.cookies();
        const cookieString = JSON.stringify(cookies);
        const session: Session = await sessionRepository.fetch(sessionId) as Session;
        session.cookies = cookieString;
        await sessionRepository.save(sessionId,session);
        next();
    };
}

export function removeSessionFromCache() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const sessionId = req.body.sessionId;
        await sessionRepository.remove(sessionId);
        next();
    };
}

export function setPageSession(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        const session: Session = await sessionRepository.fetch(email) as Session;
        if (!session.cookies) {
            const error = new Error(`Session for ${email} not found in redis`);
            next(error);
        } else {
            const cookies = JSON.parse(session.cookies);
            await page.setCookie(...cookies);
            next();
        }
    }
}

export function getSession() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { sessionId } = req.params
        const session: Session = await sessionRepository.fetch(sessionId) as Session;
        if (!session.cookies) {
            const error = new Error(`Session for ${sessionId} not found in redis`);
            next(error);
        } else {
            res.send(session);
        }
    }
}