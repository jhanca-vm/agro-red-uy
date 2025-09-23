import clsx from 'clsx/lite'
import { type ChangeEventHandler, type ReactNode, useId } from 'react'

interface Props {
  label: string
  type: 'text' | 'email' | 'password' | 'date' | 'select' | 'textarea'
  name: string
  defaultValue?: string
  value?: string
  required?: boolean
  min?: string
  max?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  children?: ReactNode
}

export default function Field({
  label,
  type,
  name,
  defaultValue,
  value,
  required,
  min,
  max,
  onChange,
  children
}: Props) {
  const id = useId()

  return (
    <div className="my-4 flex flex-col items-start">
      <label className="mb-1.5 font-light" htmlFor={id}>
        {label}
      </label>
      {type === 'select' ? (
        <label
          className={clsx(
            'w-full pr-3 rounded-md ring ring-inset ring-neutral-700/50',
            'focus-within:outline focus-within:outline-amber-600',
            'focus-within:ring-amber-600'
          )}
        >
          <select
            className="w-full py-1.5 pl-2 font-normal text-sm outline-0"
            name={name}
            id={id}
            defaultValue={defaultValue}
            required={required}
          >
            <option hidden />
            {children}
          </select>
        </label>
      ) : type === 'textarea' ? (
        <textarea
          className={clsx(
            'w-full py-1.5 px-3 rounded-md ring ring-inset',
            'ring-neutral-700/50 font-normal text-sm outline-amber-600',
            'resize-none scrollbar-thin'
          )}
          name={name}
          id={id}
          defaultValue={defaultValue}
          required={required}
          rows={4}
        />
      ) : (
        <input
          className={clsx(
            'w-full py-1.5 px-3 rounded-md ring ring-inset',
            'ring-neutral-700/50 font-normal text-sm outline-amber-600'
          )}
          type={type}
          name={name}
          id={id}
          defaultValue={defaultValue}
          value={value}
          required={required}
          min={min}
          max={max}
          onChange={onChange}
        />
      )}
    </div>
  )
}
