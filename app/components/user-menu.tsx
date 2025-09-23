import clsx from 'clsx/lite'
import { useFetcher } from 'react-router'

interface Props {
  email: string
  role: string
}

export default function UserMenu({ email, role }: Props) {
  const fetcher = useFetcher()

  return (
    <>
      <button
        className={clsx(
          'p-1 rounded-full shadow-xs bg-amber-600 text-white',
          'transition-colors hover:bg-amber-700 max-md:hidden'
        )}
        type="button"
        popoverTarget="user-menu"
      >
        <svg
          className="w-7 fill-none stroke-2 stroke-current"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      </button>
      <div
        className={clsx(
          'overflow-visible top-14 left-auto',
          'right-[max(2rem,calc((100%-(--spacing(304)))/2))] mt-4',
          'border-white bg-transparent max-md:static max-md:w-full',
          'max-md:pt-4 max-md:block max-md:border-t'
        )}
        popover="auto"
        id="user-menu"
      >
        <ul
          className={clsx(
            'overflow-hidden flex flex-col bg-amber-600 text-white',
            'md:shadow-lg md:rounded-md max-md:gap-4'
          )}
        >
          <li className="flex flex-col leading-snug md:py-2 md:px-4">
            {email}
            <span className="font-light">{role}</span>
          </li>
          <li className="border-white md:border-t">
            <fetcher.Form method="post" action="/log-out">
              <button
                className="w-full hover:bg-amber-700 md:py-2 md:px-4"
                type="submit"
              >
                Cerrar sesión
              </button>
            </fetcher.Form>
          </li>
        </ul>
      </div>
    </>
  )
}
