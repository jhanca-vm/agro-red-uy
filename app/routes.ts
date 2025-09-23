import { index, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  index('pages/home.tsx'),
  route('servicios', 'pages/services.tsx'),
  route('servicios/:id', 'pages/service.tsx'),
  route('mis-servicios', 'pages/my-services.tsx'),
  route('admin', 'pages/admin.tsx'),
  route('log-in', 'pages/log-in.ts'),
  route('sign-up', 'pages/sign-up.ts'),
  route('log-out', 'pages/log-out.ts')
] satisfies RouteConfig
