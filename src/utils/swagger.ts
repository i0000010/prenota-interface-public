import BrowserSchema from './browser/swagger.js'
import CacheSchema from './cache/swagger.js'

const paths = {
    ...BrowserSchema.paths,
    ...CacheSchema.paths,
}
const schemas = {
    ...BrowserSchema.schemas,
}

export default {
    paths,
    schemas,
}