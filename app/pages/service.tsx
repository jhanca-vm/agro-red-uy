import clsx from 'clsx/lite'
import { eq } from 'drizzle-orm'
import { Marker, Map as PigeonMap } from 'pigeon-maps'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import { data } from 'react-router'
import db from '~/db'
import services from '~/db/schema/services'
import users from '~/db/schema/users'
import type { Route } from './+types/service'
import 'react-day-picker/style.css'

export async function loader({ params }: Route.LoaderArgs) {
  const [result] = await db
    .select()
    .from(users)
    .innerJoin(services, eq(users.id, services.user_id))
    .where(eq(services.id, Number(params.id) || 0))

  if (!result) throw data('Not Found', { status: 404 })

  return { ...result.services, user: result.users }
}

export default function Service({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>{`${loaderData.title} - AgroRedUy`}</title>
      <main className="py-8 grid gap-y-14 gap-x-8 md:grid-cols-2">
        <section>
          <hgroup>
            <p
              className={clsx(
                'w-fit py-1 px-2 rounded-md bg-green-600 font-medium',
                'text-sm text-white uppercase tracking-wide'
              )}
            >
              {loaderData.category}
            </p>
            <h1 className="mt-6 mb-4 font-bold text-2xl">
              <span className="mr-3">{loaderData.title}</span>
              <small
                className={'px-1 inline-block rounded-md border font-normal'}
              >
                {loaderData.price}
              </small>
            </h1>
          </hgroup>
          <p>{loaderData.description}</p>
          <div
            className={
              'overflow-hidden mt-8 flex rounded-md border border-green-600/25'
            }
          >
            <PigeonMap
              height={300}
              defaultCenter={[
                Number(loaderData.latitude),
                Number(loaderData.longitude)
              ]}
              defaultZoom={12}
            >
              <Marker
                anchor={[
                  Number(loaderData.latitude),
                  Number(loaderData.longitude)
                ]}
                color="var(--color-green-600)"
              />
            </PigeonMap>
          </div>
        </section>
        <section className="text-right">
          <div className="w-fit mb-14 mx-auto md:mr-0">
            <h2 className="text-left font-bold text-lg">Disponibilidad</h2>
            <DayPicker
              locale={es}
              mode="range"
              defaultMonth={loaderData.start}
              selected={{ from: loaderData.start, to: loaderData.end }}
              disabled
            />
          </div>
          <p>
            <strong>
              {loaderData.user.name} {loaderData.user.lastname}
            </strong>
          </p>
          <p className="my-1">{loaderData.user.role}</p>
          <p className="text-amber-700">{loaderData.user.email}</p>
        </section>
      </main>
    </>
  )
}
