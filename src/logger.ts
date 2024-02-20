import pino from 'pino';
import pinoHttp from 'pino-http';
import { DIRNAME, AWS_REGION, NODE_ENV, LOG_INTERVAL, LOGGROUPNAME, LOGSTREAMNAME } from './config.js';
import pretty from 'pino-pretty';

let logger;

if (NODE_ENV === 'production') {
    const transport = pino.transport({
        target: '@serdnam/pino-cloudwatch-transport',
        options: {
            LOGGROUPNAME,
            LOGSTREAMNAME,
            awsRegion: AWS_REGION,
            interval: LOG_INTERVAL,
        }
    });
    // @ts-ignore
    logger = pino(transport);
} else {
    // @ts-ignore
    const stream = pretty({
        levelFirst: true,
        colorize: true,
    });

    // @ts-ignore
    logger = pino(stream);
}


// @ts-ignore
export const loggerMiddleware = pinoHttp({ logger });



// // @ts-ignore
// export const loggerMiddleware = pinoHttp({ logger });