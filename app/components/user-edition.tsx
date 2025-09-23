import { useRef } from 'react'
import type users from '~/db/schema/users'
import Dialog from './dialog'
import Field from './field'

interface Props {
  user: typeof users.$inferSelect
}

export default function UserEdition({ user }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

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
        <input type="hidden" name="id" value={user.id} />
        <Field
          label="Nombre"
          type="text"
          name="name"
          defaultValue={user.name}
          required
        />
        <Field
          label="Apellido"
          type="text"
          name="lastname"
          defaultValue={user.lastname}
          required
        />
        <Field
          label="Email"
          type="email"
          name="email"
          defaultValue={user.email}
          required
        />
        <Field label="Nueva contraseña" type="password" name="password" />
        <Field
          label="Tipo de Usuario"
          type="select"
          name="role"
          defaultValue={user.role}
          required
        >
          <option>Productor Agropecuario</option>
          <option>Contratista Rural</option>
          <option>Técnico Independiente</option>
          <option>Cliente</option>
          <option>Contratista</option>
          <option>Administrador</option>
        </Field>
      </Dialog>
    </>
  )
}
