const TAGS = ['Cache']

const paths = {
    '/utils/cache/session/{sessionId}': {
        get: {
            tags: TAGS,
            description: 'Get session from fache.',
            security: [
                {
                    jwt: []
                }
            ],
            parameters: [
                {
                    name: 'sessionId',
                    in: 'path',
                    description: 'Session id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string"
                                },
                                userAgent: {
                                    type: "string"
                                },
                                cookies: {
                                    type: "string"
                                },
                                createdAt: {
                                    type: "string"
                                },
                                updatedAt: {
                                    type: "string"
                                },
                                consulateId: {
                                    type: "number"
                                }
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

export default {
    paths,
    schemas
}