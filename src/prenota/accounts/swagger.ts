import j2s from 'joi-to-swagger'
import {
    RegisterAccountSchema,
    ConfirmRegistrationSchema,
    ConfirmRegistrationResponseSchema,
    RelocationSchema,
    RelocationResponseSchema,
    ChangePasswordSchema,
    ChangePasswordResponseSchema,
} from './schema.js'

const TAGS = ['Account']

const paths = {
    '/prenota/accounts/register': {
        post: {
            tags: TAGS,
            description: 'Register new account on prenota online',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/registerAccountSchema'
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
                                $ref: '#/components/schemas/confirmRegistrationSchema'
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
    '/prenota/accounts/register/confirm': {
        post: {
            tags: TAGS,
            description: 'Confirm registration',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/confirmRegistrationSchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Registration confirmed',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/confirmRegistrationResponseSchema'
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
    '/prenota/accounts/relocate': {
        post: {
            tags: TAGS,
            description: 'Relocate account',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/relocationSchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Account relocated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/relocationResponseSchema'
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
    '/prenota/accounts/change-password': {
        post: {
            tags: TAGS,
            description: 'Change password',
            security: [
                {
                    jwt: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/changePasswordSchema'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Password changed',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/changePasswordResponseSchema'
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

const schemas = {
    // @ts-ignore
    registerAccountSchema: j2s(RegisterAccountSchema).swagger,
    // @ts-ignore
    confirmRegistrationSchema: j2s(ConfirmRegistrationSchema).swagger,
    // @ts-ignore
    confirmRegistrationResponseSchema: j2s(ConfirmRegistrationResponseSchema).swagger,
    // @ts-ignore
    relocationSchema: j2s(RelocationSchema).swagger,
    // @ts-ignore
    relocationResponseSchema: j2s(RelocationResponseSchema).swagger,
    // @ts-ignore
    changePasswordSchema: j2s(ChangePasswordSchema).swagger,
    // @ts-ignore
    changePasswordResponseSchema: j2s(ChangePasswordResponseSchema).swagger,
}

export default {
    paths,
    schemas,
}