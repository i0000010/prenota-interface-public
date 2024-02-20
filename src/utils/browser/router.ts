import { Router } from 'express'
import { clearCookiesController } from './controllers.js'

export const router = Router()
router.get('/clear-cookies', clearCookiesController)