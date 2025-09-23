import { Form } from 'react-router'

interface Props {
  id: number
  isCurrentUser: boolean
}

export default function UserDeletion({ id, isCurrentUser }: Props) {
  return (
    <Form method="post">
      <input type="hidden" name="type" value="delete" />
      <input type="hidden" name="id" value={id} />
      {isCurrentUser && (
        <input type="hidden" name="is-current-user" value="true" />
      )}
      <button
        className="font-medium text-amber-700 hover:text-amber-600"
        type="submit"
      >
        Eliminar
      </button>
    </Form>
  )
}
