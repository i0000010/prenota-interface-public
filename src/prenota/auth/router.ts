import { Router } from 'express';
import {
    isAuthenticatedController,
    loginController,
    logoutController,
    generateOTPController,
} from './controllers.js'
import {
    authorizeService541Controller,
    authorizeService1123Controller,
    authorizeService818Controller,
    authorizeService4597Controller,
    authorizeService226Controller,
    authorizeService1248Controller,
    authorizeService655Controller,
    authorizeService694Controller,
    authorizeService306Controller,
    authorizeService392Controller,
    authorizeService393Controller,
    authorizeService861Controller,
    authorizeService863Controller,
    authorizeService685Controller,
    authorizeService81Controller,
    authorizeService82Controller,
} from './serviceControllers.js'

export const router = Router();

router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/is-authenticated', isAuthenticatedController)


router.post('/:serviceId', authorizeService541Controller)
router.post('/:serviceId', authorizeService1123Controller)
router.post('/:serviceId', authorizeService818Controller)
router.post('/:serviceId', authorizeService4597Controller)
router.post('/:serviceId', authorizeService226Controller)
router.post('/:serviceId', authorizeService1248Controller)
router.post('/:serviceId', authorizeService655Controller)
router.post('/:serviceId', authorizeService694Controller)
router.post('/:serviceId', authorizeService306Controller)
router.post('/:serviceId', authorizeService392Controller)
router.post('/:serviceId', authorizeService393Controller)
router.post('/:serviceId', authorizeService861Controller)
router.post('/:serviceId', authorizeService863Controller)
router.post('/:serviceId', authorizeService685Controller)
router.post('/:serviceId', authorizeService81Controller)
router.post('/:serviceId', authorizeService82Controller)

router.post('/generate-otp', generateOTPController)