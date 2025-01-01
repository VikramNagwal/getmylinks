import { createMiddleware } from 'hono/factory'
import { verify, decode } from 'hono/jwt'
import { logger } from '../config/logger'


const authMiddleware = createMiddleware(async (c, next) => {
    try {
        const token = c.req.header('Cookie')?.split(';')[1].split('=')[1]
        console.log(token)
        if (!token) {
            return c.json({ message: "No token provided" }, 401)
        }
        const decoded = decode(token)
        if (!decoded) {
            return c.json({ message: "Invalid token" }, 401)
        }
        console.log(decoded)

       c.set('user', decoded)
        await next()
    } catch (error) {
        console.error(error)
        logger.error(error)
    }
})

export { authMiddleware as jwt}