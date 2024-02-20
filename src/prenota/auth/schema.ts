import Joi from 'joi'

export const LoginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email(),

    password: Joi.string()
        .required()
        .min(8)
        .max(30)
        .pattern(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/),

    consulateId: Joi.number()
        .required()
        .integer()
        .min(33)
        .max(42),
});

export const LoginResponseSchema = Joi.object({
    sessionId: Joi.string()
        .required()
        .email(),
    success: Joi.boolean()
        .required(),
    consulateId: Joi.number()
        .required()
        .integer()
        .min(33)
        .max(42),
});

export const LogoutSchema = Joi.object({
    sessionId: Joi.string()
        .required()
        .email(),
});

export const AdditionalApplicantSchema = Joi.object({
    surname: Joi.string()
        .required(),
    name: Joi.string()
        .required(),
    birthDate: Joi.string()
    .required()
    .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
});


const imapSchema = Joi.object({
    user: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required(),
    host: Joi.string()
        .required(),
    port: Joi.number()
        .required()
        .integer()
        .positive(),
    tls: Joi.boolean()
        .required(),
    tlsOptions: Joi.object()
        .optional()
});

export const GenerateOTPSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required(),
    serviceId: Joi.number()
        .required()
        .integer()
        .positive(),
    imap: imapSchema
        .required(),
});

export const GenerateOTPResponseSchema = Joi.object({
    otpCode: Joi.string()
        .required()
        .pattern(/^[0-9]{6}$/)
        // .pattern(/^\d+$/)

});

export default {
    LoginSchema,
    LoginResponseSchema,
    LogoutSchema,
    AdditionalApplicantSchema,
    GenerateOTPSchema,
    GenerateOTPResponseSchema,
}

