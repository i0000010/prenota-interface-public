import 'dotenv/config';

export const NAVIGATION_TIMEOUT: number = parseInt(process.env.NAVIGATION_TIMEOUT);
export const HEADLESS: boolean | string = process.env.HEADLESS === "new" ? "new": false;
export const API_URL: string = process.env.API_URL;
export const SESSION_TTL: number = parseInt(process.env.SESSION_TTL);
export const DIRNAME: string = process.env.DIRNAME;
export const REDIS_HOST: string = process.env.REDIS_HOST;
export const REDIS_PORT: number = parseInt(process.env.REDIS_PORT);
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD;
export const JWT_SECRET: string = process.env.JWT_SECRET || '';
export const JWT_SUBJECT: string = process.env.JWT_SUBJECT;
export const HTTP: string = process.env.HTTP;
export const HOST: string = process.env.HOST;
export const PORT: number = parseInt(process.env.PORT);
export const API_VERSION: string = process.env.API_VERSION;
export const AWS_REGION: string = process.env.AWS_REGION;
export const NODE_ENV: string = process.env.NODE_ENV;
export const LOG_INTERVAL: number = parseInt(process.env.LOG_INTERVAL);
export const PRIVKEY: string = process.env.PRIVKEY;
export const FULLCHAIN: string = process.env.FULLCHAIN;
export const LOGGROUPNAME: string = process.env.LOGGROUPNAME || 'prenota-agent-http';
export const LOGSTREAMNAME: string = process.env.LOGSTREAMNAME || 'prenota-agent-http';
export const TIMESLOT_TTL: number = 1500;
export const CHROME_PATH: string = process.env.CHROME_PATH