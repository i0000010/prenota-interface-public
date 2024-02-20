import j2s from 'joi-to-swagger';
import Schemas from './schema.js';
import { formatSchemaName } from '../../formatters.js';

const TAGS = ['Services']

const paths = {
    // '/public/services': {
    //     get: {
    //         tags: TAGS,
    //         description: 'List all services.',
    //         responses: {
    //             200: {
    //                 description: 'Success',
    //                 content: {
    //                     'application/json': {
    //                         schema: {
    //                             type: 'array',
    //                             items: {
    //                                 $ref: '#/components/schemas/serviceSchema'
    //                             }
    //                         }
    //                     }
    //                 }
    //             },
    //             500: {
    //                 description: 'Internal server error',
    //                 content: {
    //                     'application/json': {
    //                         schema: {
    //                             $ref: '#/components/schemas/errorSchema'
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // },
    '/public/services/{serviceId}': {
        get: {
            tags: TAGS,
            description: 'List active services.',
            parameters: [
                {
                    name: 'serviceId',
                    in: 'path',
                    description: 'ID of service to return',
                    required: true,
                    schema: {
                        type: 'integer',
                        format: 'int64'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/activeServiceSchema'
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
    '/public/services/active': {
        get: {
            tags: TAGS,
            description: 'List active services.',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/activeServiceSchema'
                                }
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