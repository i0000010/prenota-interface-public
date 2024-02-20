import Joi from 'joi'

const serviceSchema = Joi.object({
    id: Joi.number()
        .integer()
        .required(),
    service: Joi.string()
        .required()
        .valid('Study visas', 'National visas', 'Schengen visas', 'All visas'),
    description: Joi.string()
        .required()
})

export const ServiceSchema = Joi.object({
    id: Joi.number()
        .integer()
        .required()
        .valid(33, 34, 35, 36, 37, 38, 39, 40, 41, 42),
    city: Joi.string()
        .required()
        .valid('Boston', 'Chicago', 'Detroit', 'Philadelphia', 'Houston', 'Los Angeles', 'Miami', 'New York City', 'San Francisco', 'Washington'),
    state: Joi.string()
        .required()
        .valid('MA', 'IL', 'MI', 'PA', 'TX', 'CA', 'FL', 'NY', 'CA', 'DC'),
    country: Joi.object({
        name: Joi.string()
            .required()
            .valid('United States of America'),
        id: Joi.number()
            .integer()
            .required()
            .valid(230),
    }),
    services: Joi.array()
        .items(serviceSchema)
        .required()
})

export const ActiveServiceSchema = Joi.object({
    id: Joi.number()
        .integer()
        .required(),
    service: Joi.string()
        .required()
        .valid('Study visas', 'National visas', 'Schengen visas', 'All visas'),
    description: Joi.string()
        .required(),
    city: Joi.string()
        .required()
        .valid('Boston', 'Chicago', 'Detroit', 'Philadelphia', 'Houston', 'Los Angeles', 'Miami', 'New York City', 'San Francisco', 'Washington'),
    state: Joi.string()
        .required()
        .valid('MA', 'IL', 'MI', 'PA', 'TX', 'CA', 'FL', 'NY', 'CA', 'DC'),
    country: Joi.object({
        name: Joi.string()
            .required()
            .valid('United States of America'),
        id: Joi.number()
            .integer()
            .required()
            .valid(230),
    }),
})

export default {
    ServiceSchema,
    ActiveServiceSchema,
}