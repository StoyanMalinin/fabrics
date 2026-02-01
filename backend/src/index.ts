import 'dotenv/config' // Load environment variables from .env file
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5
});
const prisma = new PrismaClient({adapter})

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

app.put('/api/user-logged-in', async (c) => {
    const { isAuthenticated } = getAuth(c)
    
    if (!isAuthenticated) { 
        return c.json({ error: 'Not authenticated' }, 401)
    }

    const body = await c.req.json();

    await prisma.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
            where: { id: body.userId }
        });

        if (!user) {
            await tx.user.create({
                data: {
                    id: body.userId,
                    email: body.email
                }
            });
        }
    });

    return c.json({ status: 'ok' });
})

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
