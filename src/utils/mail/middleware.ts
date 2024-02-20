import { Request, Response, NextFunction } from 'express';
import Imap, { Box } from 'imap';
import Message from 'imap';
// @ts-ignore
import mimelib from 'mimelib';
import { GenerateOTPResponseSchema } from './schema.js'
import { load } from 'cheerio';


async function waitForReady(imap: Imap) {
    return new Promise<void>((resolve, reject) => {
        imap.on('error', (err: Error) => {
            reject(err);
        });
        imap.once('ready', () => {
            resolve();
        });
    });
}

async function openInbox(imap: Imap) {
    return new Promise<Box>((resolve, reject) => {
        imap.openBox('INBOX', true, (err: Error, box: Box) => {
            if (err) {
                reject(err);
            } else {
                resolve(box);
            }
        });
    });
}

async function fetchPlainTextBody(imap: Imap, uid: number ): Promise<string> {
    return new Promise( (resolve, reject) => {
        const f = imap.fetch(uid, { bodies: 'TEXT'});
        let buffer = '';

        f.on('message', (msg: Message) => {
            msg.on('body', (stream: any, info: any) => {
                stream.on('data', (chunk: any) => {
                    buffer += chunk.toString('utf8');
                });

                stream.on('data', (chunk: any) => {
                    buffer += chunk.toString('utf8');
                });

                stream.once('error', (err: Error) => {
                    reject(err);
                });

                stream.once('end', () => {

                    const decoded = mimelib.decodeBase64(buffer);
                    resolve(decoded);
                });
            });
        });
    });
}

export function connectMailbox() {
    return async (req: Request, res: Response, next: NextFunction) => {

        const imap = new Imap(req.body.imap);
        
        // imap.once('mail', () => {
        //     const text = await fetchPlainTextBody(res.locals.imap, uid);
        //     const otpCode = text.split('>')[1].split(':')[1];
        //     const { error, value } = generateOTPResponseSchema.validate({ otpCode });
        //     res.locals.imap.end();
        //     if (error) {
        //         next(error);
        //     } else {
        //         console.log({otpCode});
        //         res.locals.otpCode = otpCode;
        //         res.locals.imap.removeAllListeners('mail');
        //         next();
        //         // res.send({otpCode});
        //     }
        // });            

        imap.connect();

        await waitForReady(imap)
            .then(async () => {
                res.locals.imap = imap;
                const inbox: Box = await openInbox(imap)
                    .catch((err: Error) => {
                        console.log('error opening mailbox');
                        next(err);
                    }) as Box;

                res.locals.inbox = inbox;
                next();
            })
            .catch((err: Error) => {
                console.log('error waiting for ready');
                next(err);
            });
    }
}

export function waitForOTP() {
    return async (req: Request, res: Response, next: NextFunction) => {
        // const imap = res.locals.imap;
        // const inbox = res.locals.inbox;
        
        const uid = res.locals.inbox.uidnext;
        res.locals.imap.once('mail', async () => {
            const text = await fetchPlainTextBody(res.locals.imap, uid);
            const otpCode = text.split('>')[1].split(':')[1];
            const { error, value } = GenerateOTPResponseSchema.validate({ otpCode });
            res.locals.imap.end();
            if (error) {
                console.log('error waiting for otp');
                next(error);
            } else {
                console.log({otpCode});
                res.locals.otpCode = otpCode;
                res.locals.imap.removeAllListeners('mail');
                next();
                // res.send({otpCode});
            }
        });
    }
}

export function waitForLink() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const imap = res.locals.imap;
        const inbox = res.locals.inbox;

        const uid = inbox.uidnext;
        imap.on('mail', async () => {
            const text = await fetchPlainTextBody(imap, uid);
            const html = load(text);
            const link = html('a').attr('href');
            res.send({ 
                // success: true,
                link,
            });
        });
    }   
}

export function waitForPasswordResetLink() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const imap = res.locals.imap;
        const inbox = res.locals.inbox;

        const uid = inbox.uidnext;
        imap.on('mail', async () => {
            const text = await fetchPlainTextBody(imap, uid);
            const html = load(text);
            const link = html('a').attr('href');
            console.log('Link: ', link)
            res.locals.resetPasswordLink = link;
            next();
        });
    }   
}