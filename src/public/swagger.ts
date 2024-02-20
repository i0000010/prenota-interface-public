
import ServicesSchema from './services/swagger.js';

const paths = {
    ...ServicesSchema.paths,
}

const schemas = {
    ...ServicesSchema.schemas,
}

export default {
    paths,
    schemas,
}