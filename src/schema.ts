import Joi from 'joi'

export const ErrorSchema = Joi.object({
    status: Joi.number().required(),
    message: Joi.string().required(),

})

