import { Schema, Repository } from 'redis-om';
import { redisClient } from '../../../utils/cache/index.js'

const timeslotsSchema = new Schema('timeslots', {
    serviceId: { type: 'number' },
    timeslots: { type: 'string[]' },
});

export const timeslotsRepository: Repository = new Repository(timeslotsSchema, redisClient);

// await timeslotRepository.createIndex();
await timeslotsRepository.createIndex();

export type Timeslot = {
    // serviceId: number;
    idCalendarioGiornaliero: number;
    selectedDay: string;
    selectedHour: string;
};

export type Timeslots = {
    timeslots: Timeslot[];
}