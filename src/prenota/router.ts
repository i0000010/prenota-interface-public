import express from 'express'
import { router as accountsRouter } from './accounts/router.js'
import { router as timeslotsRouter } from './timeslots/router.js'
import { router as datesRouter } from './dates/router.js'
import { router as reservationsRouter } from './reservations/router.js'
import { router as authRouter } from './auth/router.js'

export const router = express.Router()
router.use('/accounts', accountsRouter)
router.use('/auth', authRouter)
router.use('/dates', datesRouter)
router.use('/timeslots', timeslotsRouter)
router.use('/reservations', reservationsRouter)

