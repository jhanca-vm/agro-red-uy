import { useRef } from 'react'
import Dialog from './dialog'
import Field from './field'

export default function Login() {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        className="transition-colors hover:text-green-600 md:text-green-700"
        type="button"
        onClick={() => ref.current?.showModal()}
      >
        Iniciar Sesión
      </button>
      <Dialog
        ref={ref}
        title="Iniciar Sesión"
        action="/log-in"
        label="Ingresar"
      >
        <Field label="Email" type="email" name="email" required />
        <Field label="Contraseña" type="password" name="password" required />
      </Dialog>
    </>
  )
}
