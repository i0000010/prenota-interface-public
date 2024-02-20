import Joi from 'joi'

const ImapSchema = Joi.object({
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

// register account request
export const RegisterAccountSchema = Joi.object({
    name: Joi.string()
        .required(),
    surname: Joi.string()
        .required(),
    birthPlace: Joi.string()
        .required(),
    birthDate: Joi.string()
        .required()
        .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .pattern(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/),
    address: Joi.string()
        .required(),
    cap: Joi.string()
        .required(),
    town: Joi.string()
        .required(),
    nation: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(245),
    prefix: Joi.number()
        .required()
        .integer()
        .min(1),
    phoneNumber: Joi.string()
        .required()
        .pattern(/^\d{9,10}$/),
    consulate: Joi.number()
        .required()
        .integer()
        .min(1),
    imap: ImapSchema
        .required(),
});   

// register account response and confirm requestion request
export const ConfirmRegistrationSchema = Joi.object({
    link: Joi.string()
        .required()
        .uri(),
});

// register account response
export const ConfirmRegistrationResponseSchema = Joi.object({
    success: Joi.boolean()
        .required(),
});

// relocate request
export const RelocationSchema = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    IDUtente: Joi.number()
        .required() // user id is always 0 as far as I can tell
        .valid(0),
    IDPaese: Joi.number()
        .required() // country id 230 is usa
        .min(1),
    IDSede: Joi.number()
        .required() // location id
        .min(1),
});

// relocate response
export const RelocationResponseSchema = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    IDUtente: Joi.number()
        .required()
        .integer()
        .valid(0),
    IDPaese: Joi.number()
        .required()
        .integer()
        .min(1),
    IDSede: Joi.number()
        .required()
        .integer()
        .min(1),
    success: Joi.boolean()
        .required(),
});

export const ChangePasswordSchema = Joi.object({
    imap: ImapSchema
        .required(),
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .pattern(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)
})

export const ChangePasswordResponseSchema = Joi.object({
    link: Joi.string()  
        .required()
        .uri()
})