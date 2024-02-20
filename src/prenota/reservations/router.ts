import express from 'express';
import { retrieveReservationsController, reserveTimeslotController, cancelReservationController, confirmReservationController } from './controllers.js';

export const router = express.Router();

router.post('/list', retrieveReservationsController)
router.post('/reserve', reserveTimeslotController)
router.post('/cancel', cancelReservationController)
router.post('/confirm', confirmReservationController)

