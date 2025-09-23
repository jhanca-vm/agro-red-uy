import clsx from 'clsx/lite'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'react-router'
import Signup from '~/components/signup'
import UserDeletion from '~/components/user-deletion'
import UserEdition from '~/components/user-edition'
import db from '~/db'
import usersTable from '~/db/schema/users'
import generateHash from '~/lib/utils/generate-hash'
import getCurrentUser from '~/lib/utils/get-current-user'
import { destroySession, getSession } from '~/sessions.server'
import type { Route } from './+types/admin'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const type = formData.get('type') as string
  const id = Number(formData.get('id'))

  if (type === 'delete') {
    const isCurrentUser = formData.get('is-current-user')

    await db.delete(usersTable).where(eq(usersTable.id, id))

    if (isCurrentUser) {
      const session = await getSession(request.headers.get('Cookie'))

      return redirect('/', {
        headers: { 'Set-Cookie': await destroySession(session) }
      })
    }
  }

  if (type === 'edit') {
    const password = formData.get('password') as string | null
    const user: Partial<typeof usersTable.$inferSelect> = {
      name: formData.get('name') as string,
      lastname: formData.get('lastname') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string
    }

    if (password) user.password_hash = await generateHash(password)

    try {
      await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    } catch {
      return { error: 'El email ya está registrado' }
    }

    return { ok: true }
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const [{ data: currentUser }, users] = await Promise.all([
    getCurrentUser(request.headers.get('Cookie')),
    db.select().from(usersTable).orderBy(desc(usersTable.id))
  ])

  if (currentUser?.role !== 'Administrador') return redirect('/')

  return { currentUser, users }
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { currentUser, users } = loaderData

  return (
    <>
      <title>Admin - AgroRedUy</title>
      <main>
        <div className="my-6 pl-1 flex items-center justify-between">
          <h1 className="font-bold text-xl">Usuarios</h1>
          <Signup label="Crear usuario" />
        </div>
        <div className="overflow-auto mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="*:p-3">
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  className={clsx(
                    'border-t border-green-600/25',
                    user.email === currentUser.email && 'bg-amber-600/5',
                    '*:p-3'
                  )}
                  key={`user-${user.id}`}
                >
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <UserEdition user={user} />
                  </td>
                  <td>
                    <UserDeletion
                      id={user.id}
                      isCurrentUser={user.email === currentUser.email}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
