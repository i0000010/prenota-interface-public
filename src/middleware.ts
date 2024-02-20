import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export function validateSchema(schema: Joi.ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(error);
        } else {
            next();
        }
    }
}

export function validateQueryParams(schema: Joi.ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.query);
        if (error) {
            next(error);
        } else {
            next();
        }
    }
}

export function validateAndSendResponseSchema(schema: Joi.ObjectSchema, payload: object) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(payload);
        if (error) {
            next(error);
        } else {
            res.send(value);
        }
    }
}

export function getRandomNumber(min:number,max:number):number {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function catchAllErrors() {
    return async (err: Error, req: Request, res: Response, next: NextFunction) => {
        const { message } = err;
        res.status(500).send({status: 500, message});
    };
}