import express from 'express'
import { loggerMiddleware } from './logger.js'
import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET, JWT_SUBJECT, NODE_ENV } from './config.js'
import { router as swaggerRouter } from './docs/swagger.js'
import { router as prenotaRouter } from './prenota/router.js'
import { router as utilsRouter } from './utils/router.js'
import { router as publicRouter } from './public/router.js'
import cors from 'cors'
import { all } from 'axios'
import helmet from 'helmet'

const app = express()
app.use(helmet())
app.disable('x-powered-by')

const allowedOrigins = ['http://localhost:5173', 'https://supervisa.io', 'https://www.supervisa.io',]
app.use(cors({
    origin: allowedOrigins,
}))

app.use(express.json())
app.use(loggerMiddleware)
app.use('/docs', swaggerRouter)
app.use('/public', publicRouter)


if (NODE_ENV === 'production') {
    // jwt auth strategy
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
    }

    passport.use(
        new JWTStrategy(jwtOptions, async (payload, done) => {
            const subject = payload.sub
            if (subject === JWT_SUBJECT) {
                return done(null, subject)
            } else {
                return done(null, false)
            }
        })
    )

    app.use(passport.initialize())
    app.use(passport.authenticate('jwt', { session: false }))
}


app.use('/prenota', prenotaRouter)
app.use('/utils', utilsRouter)




export { app }
