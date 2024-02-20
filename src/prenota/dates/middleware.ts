import { Request, Response, NextFunction } from 'express'
import { axiosInstance } from '../../utils/axios/index.js'
import { AxiosInstance } from 'axios'
import { API_URL } from '../../config.js'
import { CalendarAvailabilityResponseSchema } from './schema.js'

function formatDate(date: string) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}

export function parseFreeDates(responseData: string, freeDates: string[] = []): string[] {
    const calendarDates = JSON.parse(responseData);

    for (let i = 0; i < calendarDates.length; i++) {
        const calendarDate = calendarDates[i];
        if (calendarDate.SlotLiberi > 0) {
            let freeDate = calendarDate.DateLibere.split(' ')[0];
            freeDates.push(freeDate);
        }
    }
    return freeDates;
}

export function getAvailableDatesForService(axiosInstance: AxiosInstance) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const url = `${API_URL}/BookingCalendar/RetrieveCalendarAvailability`;

        const payload = {
            'selectedDay': req.body.selectedDay,
            '_Servizio': `${req.body.serviceId}`,
        };

        await axiosInstance.post(url, payload)
        .then((response) => {
            const freeDates = parseFreeDates(response.data);
            // convert dates
            for(let i = 0; i < freeDates.length; i++) {
                freeDates[i] = formatDate(freeDates[i]);
            }
            const payload = {
                serviceId: req.body.serviceId,
                dates: freeDates,
            }
            const { error, value } = CalendarAvailabilityResponseSchema.validate(payload);
            if (error) {
                next(error);
            } else {
                res.send(value);
            }
        })
        .catch((err) => {
            next(err);
        });
    }
}