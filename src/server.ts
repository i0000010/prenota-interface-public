import { app } from './index.js'
import { PORT, PRIVKEY, FULLCHAIN } from './config.js'
import https from 'https'
import http from 'http'
import fs from 'fs'


if (process.env.NODE_ENV === 'production') {
    const server = https.createServer({
        key: fs.readFileSync(PRIVKEY),
        cert: fs.readFileSync(FULLCHAIN),
    }, app)

    server.listen(PORT, () => {
        console.log(`HTTPS Server running on ${PORT}`)
    })
} else {
    const server = http.createServer(app)

    server.listen(PORT, () => {
        console.log(`HTTP Server running on ${PORT}`)
    })
}
