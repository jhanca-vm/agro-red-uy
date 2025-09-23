import { data, redirect } from 'react-router'
import { destroySession, getSession } from '~/sessions.server'
import type { Route } from './+types/sign-up'

export function loader() {
  throw data('Not Found', { status: 404 })
}

export async function action({ request }: Route.ActionArgs) {
  const { pathname } = new URL(request.headers.get('Referer') || '/')
  const session = await getSession(request.headers.get('Cookie'))

  return redirect(pathname, {
    headers: { 'Set-Cookie': await destroySession(session) }
  })
}

export default () => null
