import { Request, Response, NextFunction } from 'express'
import { catchAllErrors } from '../../middleware.js'
import { services } from './services.js'

export const getServicesController = [
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(services)
    },
    catchAllErrors()
]

export const getActiveServicesController = [
    async (req: Request, res: Response, next: NextFunction) => {
        const formattedServices = []
        for (const outer of services) {
            for (const inner of outer.services) {
                formattedServices.push({
                    id: inner.id,
                    service: inner.service,
                    description: inner.description,
                    city: outer.city,
                    state: outer.state,
                    country: outer.country,
                })
            }
        }

        const activeServiceIds = [655, 694, 861, 82, 81, 226, 685, 306, 392, 393]
        const activeServices = formattedServices.filter(service => activeServiceIds.includes(service.id))

        res.send(activeServices)
    },
    catchAllErrors()
]

export const getServiceController = [
    async (req: Request, res: Response, next: NextFunction) => {
        const { serviceId } = req.params

        const formattedServices = []
        for (const outer of services) {
            for (const inner of outer.services) {
                formattedServices.push({
                    id: inner.id,
                    service: inner.service,
                    description: inner.description,
                    city: outer.city,
                    state: outer.state,
                    country: outer.country,
                })
            }
        }
        const service = formattedServices.find(service => service.id === parseInt(serviceId))

        res.send(service)
    },
    catchAllErrors()
]