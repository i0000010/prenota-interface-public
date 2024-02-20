interface IInfo {
    description: string
    version: string
    title: string
}

interface IServer {
    url: string
    description: string
}

interface IParameter {
    name: string
    in: string
    required: boolean
    schema: {
        type: string
    }
}

interface IRef {
    $ref: string
}

interface IOneOf {
    oneOf: IRef[]
}
interface IRequestBody {
    description: string
    content: {
        [content: string]: {
            schema: IRef | IOneOf
        }
    }
    required: boolean
}

interface IResponse {
    description: string
    content: {
        [content: string]: {
            schema: IRef | IOneOf
        }
    }
}

interface IResponses {
    [response: string]: IResponse
}

interface IPath {
    [path: string]: {
        [method: string]: {
            tags: string[]
            description: string
            parameters: IParameter[]
            requestBody: IRequestBody,
            responses: IResponses,
            security: {
                [security: string]: string[]
            }[]
        }
    }
}

interface ISecuritySchemes {
    [securityScheme: string]: {
        type: string
        scheme: string
        bearerFormat: string
    }
}

interface IComponents {
    schemas: {
        [schema: string]: {
            type: string
            properties: {
                [property: string]: any
            }
        }
    }
    securitySchemes: ISecuritySchemes
}


interface ISchema {
    openapi: string
    info: IInfo
    servers: IServer[]
    paths: IPath
    components: IComponents
}


export class Schema {
    private _schema: ISchema

    constructor() {
        this._schema = {
            openapi: '3.0.0',
            info: {
                description: 'Prenota Interface',
                version: '1.0.0',
                title: 'Prenota Interface',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server',
                }
            ],
            paths: {},
            components: {
                schemas: {},
                securitySchemes: {},
            }
        }
    }

    public get schema(): ISchema {
        return this._schema
    }

    public set schema(schema: ISchema) {
        this._schema = schema
    }

    public addPath(path: string, method: string, tags: string[], description: string, parameters: IParameter[], requestBody: IRequestBody, responses: IResponses, security: { [security: string]: string[] }[]) {
        if (this._schema.paths[path] !== undefined) {
            path[method] = {
                tags,
                description,
                parameters,
                requestBody,
                responses,
                security,
            }
        } else {
            this._schema.paths[path] = {
                [method]: {
                    tags,
                    description,
                    parameters,
                    requestBody,
                    responses,
                    security,
                }
            }
        }
    }

    public addSchema(schema: string, type: string, properties: { [property: string]: any }) {
        this._schema.components.schemas[schema] = {
            type,
            properties,
        }
    }

    public addSecurityScheme(securityScheme: string, type: string, scheme: string, bearerFormat: string) {
        this._schema.components.securitySchemes[securityScheme] = {
            type,
            scheme,
            bearerFormat,
        }
    }

    public use(subPath: string, schema: Schema) {
        this._schema.components.schemas = {
            ...this._schema.components.schemas,
            ...schema.schema.components.schemas,
        }
        this._schema.components.securitySchemes = {
            ...this._schema.components.securitySchemes,
            ...schema.schema.components.securitySchemes,
        }            

        const paths = schema.schema.paths
        for (const path in paths) {
            const fullPath = `${subPath}${path}`
            this._schema.paths[fullPath] = paths[path]
        }
    }
}