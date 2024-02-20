import { Router } from 'express'
import PrenotaSchema from '../prenota/swagger.js'
import UtilsSchema from '../utils/swagger.js'
import PublicScema from '../public/swagger.js'
import { API_VERSION, HOST, PORT, HTTP, NODE_ENV } from '../config.js'
import swaggerUi from 'swagger-ui-express';
import {
    ErrorSchema,
} from '../schema.js'
import j2s from 'joi-to-swagger'


const openapi = '3.0.0'
const title = 'Prenota Interface'
const version = API_VERSION
let url = `${HTTP}://${HOST}`
if ( NODE_ENV === 'development') {
    url = url.concat(`:${PORT}`)
}

const description = NODE_ENV

const securitySchemes = {
    jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
}

export const swaggerDoc = {
    openapi,
    info: {
        title,
        version
    },
    servers: [
        {
            url,
            description
        }
    ],
    paths: {
        ...PrenotaSchema.paths,
        ...UtilsSchema.paths,
        ...PublicScema.paths,
    },
    components: {
        securitySchemes,
        schemas: {
            ...PrenotaSchema.schemas,
            ...UtilsSchema.schemas,
            ...PublicScema.schemas,
            // @ts-ignore
            errorSchema: j2s(ErrorSchema).swagger,
        }
    }
}

export const router = Router()
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDoc))
router.get('/schema.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDoc)
})
