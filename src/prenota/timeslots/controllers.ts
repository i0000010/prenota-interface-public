import { catchAllErrors, validateSchema } from "../../middleware.js";
import { setAxiosSession } from "../../utils/axios/middleware.js";
import { axiosInstance } from "../../utils/axios/index.js";
import { TimeslotsSchema, TimeslotsResponseSchema } from "./schema.js";
import { requireAuthorizationForService } from "../auth/middleware.js";
import { retrieveTimeslotsOnMultipleDates } from "./middleware.js";
import { Request, Response, NextFunction } from "express";
import { timeslotsRepository } from "./models/timeslot.js";

export const retrieveTimeslotsController = [
    validateSchema(TimeslotsSchema),
    setAxiosSession(axiosInstance),
    requireAuthorizationForService(axiosInstance),
    retrieveTimeslotsOnMultipleDates(axiosInstance),
    catchAllErrors(),
]

export const postTimeslotsController = [
    validateSchema(TimeslotsResponseSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        interface Timeslot {
            idCalendarioGiornaliero: number,
            selectedDay: string,
            selectedHour: string,
        }

        const timeslots = {
            serviceId: req.body.serviceId,
            timeslots: req.body.timeslots.map((timeslot: Timeslot) => {
                return JSON.stringify({
                    idCalendarioGiornaliero: timeslot.idCalendarioGiornaliero,
                    selectedDay: timeslot.selectedDay,
                    selectedHour: timeslot.selectedHour,
                })
            }),
        }

        await timeslotsRepository.save(`${req.body.serviceId}`, timeslots)
            .catch((err: Error) => {
                next(err);
                return
            });
        
        await timeslotsRepository.expire(`${req.body.serviceId}`, 60 * 10)

        res.send(true);

    },
    catchAllErrors(),
]