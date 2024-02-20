import { Request, Response, NextFunction } from 'express'
import { AxiosInstance } from 'axios'
import { API_URL } from '../../config.js'
import { formatDateAsDMY } from '../../formatters.js'
import { TimeslotsResponseSchema } from './schema.js'
// import { Timeslot } from '../interface.js'
import { Timeslot } from './models/timeslot.js'
import { ITimeslot } from '../interface.js'

export function parseFreeTimes(responseData: string, freeTimeSlots: ITimeslot[] = []): ITimeslot[] {
    const timeSlots = JSON.parse(responseData);

    for (let i = 0; i < timeSlots.length; i++) {
        const timeSlot = timeSlots[i];
        if (timeSlot.SlotLiberi > 0) {
            freeTimeSlots.push(timeSlot);
        }
    }
    return freeTimeSlots;
}

function parseTimeslot(timeslot: ITimeslot) {
    const startHour: number = timeslot.OrarioInizioFascia.Hours;
    const startMinute: number = timeslot.OrarioInizioFascia.Minutes;
    const endHour:number = timeslot.OrarioFineFascia.Hours;
    const endMinute:number = timeslot.OrarioFineFascia.Minutes;
    const startTime: string = `${startHour.toString().padStart(2,'0')}:${startMinute.toString().padStart(2,'0')}`;
    const endTime: string = `${endHour.toString().padStart(2,'0')}:${endMinute.toString().padStart(2,'0')}`;

    const dateParts = timeslot.Data.split(' ')[0].split('/');
    const dateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    const convertedTimeslot = {
        idCalendarioGiornaliero: timeslot.IDCalendarioServizioGiornaliero,
        selectedDay: dateString,
        selectedHour: `${startTime} - ${endTime}`,
    };
    return convertedTimeslot;
}

export function retrieveTimeslotsOnMultipleDates(axiosInstance: AxiosInstance) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dates: string[] = req.body.dates;
        const serviceId: string = req.body.serviceId;

        const timeslots: ITimeslot[] = [];

        const url: string = `${API_URL}/BookingCalendar/RetrieveTimeSlots`;

        // Retrieve available timeslots for each date
        let errorCount = 0;
        for(let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const payload = {
                'selectedDay': date,
                'idService': serviceId,
            }
            await axiosInstance.post(url, payload)
                .then((response) => {
                    const timeslotsOnDate: ITimeslot[] = parseFreeTimes(response.data);
                    timeslots.push(...timeslotsOnDate);
                })
                .catch((err) => {
                    errorCount++;
                    next(err);
                    return;
                });
        }

        // format timeslots data field
        timeslots.forEach((timeslot) => {
            const date = timeslot.Data.split(' ')[0];
            const time = timeslot.Data.split(' ')[1];
            timeslot.Data = `${formatDateAsDMY(date)} ${time}`;
        });

        if (errorCount == 0) {
            const convertedTimeslots = timeslots.map((timeslot) => {
                return parseTimeslot(timeslot);
            });
            const payload = {
                serviceId: serviceId,
                timeslots: convertedTimeslots,
            }
            const { error, value } = TimeslotsResponseSchema.validate(payload);
            if (error) {
                next(error);
            } else {
                res.send(value);
            }
        } else {
            const error = new Error('Error retrieving timeslots for one or more dates');
            next(error);
        }
    }
}