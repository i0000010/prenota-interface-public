import j2s from 'joi-to-swagger'
import Schemas from './schema.js'
import { formatSchemaName } from '../../formatters.js'

const TAGS = ['Dates']

const paths = {
    '/prenota/dates/retrieve-calendar-availability': {
        post: {
            tags: TAGS,
            description: 'Retrieve available dates for a service',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/calendarAvailabilitySchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/calendarAvailabilityResponseSchema'
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid request',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/errorSchema'
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/errorSchema'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/errorSchema'
                            }
                        }
                    }
                }
            }
        }
    }
}

const schemas = {}
for (const [key,value] of Object.entries(Schemas)) {
    // @ts-ignore
    schemas[formatSchemaName(key)] = j2s(value).swagger
}

export default {
    paths,
    schemas
}