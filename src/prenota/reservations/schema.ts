import Joi from 'joi'

export const RetrieveReservationsSchema = Joi.object({
    sessionId: Joi.string()
        .required()
        .email(),
});

export const RetrieveReservationsResponseSchema = Joi.object({
    IDPrenotazione: Joi.number()
        .required()
        .integer()
        .positive(),
    isExpired: Joi.boolean()
        .required(),
    isAvailable: Joi.boolean()
        .required(),
    CodicePrenotazione: Joi.string()
        .required(),
    ServizioConsolare: Joi.string()
        .required(),
    DescrizioneServizio: Joi.string()
        .required(),
    DataPrenotazione: Joi.string()
        .required(),
    DataPrenotazioneOrdine: Joi.string()
        .required(),
    OraPrenotazione: Joi.string()
        .required(),
    IDTipoStatoPrenotazione: Joi.number()
        .integer()
        .positive()
        .required(),
    StatoPrenotazione: Joi.string()
        .required(),
    StatoPrenotazioneOrdine: Joi.string()
        .required(),
    isAnnullabile: Joi.boolean()
        .required(),
    isLavorata: Joi.boolean()
        .required(),
    NomeRichiedente: Joi.string()
        .required(),
    isContoTerzi: Joi.boolean()
        .required(),
});

export const NewReservationSchema = Joi.object({
    sessionId: Joi.string()
        .required()
        .email(),
    serviceId: Joi.number()
        .required()
        .integer()
        .min(1),
    idCalendarioGiornaliero: Joi.number()
        .integer()
        .required()
        .min(0),
    selectedDay: Joi.string()
        .required()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),
    selectedHour: Joi.string()
        .required()
        .pattern(/^\d{2}:\d{2}\s-\s\d{2}:\d{2}$/)
});

export const NewReservationResponseSchema = Joi.object({
    bookingId: Joi.number()
        .required()
        .integer()
        .min(1),
    email: Joi.string()
        .required()
        .email(),
    serviceId: Joi.number()
        .required()
        .integer()
        .min(1),
    success: Joi.boolean()
        .required(),
});

export const CancelReservationSchema = Joi.object({
    sessionId: Joi.string()
        .required()
        .email(),
    bookingId: Joi.number()
        .required()
        .integer()
        .min(1),
    isConfirmed: Joi.boolean()
        .default(false)
        .valid(false),
});

export const ConfirmReservationSchema = Joi.object({
    isConfirmed: Joi.boolean()
        .default(true)
        .valid(true),
    bookingId: Joi.number()
        .required()
        .integer()
        .min(1),
    sessionId: Joi.string()
        .required()
        .email(),
});

export default {
    RetrieveReservationsSchema,
    RetrieveReservationsResponseSchema,
    NewReservationSchema,
    NewReservationResponseSchema,
    CancelReservationSchema,
    ConfirmReservationSchema
}