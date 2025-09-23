import clsx from 'clsx/lite'
import { useRef } from 'react'
import { useLocation } from 'react-router'
import Dialog from './dialog'
import Field from './field'

interface Props {
  label: string
}

export default function Signup({ label }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const { pathname } = useLocation()

  return (
    <>
      <button
        className={clsx(
          'rounded-lg font-medium transition-colors hover:bg-amber-700',
          pathname === '/admin'
            ? 'py-1.5 px-3 bg-amber-600 text-white'
            : 'md:py-1.5 md:px-3 md:bg-amber-600 md:text-white'
        )}
        type="button"
        onClick={() => ref.current?.showModal()}
      >
        {label}
      </button>
      <Dialog ref={ref} title={label} action="/sign-up" label="Registrar">
        <Field label="Nombre" type="text" name="name" required />
        <Field label="Apellido" type="text" name="lastname" required />
        <Field label="Email" type="email" name="email" required />
        <Field label="Contraseña" type="password" name="password" required />
        <Field label="Tipo de Usuario" type="select" name="role" required>
          {pathname === '/admin' ? (
            <>
              <option>Cliente</option>
              <option>Contratista</option>
              <option>Administrador</option>
            </>
          ) : (
            <>
              <option>Productor Agropecuario</option>
              <option>Contratista Rural</option>
              <option>Técnico Independiente</option>
            </>
          )}
        </Field>
      </Dialog>
    </>
  )
}
