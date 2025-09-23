import { format } from '@formkit/tempo'
import { desc, eq } from 'drizzle-orm'
import { Form } from 'react-router'
import ServiceEdition from '~/components/service-edition'
import db from '~/db'
import servicesTable from '~/db/schema/services'
import type { Route } from './+types/my-services'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const type = formData.get('type') as string
  const id = Number(formData.get('id'))

  if (type === 'delete') {
    await db.delete(servicesTable).where(eq(servicesTable.id, id))
  }

  if (type === 'edit') {
    await db
      .update(servicesTable)
      .set({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        price: formData.get('price') as string,
        start: new Date(formData.get('start') as string),
        end: new Date(formData.get('end') as string),
        latitude: Number(formData.get('latitude')),
        longitude: Number(formData.get('longitude'))
      })
      .where(eq(servicesTable.id, id))
  }

  return { ok: true }
}

export async function loader() {
  const services = await db
    .select()
    .from(servicesTable)
    .orderBy(desc(servicesTable.start))

  return services
}

export default function MyServices({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>Mis Servicios - AgroRedUy</title>
      <main>
        <h1 className="mt-8 font-bold text-xl">Mis Servicios</h1>
        {loaderData.length ? (
          <div className="overflow-auto my-8">
            <table className="w-full text-left">
              <thead>
                <tr className="*:p-3">
                  <th>Título</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loaderData.map((service) => (
                  <tr
                    className="border-t border-green-600/25 *:p-3"
                    key={`ser-${service.id}`}
                  >
                    <td className="min-w-3xs">{service.title}</td>
                    <td>{format(service.start, 'DD/MM/YYYY')}</td>
                    <td>{format(service.end, 'DD/MM/YYYY')}</td>
                    <td>
                      <ServiceEdition service={service} />
                    </td>
                    <td>
                      <Form method="post">
                        <input type="hidden" name="type" value="delete" />
                        <input type="hidden" name="id" value={service.id} />
                        <button
                          className={
                            'font-medium text-amber-700 hover:text-amber-600'
                          }
                          type="submit"
                        >
                          Eliminar
                        </button>
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="my-3">Aún no tienes servicios creados.</p>
        )}
      </main>
    </>
  )
}
