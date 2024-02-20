import Joi from 'joi'

export const GenerateOTPResponseSchema = Joi.object({
    otpCode: Joi.string()
        .required()
        .pattern(/^[0-9]{6}$/)
        // .pattern(/^\d+$/)

});