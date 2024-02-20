import Joi from 'joi'
import { AdditionalApplicantSchema } from './schema.js'

export const Authorize541Schema = Joi.object({
    // serviceId: Joi.number().default(861),
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(2)
        .valid(1,2),
    // numAdditionalApplicants: Joi.number().valid(1,2)
    additionalApplicants: Joi.array()
        .items(AdditionalApplicantSchema)
        .required(),
    passportNumber: Joi.string()
        .required(),
    otherCitizenships: Joi.string()
        .required(),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    passportExpirationDate: Joi.string()
        .required()
        .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
    address: Joi.string()
        .required(),
    notes: Joi.string()
        .allow(''),
    email: Joi.string()
        .email()
        .required(),
});

export const Authorize1123Schema = Joi.object({
    // serviceId: Joi.number().default(306),
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(1)
        .valid(1),
    notes: Joi.string()
        .allow(''),
    email: Joi.string()
        .email()
        .required(),
    additionalApplicants: Joi.array()
        .items(AdditionalApplicantSchema)
        .required(),
});

export const Authorize4597Schema = Joi.object({
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(2)
        .valid(1,2),
    // numAdditionalApplicants: Joi.number().valid(1,2,3,4)
    notes: Joi.string()
        .allow(''),
    email: Joi.string()
        .email()
        .required(),
    additionalApplicants: Joi.array()
        .items(AdditionalApplicantSchema)
        .required(),
});

export const Authorize226Schema = Joi.object({
    // serviceId: Joi.number().default(306),
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(2)
        .valid(1,2),
    // numAdditionalApplicants: Joi.number().valid(1,2)
    notes: Joi.string()
        .allow(''),
    email: Joi.string()
        .email()
        .required(),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    additionalApplicants: Joi.array()
        .items(AdditionalApplicantSchema)
        .required(),
});   

export const Authorize1248Schema = Joi.object({
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(1)
        .valid(1),
    citizenship: Joi.string().required(),
    passportExpirationDate: Joi.string()
        .required()
        .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
    passportCountry: Joi.string().required(),
    address: Joi.string().required(),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    passportPath: Joi.string().required(),
    notes: Joi.string()
        .allow(''),
    otp: Joi.string()
        .required(),
    email: Joi.string().email().required(),
});

export const Authorize655Schema = Joi.object({
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(1)
        .valid(1),
    passportNumber: Joi.string().required(),
    passportType: Joi.number()
        .required()
        .valid(3,4,5,6),
    passportCountry: Joi.string().required(),
    passportExpirationDate: Joi.string()
        .required()
        // .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
        .pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/), // mm/dd/yyyy
    address: Joi.string().required(),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    notes: Joi.string()
        .allow(''),
    otp: Joi.string()
        .required(),
    email: Joi.string().email().required(),
});

export const Authorize306Schema = Joi.object({
    // serviceId: Joi.number().default(306),
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(1)
        .valid(1),
    notes: Joi.string()
        .allow(''),
    email: Joi.string()
        .email()
        .required(),
});

export const Authorize393Schema = Joi.object({
    // serviceId: Joi.number().default(393),
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(2)
        .valid(1,2),
    // numAdditionalApplicants: Joi.number().valid(1,2)
    notes: Joi.string()
        .allow(''),
    email: Joi.string()
        .email()
        .required(),
});

export const Authorize861Schema = Joi.object({
    // serviceId: Joi.number().default(861),
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(2)
        .valid(1,2),
    // numAdditionalApplicants: Joi.number().valid(1,2)
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    passportExpirationDate: Joi.string()
        .required()
        // .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
        .pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/), // mm/dd/yyyy
    address: Joi.string()
        .required(),
    notes: Joi.string()
        .allow(''),
    otp: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
});

export const Authorize685Schema = Joi.object({
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(1)
        .valid(1),
    passportType: Joi.number()
        .required()
        .valid(3,4,5,6),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    address: Joi.string().required(),
    notes: Joi.string()
        .allow(''),
    email: Joi.string().email().required(),
    proofOfResidencePath: Joi.string().required(),
});

export const Authorize81Schema = Joi.object({
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(1)
        .valid(1),
    passportType: Joi.number()
        .required()
        .valid(3,4,5,6),
    passportNumber: Joi.string().required(),
    passportExpirationDate: Joi.string()
        .required()
        // .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
        .pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/), // mm/dd/yyyy

    address: Joi.string().required(),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    otherCitizenships: Joi.string()
        .required(),
    notes: Joi.string()
        .allow(''),
    email: Joi.string().email().required(),
});
   
export const Authorize82Schema = Joi.object({
    typeofbooking: Joi.number()
        .required()
        .integer()
        .min(1)
        .max(2)
        .valid(1,2),
    // numAdditionalApplicants: Joi.number().valid(1,2)
    passportType: Joi.number()
        .required()
        .valid(3,4,5,6),
    passportNumber: Joi.string().required(),
    passportExpirationDate: Joi.string()
        .required()
        // .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/), //  \d{2}\/\d{2}\/\d{4}$/), // dd/mm/yyyy
        .pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/), // mm/dd/yyyy

    passportCountry: Joi.string().required(),
    address: Joi.string().required(),
    reasonForVisit: Joi.number() // reason for visit
        .required()
        .integer()
        .min(31)
        .max(65)
        .invalid(...Array.from({ length: 20 }, (_, i) => i + 44)),
    otherCitizenships: Joi.string()
        .required(),
    notes: Joi.string()
        .allow(''),
    email: Joi.string().email().required(),
    additionalApplicants: Joi.array()
        .items(AdditionalApplicantSchema)
        .required(),
});



export const AuthorizeServiceResponseSchema = Joi.object({
    serviceId: Joi.number()
        .required()
        .integer()
        .min(1),
    success: Joi.boolean()
        .required(),
});

export default {
    Authorize81Schema,
    Authorize82Schema,
    Authorize685Schema,
    Authorize861Schema,
    Authorize393Schema,
    Authorize306Schema,
    Authorize655Schema,
    Authorize1248Schema,
    Authorize226Schema,
    Authorize4597Schema,
    Authorize1123Schema,
    Authorize541Schema,
    AuthorizeServiceResponseSchema,
}