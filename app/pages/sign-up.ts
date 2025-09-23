import { data, redirect } from 'react-router'
import db from '~/db'
import users from '~/db/schema/users'
import generateHash from '~/lib/utils/generate-hash'
import generateToken from '~/lib/utils/generate-token'
import getCurrentUser from '~/lib/utils/get-current-user'
import { commitSession } from '~/sessions.server'
import type { Route } from './+types/sign-up'

export function loader() {
  throw data('Not Found', { status: 404 })
}

export async function action({ request }: Route.ActionArgs) {
  const { pathname } = new URL(request.headers.get('Referer') || '/')
  const [formData, { data: currentUser, session }] = await Promise.all([
    request.formData(),
    getCurrentUser(request.headers.get('Cookie'))
  ])

  const role = formData.get('role') as string

  if (role === 'Administrator' && currentUser?.role !== 'Administrator') {
    return { error: 'No tienes permisos para crear administradores' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const password_hash = await generateHash(password)

  let id: number

  try {
    const [{ insertId }] = await db.insert(users).values({
      name: formData.get('name') as string,
      lastname: formData.get('lastname') as string,
      email,
      password_hash,
      role
    })

    id = insertId
  } catch {
    return { error: 'El email ya está registrado' }
  }

  if (currentUser?.role === 'Administrador') return { ok: true }

  const token = await generateToken({ id, email, role })

  session.set('token', token)

  return redirect(pathname, {
    headers: { 'Set-Cookie': await commitSession(session) }
  })
}

export default () => null
