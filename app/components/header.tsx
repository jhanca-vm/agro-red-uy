import clsx from 'clsx/lite'
import { useEffect, useRef } from 'react'
import { Link, useLoaderData } from 'react-router'
import logo from '~/assets/logo.webp'
import type { loader } from '~/root'
import Login from './login'
import Signup from './signup'
import UserMenu from './user-menu'

export default function Header() {
  const ref = useRef<HTMLDivElement>(null)
  const user = useLoaderData<typeof loader>()

  useEffect(() => {
    const mql = matchMedia('(width >= 48rem)')

    mql.onchange = ({ matches }) => {
      if (matches) ref.current?.hidePopover()
    }
  }, [])

  return (
    <header className="pb-6 flex items-center justify-between font-medium">
      <Link to="/">
        <img
          className="h-10 w-auto"
          src={logo}
          alt="AgroRedUy"
          width={147}
          height={60}
        />
      </Link>
      <button
        className="md:hidden"
        type="button"
        popoverTarget="menu"
        aria-label="Menú"
      >
        <svg
          className="h-5 fill-none stroke-2 stroke-current"
          viewBox="0 0 18 14"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1 1h16M1 7h16M1 13h16" />
        </svg>
      </button>
      <div
        ref={ref}
        className={clsx(
          'overflow-visible top-18 left-auto right-6 py-4 px-6 rounded-sm',
          'bg-amber-600 text-center text-white sm:right-8 md:static',
          'md:p-0 md:grow md:flex md:items-center md:justify-between',
          'md:bg-transparent md:text-neutral-700 max-md:shadow-lg',
          'max-md:leading-none'
        )}
        popover="auto"
        id="menu"
      >
        <nav className="flex flex-col gap-4 md:mx-12 md:flex-row md:gap-8">
          <Link
            className="transition-colors hover:text-green-700"
            to="/servicios"
            onClick={() => ref.current?.hidePopover()}
          >
            Servicios
          </Link>
          {user && (
            <Link
              className="transition-colors hover:text-green-700"
              to="/mis-servicios"
              onClick={() => ref.current?.hidePopover()}
            >
              Mis Servicios
            </Link>
          )}
          {user?.role === 'Administrador' && (
            <Link
              className="transition-colors hover:text-green-700"
              to="/admin"
              onClick={() => ref.current?.hidePopover()}
            >
              Admin
            </Link>
          )}
        </nav>
        {user ? (
          <UserMenu email={user.email} role={user.role} />
        ) : (
          <div
            className={clsx(
              'flex flex-col items-center gap-4 border-white md:flex-row',
              'md:gap-6 max-md:mt-4 max-md:pt-4 max-md:border-t'
            )}
          >
            <Login />
            <Signup label="Registrarse" />
          </div>
        )}
      </div>
    </header>
  )
}
