import { Router } from 'express'
import { getSession } from './middleware.js'
import { catchAllErrors } from '../../middleware.js'

export const router = Router()
router.get('/session/:sessionId',
    getSession(),
    catchAllErrors(),
)
