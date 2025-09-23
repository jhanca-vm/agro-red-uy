import { format } from '@formkit/tempo'
import { Draggable, Map as PigeonMap } from 'pigeon-maps'
import { useMemo, useRef, useState } from 'react'
import pin from '~/assets/pin.webp'
import type services from '~/db/schema/services'
import Dialog from './dialog'
import Field from './field'

interface Props {
  service: typeof services.$inferSelect
}

export default function ServiceEdition({ service }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const minStart = useMemo(
    () => format(service.start, 'YYYY-MM-DD'),
    [service.start]
  )
  const [start, setStart] = useState(minStart)
  const [end, setEnd] = useState(format(service.end, 'YYYY-MM-DD'))
  const [location, setLocation] = useState<[number, number]>([
    service.latitude,
    service.longitude
  ])

  return (
    <>
      <button
        className="font-medium text-green-700 hover:text-green-600"
        type="button"
        onClick={() => ref.current?.showModal()}
      >
        Editar
      </button>
      <Dialog ref={ref} title="Edita el usuario" label="Guardar">
        <input type="hidden" name="type" value="edit" />
        <input type="hidden" name="id" value={service.id} />
        <Field
          label="Título"
          type="text"
          name="title"
          defaultValue={service.title}
          required
        />
        <Field
          label="Descripción"
          type="textarea"
          name="description"
          defaultValue={service.description}
          required
        />
        <Field
          label="Categoría"
          type="select"
          name="category"
          defaultValue={service.category}
          required
        >
          <option>Siembra</option>
          <option>Cosecha</option>
          <option>Pulverización</option>
          <option>Laboreo</option>
          <option>Fardos</option>
          <option>Asesoramiento agronómico</option>
          <option>Asesoramiento veterinario</option>
          <option>Reparación de maquinaria</option>
        </Field>
        <Field
          label="Precio"
          type="text"
          name="price"
          defaultValue={service.price}
          required
        />
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="col-span-2">Disponibilidad:</legend>
          <Field
            label="Desde"
            type="date"
            name="start"
            value={start}
            required
            min={minStart}
            max={end}
            onChange={(event) => setStart(event.currentTarget.value)}
          />
          <Field
            label="Hasta"
            type="date"
            name="end"
            value={end}
            required
            min={start || minStart}
            onChange={(event) => setEnd(event.currentTarget.value)}
          />
        </fieldset>
        <fieldset className="mb-4">
          <legend>Ubicación:</legend>
          <input type="hidden" name="latitude" value={location[0]} />
          <input type="hidden" name="longitude" value={location[1]} />
        </fieldset>
        <div className="overflow-hidden flex rounded-md">
          <PigeonMap
            height={300}
            center={location}
            defaultZoom={6}
            onBoundsChanged={({ center }) => setLocation(center)}
          >
            <Draggable anchor={location} onDragEnd={setLocation}>
              <img
                className="h-6 w-auto"
                src={pin}
                alt=""
                width={32}
                height={36}
                loading="lazy"
              />
            </Draggable>
          </PigeonMap>
        </div>
      </Dialog>
    </>
  )
}
