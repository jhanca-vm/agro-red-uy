import clsx from 'clsx/lite'
import { gte } from 'drizzle-orm'
import { Link } from 'react-router'
import ServiceCreation from '~/components/service-creation'
import db from '~/db'
import servicesTable from '~/db/schema/services'
import type { Route } from './+types/services'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  await db.insert(servicesTable).values({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    price: formData.get('price') as string,
    start: new Date(formData.get('start') as string),
    end: new Date(formData.get('end') as string),
    latitude: Number(formData.get('latitude')),
    longitude: Number(formData.get('longitude')),
    user_id: Number(formData.get('user-id'))
  })

  return { ok: true }
}

export async function loader() {
  const services = await db
    .select()
    .from(servicesTable)
    .where(gte(servicesTable.end, new Date()))
    .orderBy(servicesTable.end)

  return services
}

export default function Services({ matches }: Route.ComponentProps) {
  const [{ loaderData: user }, { loaderData: services }] = matches

  return (
    <>
      <title>Servicios - AgroRedUy</title>
      <main>
        <div className="mt-7 flex items-center justify-between">
          <h1 className="font-bold text-xl">Servicios</h1>
          {user && <ServiceCreation userId={user.id} />}
        </div>
        {services.length ? (
          <ul className="my-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                className={clsx(
                  'overflow-hidden flex flex-col rounded-xl border',
                  'border-green-600/25 text-sm'
                )}
                key={`service-${service.id}`}
              >
                <hgroup
                  className={'p-4 border-b border-green-600/25 bg-amber-600/5'}
                >
                  <h2 className="mb-2 font-bold text-base text-green-700">
                    <span className="mr-2">{service.title}</span>
                    <small
                      className={clsx(
                        'px-1 inline-block rounded-md border font-medium',
                        'text-green-600'
                      )}
                    >
                      {service.category}
                    </small>
                  </h2>
                  <p>{service.price}</p>
                </hgroup>
                <div className="p-4 grow flex flex-col">
                  <p className="mb-6 line-clamp-3">{service.description}</p>
                  <Link
                    className={clsx(
                      'w-fit mt-auto block font-medium text-amber-700',
                      'underline underline-offset-2 hover:text-amber-600'
                    )}
                    to={`/servicios/${service.id}`}
                  >
                    Ver más detalles
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="my-3">No hay servicios disponibles en este momento.</p>
        )}
      </main>
    </>
  )
}
