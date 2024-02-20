import express, { Request, Response, NextFunction } from 'express'
import { calendarAvailabilityController } from './controllers.js'

export const router = express.Router();

router.post('/retrieve-calendar-availability', calendarAvailabilityController)
