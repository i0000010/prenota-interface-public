import j2s from 'joi-to-swagger'
import Schemas from './schema.js'
import { formatSchemaName } from '../../formatters.js'

const TAGS = ['Timeslots']

const paths = {
    '/prenota/timeslots/retrieve-timeslots': {
        post: {
            tags: TAGS,
            description: 'Retrieve available timeslots on an array of given dates for a service',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/timeslotsSchema'
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
                                $ref: '#/components/schemas/timeslotsResponseSchema'
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
    },
    '/prenota/timeslots/post-timeslots': {
        post: {
            tags: TAGS,
            description: 'Post timeslots to a service',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/timeslotsResponseSchema'
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
                                type: 'boolean'
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