
import Joi from 'joi'

export const CalendarAvailabilitySchema = Joi.object({
    serviceId: Joi.number()
        .required()
        .min(1),
    selectedDay: Joi.string()
        .required()
        .pattern(/^\d{4}-\d{2}-\d{2}$/),
    sessionId: Joi.string()
        .required()
        .email(),
});

export const CalendarAvailabilityResponseSchema = Joi.object({
    serviceId: Joi.number()
        .required()
        .integer()
        .min(1),
    dates: Joi.array()
        .items(
            Joi.string()
                .pattern(/^\d{4}-\d{2}-\d{2}$/)
        )
        .required()
        .unique(),
});

export default {
    CalendarAvailabilitySchema,
    CalendarAvailabilityResponseSchema,
}