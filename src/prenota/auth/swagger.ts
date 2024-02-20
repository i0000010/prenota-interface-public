import j2s from 'joi-to-swagger'
import Schemas from './schema.js'
import ServiceSchemas from './serviceSchemas.js'
import { formatSchemaName } from '../../formatters.js'

const TAGS = ['Auth']

const serviceSchemas = {}
const serviceSchemaNames = []

for (const [key, value] of Object.entries(ServiceSchemas)) {
    // @ts-ignore
    serviceSchemas[formatSchemaName(key)] = j2s(value).swagger

    const name = `#/components/schemas/${formatSchemaName(key)}`
    serviceSchemaNames.push({ '$ref': name })
}

const schemas = {
    ...serviceSchemas,
}
for (const [key, value] of Object.entries(Schemas)) {
    // @ts-ignore
    schemas[formatSchemaName(key)] = j2s(value).swagger
}

const paths = {
    '/prenota/auth/is-authenticated': {
        post: {
            tags: TAGS,
            description: 'Check if user is authenticated',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/loginSchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'No error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'boolean'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/errorSchema'
                            }
                        }
                    }
                },
            
            }
        }
    },
    '/prenota/auth/login': {
        post: {
            tags: TAGS,
            description: 'Authorize account on prenota online',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/loginSchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Registration successful',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/loginResponseSchema'
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

    '/prenota/auth/logout': {
        post: {
            tags: TAGS,
            description: 'Clear cookies from cache and browser for user',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/logoutSchema'
                        }
                    }
                }
            },
            responses: {
                "200": {
                    "description": 'OK',
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "boolean"
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

    '/prenota/auth/{serviceId}': {
        post: {
            tags: TAGS,
            description: 'Authorize service for user',
            security: [
                {
                    jwt: []
                }
            ],
            parameters: [
                {
                    name: 'serviceId',
                    in: 'path',
                    description: 'Service ID',
                    required: true,
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            oneOf: serviceSchemaNames
                        }
                    }
                }
            },
            responses: {
                "200": {
                    "description": 'OK',
                    "content": {
                        "application/json": {
                            "schema": {
                                '$ref': '#/components/schemas/authorizeServiceResponseSchema'
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

    '/prenota/auth/generate-otp': {
        post: {
            tags: TAGS,
            description: 'Generate OTP for user',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/generateOTPSchema'
                        }
                    }
                }
            },
            responses: {
                "200": {
                    "description": 'OK',
                    "content": {
                        "application/json": {
                            "schema": {
                                '$ref': '#/components/schemas/generateOTPResponseSchema'
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

export default {
    paths,
    schemas,
}