import express from 'express'
import { router as servicesRouter } from './services/router.js'

export const router = express.Router()
router.use('/services', servicesRouter)


