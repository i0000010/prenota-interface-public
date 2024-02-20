import { Schema, Repository } from 'redis-om'
import { redisClient } from '../index.js'

const timeslotsSchema = new Schema('timeslots', {
    serviceId: { type: 'number' },
    timeslots: { type: 'string[]'},
});

export const timeslotsRepository = new Repository(timeslotsSchema, redisClient);

await timeslotsRepository.createIndex();