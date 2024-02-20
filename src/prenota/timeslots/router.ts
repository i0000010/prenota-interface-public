import express, { Request, Response, NextFunction } from 'express';
import { retrieveTimeslotsController, postTimeslotsController } from './controllers.js';

export const router = express.Router();

router.post('/retrieve-timeslots', retrieveTimeslotsController)
router.post('/post-timeslots', postTimeslotsController)
