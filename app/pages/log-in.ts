import { type BinaryLike, scrypt } from 'node:crypto'
import { promisify } from 'node:util'
import { eq } from 'drizzle-orm'
import { data, redirect } from 'react-router'
import db from '~/db'
import users from '~/db/schema/users'
import generateToken from '~/lib/utils/generate-token'
import { commitSession, getSession } from '~/sessions.server'
import type { Route } from './+types/sign-up'

const scryptAsync = promisify<BinaryLike, BinaryLike, number, Buffer>(scrypt)

export function loader() {
  throw data('Not Found', { status: 404 })
}

export async function action({ request }: Route.ActionArgs) {
  const { pathname } = new URL(request.headers.get('Referer') || '/')
  const [formData, session] = await Promise.all([
    request.formData(),
    getSession(request.headers.get('Cookie'))
  ])

  const email = formData.get('email') as string
  const [user] = await db.select().from(users).where(eq(users.email, email))

  if (user) {
    const [salt, derivedKey] = user.password_hash.split(':')
    const password = formData.get('password') as string
    const currentDerivedKey = await scryptAsync(password, salt, 64)

    if (currentDerivedKey.toString('hex') === derivedKey) {
      const token = await generateToken({ id: user.id, email, role: user.role })

      session.set('token', token)

      return redirect(pathname, {
        headers: { 'Set-Cookie': await commitSession(session) }
      })
    }
  }

  return { error: 'Email o contraseña incorrectos' }
}

export default () => null
