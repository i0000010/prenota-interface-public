import { Router } from 'express'
import { router as browserRouter } from './browser/router.js'
import { router as cacheRouter } from './cache/router.js'

export const router = Router()
router.use('/browser', browserRouter)
router.use('/cache', cacheRouter)