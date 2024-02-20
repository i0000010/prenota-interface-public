import { Schema, Repository } from 'redis-om'
import { redisClient } from '../index.js'

const sessionSchema = new Schema('session', {
    email: { type: 'string' },
    userAgent: { type: 'string' },
    cookies: { type: 'string' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
    consulateId: { type: 'number'},
})

export const sessionRepository = new Repository(sessionSchema, redisClient);

await sessionRepository.createIndex();

export type Session = {
    email: string;
    userAgent: string;
    cookies: string;
    createdAt: Date;
    updatedAt: Date;
    consulateId: number;
}