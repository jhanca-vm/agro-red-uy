import { format } from '@formkit/tempo'
import clsx from 'clsx/lite'
import { Draggable, Map as PigeonMap } from 'pigeon-maps'
import { useMemo, useRef, useState } from 'react'
import pin from '~/assets/pin.webp'
import Dialog from './dialog'
import Field from './field'

interface Props {
  userId: number
}

export default function ServiceCreation({ userId }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const minStart = useMemo(() => format(new Date(), 'YYYY-MM-DD'), [])
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [location, setLocation] = useState<[number, number]>([-33, -56])

  return (
    <>
      <button
        className={clsx(
          'py-1.5 px-3 rounded-lg bg-amber-600 font-medium text-white',
          'transition-colors hover:bg-amber-700'
        )}
        type="button"
        onClick={() => ref.current?.showModal()}
      >
        Publicar servicio
      </button>
      <Dialog
        ref={ref}
        title="Publicar servicio"
        label="Publicar"
        onClose={() => {
          setStart('')
          setEnd('')
          setLocation([-33, -56])
        }}
      >
        <Field label="Título" type="text" name="title" required />
        <Field
          label="Descripción"
          type="textarea"
          name="description"
          required
        />
        <Field label="Categoría" type="select" name="category" required>
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
          label="Precio (Ej: USD 50/ha, a convenir)"
          type="text"
          name="price"
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
        <fieldset className="mb-4 grid grid-cols-2 gap-4">
          <legend className="col-span-2">Ubicación:</legend>
          <Field
            label="Latitud"
            type="number"
            name="latitude"
            value={location[0]}
            required
            onChange={({ currentTarget: { valueAsNumber } }) => {
              setLocation([valueAsNumber, location[1]])
            }}
          />
          <Field
            label="Longitud"
            type="number"
            name="longitude"
            value={location[1]}
            required
            onChange={({ currentTarget: { valueAsNumber } }) => {
              setLocation([location[0], valueAsNumber])
            }}
          />
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
        <input type="hidden" name="user-id" value={userId} />
      </Dialog>
    </>
  )
}
