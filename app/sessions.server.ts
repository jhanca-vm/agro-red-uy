import { createCookieSessionStorage } from 'react-router'

if (!process.env.SECRET) {
  throw new Error('SECRET environment variable is not set')
}

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({ cookie: { secrets: [process.env.SECRET] } })
