import { Request, Response, NextFunction } from "express";
import { catchAllErrors, validateSchema } from "../../middleware.js";
import { setAxiosSession } from "../../utils/axios/middleware.js";
import { axiosInstance } from "../../utils/axios/index.js";
import { RetrieveReservationsSchema, RetrieveReservationsResponseSchema, NewReservationSchema, NewReservationResponseSchema, CancelReservationSchema, ConfirmReservationSchema } from "./schema.js";
import { requireAuthorizationForService, requiredAxiosLoggedIn } from "../auth/middleware.js";

export const retrieveReservationsController = [
    validateSchema(RetrieveReservationsSchema),
    setAxiosSession(axiosInstance),
    requiredAxiosLoggedIn(axiosInstance),
    async (req: Request, res: Response, next: NextFunction) => {
        const url = `/Reservation/RetrieveReservations`;
        await axiosInstance.get(url)
        .then((response) => {
            // filter out the ones that are not confirmed
            response.data = response.data.filter((reservation: any) => reservation.isExpired === false);
            
            const reservations = response.data;
            reservations.forEach((reservation: any) => {
                const { error, value } = RetrieveReservationsResponseSchema.validate(reservation);
                if (error) {
                    next(error);
                    return;
                }
            });
            res.send(reservations);
        })
        .catch((error) => {
            next(error);
        });
    },
    catchAllErrors()
];

export const reserveTimeslotController = [
    validateSchema(NewReservationSchema),
    setAxiosSession(axiosInstance),
    requireAuthorizationForService(axiosInstance),
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idCalendarioGiornaliero: req.body.idCalendarioGiornaliero,
            selectedDay: req.body.selectedDay,
            selectedHour: req.body.selectedHour,
        };
        await axiosInstance.post('/BookingCalendar/InsertNewBooking', payload)
        .then((response) => {
            if (response.data.result !== undefined && response.data.result === "RedirectWithNoMessage" && response.data.url !== undefined) {
                const [head,_tail] = response.data.url.split('?');
                const parts = head.split('/');
                const bookingId = parts[parts.length - 1];
                const payload = {
                    bookingId: bookingId,
                    email: req.body.sessionId,
                    serviceId: req.body.serviceId,
                    success: true
                };
                const { error, value } = NewReservationResponseSchema.validate(payload);
                if (error) {
                    next(new Error('Failure 1'));
                    next(error);
                } else {
                    res.send(value);
                }
            } else {
                // const error = new Error('Failed to book appointment');
                next(new Error("Failure 2"));
                // next(error);
            }
        })
        .catch((error) => {
            // next(new Error(JSON.stringify(error.response.headers)));
            // next(error);
            next(new Error("Failure 3"));
        });
    },
    catchAllErrors()
];

export const cancelReservationController = [
    validateSchema(CancelReservationSchema),
    setAxiosSession(axiosInstance),
    requiredAxiosLoggedIn(axiosInstance),
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idPren: req.body.bookingId,
            isConfirmed: req.body.isConfirmed,
        };

        await axiosInstance.post('/Reservation/ManageAppointmentEvent', payload)
        .then((_response) => {
            next();
        })
        .catch((error) => {
            next(error);
        });
    },
    async (req: Request, res: Response, next: NextFunction) => {
        const url = '/Reservation/RetrieveReservations';
        await axiosInstance.get(url)
        .then((response) => {
            // filter out the ones that are not confirmed
            response.data = response.data.filter((reservation: any) => reservation.isExpired === false);

            // filter out the ones that have IDPrenotazione === req.body.bookingId
            response.data = response.data.filter((reservation: any) => reservation.IDPrenotazione !== req.body.bookingId);

            if (response.data.length === 0) {
                // success
                res.send(true);
            } else {
                // failure
                res.send(false);
            }
        })
        .catch((error) => {
            next(error);
        });
    },
    catchAllErrors(),
]

export const confirmReservationController = [
    validateSchema(ConfirmReservationSchema),
    setAxiosSession(axiosInstance),
    requiredAxiosLoggedIn(axiosInstance),
    async (req: Request, res: Response, next: NextFunction) => {
        const url = '/Reservation/ManageAppointmentEvent';
        const payload = {
            idPren: req.body.bookingId,
            isConfirmed: req.body.isConfirmed,
        };
        await axiosInstance.post(url, payload)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            next(error);
        })
    },
    catchAllErrors(),
]