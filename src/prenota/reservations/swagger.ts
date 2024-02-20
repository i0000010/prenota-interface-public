import j2s from 'joi-to-swagger'
import Schemas from './schema.js'
import { formatSchemaName } from '../../formatters.js'

const TAGS = ['Reservations']

const paths = {
    '/prenota/reservations/list': {
        post: {
            tags: TAGS,
            description: 'List confirmed upcoming reservations for an account.',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/retrieveReservationsSchema'
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
                                $ref: '#/components/schemas/retrieveReservationsResponseSchema'
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
    '/prenota/reservations/reserve': {
        post: {
            tags: TAGS,
            description: 'Confirm reservation for an account, for a service, for a timeslot.',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/newReservationSchema'
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
                                $ref: '#/components/schemas/newReservationResponseSchema'
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
    '/prenota/reservations/cancel': {
        post: {
            tags: TAGS,
            description: 'Confirm reservation for an account, for a service, for a timeslot.',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/cancelReservationSchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    // content: {
                    //     'application/json': {
                    //         schema: {
                    //             type: "boolean"
                    //         }
                    //     }
                    // }
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
    '/prenota/reservations/confirm': {
        post: {
            tags: TAGS,
            description: 'Confirm reservation for an account, for a service, for a timeslot.',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/confirmReservationSchema'
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
                                type: "boolean"
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