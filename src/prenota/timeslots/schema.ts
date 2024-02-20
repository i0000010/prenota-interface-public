import Joi from 'joi'

export const TimeslotsSchema = Joi.object({
    serviceId: Joi.number()
        .required()
        .min(1),
    sessionId: Joi.string().required(),
    dates: Joi.array().items(Joi.string()).required().unique(),
});

const timeslotResponseSchema = Joi.object({
    idCalendarioGiornaliero: Joi.number()
        .required()
        .integer()
        .min(1),
    selectedDay: Joi.string()
        .required()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),
    selectedHour: Joi.string()
        .required()
        .pattern(/^\d{2}:\d{2}\s-\s\d{2}:\d{2}$/),
});

export const TimeslotsResponseSchema = Joi.object({
    serviceId: Joi.number()
        .required()
        .integer()
        .min(1),

    timeslots: Joi.array()
        .items(
            timeslotResponseSchema
        )
        .required()
        .unique(),
});

export default {
    TimeslotsSchema,
    TimeslotsResponseSchema,
}