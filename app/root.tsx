import type { PropsWithChildren } from 'react'
import { isRouteErrorResponse, Links, Outlet, Scripts } from 'react-router'
import type { Route } from './+types/root'
import Header from './components/header'
import getCurrentUser from './lib/utils/get-current-user'
import './style.css'

export async function loader({ request }: Route.LoaderArgs) {
  const { data } = await getCurrentUser(request.headers.get('Cookie'))

  return data
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <Links />
      </head>
      <body
        className={'max-w-7xl mx-auto p-6 bg-white text-neutral-700 sm:px-8'}
      >
        <Header />
        <hr className="absolute inset-x-0 h-px border-green-600/25" />
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <>
      <title>Error - AgroRedUy</title>
      <main className="my-32 text-center">
        {isRouteErrorResponse(error) ? (
          <>
            <h1 className="mb-3 font-bold text-4xl">
              {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
          </>
        ) : error instanceof Error ? (
          <>
            <h1 className="mb-3 font-bold text-4xl">Error</h1>
            <p>{error.message}</p>
          </>
        ) : (
          <h1 className="font-bold text-4xl">Unknown Error</h1>
        )}
      </main>
    </>
  )
}

export default function App() {
  return <Outlet />
}
