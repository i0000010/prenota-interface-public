import { CalendarAvailabilitySchema } from './schema.js'
import { axiosInstance } from '../../utils/axios/index.js'
import { setAxiosSession } from '../../utils/axios/middleware.js'
import { catchAllErrors, validateSchema } from '../../middleware.js'
import { requireAuthorizationForService } from '../auth/middleware.js'
import { getAvailableDatesForService } from './middleware.js'

export const calendarAvailabilityController = [
    validateSchema(CalendarAvailabilitySchema),
    setAxiosSession(axiosInstance),
    requireAuthorizationForService(axiosInstance),
    getAvailableDatesForService(axiosInstance),
    catchAllErrors(),
]