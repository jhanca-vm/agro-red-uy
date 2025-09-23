import { drizzle } from 'drizzle-orm/mysql2'

const url = process.env.DATABASE_URL

if (!url) throw new Error('DATABASE_URL environment variable is not defined')

export default drizzle(url)
