import * as sentry from '@sentry/node';

import { Context, Next } from 'hono';

sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [],
    tracesSampleRate: 1.0,
})

export const sentryMiddleware = async (c: Context, next: Next) => {
    try {
        await next()
    } catch (error) {
        sentry.captureException(error)
        throw error
    }
}