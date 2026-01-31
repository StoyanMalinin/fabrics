import 'dotenv/config' // Load environment variables from .env file
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())
app.use('*', clerkMiddleware())

app.get('/', (c) => {
    const res = getAuth(c);
    return c.text('Hello Hono!')
})

app.get('/api/auth-test', (c) => {
    const { isAuthenticated, userId } = getAuth(c)

    if (!isAuthenticated) {
        return c.json({ authenticated: false })
    }

    return c.json({authenticated: true, userId: userId})
})

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
