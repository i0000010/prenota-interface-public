import { clearCookies } from './middleware.js'
import { page } from './index.js'
import { Request, Response } from 'express'
import { catchAllErrors } from '../../middleware.js'

export const clearCookiesController = [
    clearCookies(page),
    (req: Request, res: Response) => {
        res.send({ success: true })
    },
    catchAllErrors()
]