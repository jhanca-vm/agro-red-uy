import clsx from 'clsx/lite'
import { type ReactNode, type RefObject, useEffect, useRef } from 'react'
import { useFetcher } from 'react-router'
import Spinner from './spinner'

interface Props {
  ref: RefObject<HTMLDialogElement | null>
  title: string
  action?: string
  label: string
  onClose?: () => void
  children: ReactNode
}

export default function Dialog({
  ref,
  title,
  action,
  label,
  onClose,
  children
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const fetcher = useFetcher()
  const isLoading = fetcher.state !== 'idle'

  useEffect(() => {
    if (fetcher.data?.ok) ref.current?.close()
  }, [fetcher.data, ref.current])

  return (
    <dialog
      ref={ref}
      className={clsx(
        'max-w-sm w-full m-auto p-6 rounded-lg text-neutral-700',
        'backdrop:bg-neutral-700/50 scrollbar-thin',
        isLoading && 'pointer-events-none'
      )}
      onClose={() => {
        formRef.current?.reset()
        onClose?.()
      }}
    >
      <h2 className="text-center text-xl/none">{title}</h2>
      <fetcher.Form ref={formRef} method="post" action={action}>
        {children}
        {fetcher.data?.error && (
          <p className="text-center text-sm text-amber-700">
            {fetcher.data.error}
          </p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-4 font-medium text-white">
          <button
            className={clsx(
              'py-2 rounded-md bg-green-600 transition-colors',
              'hover:bg-green-700 disabled:bg-green-700'
            )}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : label}
          </button>
          <button
            className={clsx(
              'py-2 rounded-md bg-amber-600 transition-colors',
              'hover:bg-amber-700 disabled:bg-amber-700'
            )}
            type="button"
            disabled={isLoading}
            onClick={() => ref.current?.close()}
          >
            Cancelar
          </button>
        </div>
      </fetcher.Form>
    </dialog>
  )
}
