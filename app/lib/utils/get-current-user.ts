import { type JWTPayload, jwtVerify } from 'jose'
import { getSession } from '~/sessions.server'

interface Payload extends JWTPayload {
  id: number
  email: string
  role: string
}

export default async function getCurrentUser(cookie: string | null) {
  const session = await getSession(cookie)
  const token = session.get('token')

  let data: Payload | undefined

  if (token) {
    const secret = new TextEncoder().encode(process.env.SECRET)
    const result = await jwtVerify<Payload>(token, secret).catch(() => null)

    data = result?.payload
  }

  return { session, data }
}
