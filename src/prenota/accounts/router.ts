import { Router } from 'express'
import {
    registerAccountController,
    confirmAccountRegistrationController,
    relocateController,
    changePasswordController,
} from './controllers.js'

export const router = Router()

router.post('/register', registerAccountController)
router.post('/register/confirm', confirmAccountRegistrationController)
router.post('/relocate', relocateController)
router.post('/change-password', changePasswordController)