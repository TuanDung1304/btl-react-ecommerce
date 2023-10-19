import { ReactNode } from 'react'
import MainLayout from '../Layout'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Login from '../../Pages/Auth/Login'
import Register from '../../Pages/Auth/Register'
import Products from '../../Pages/Products'
import Home from '../../Pages/Home'

export interface RouteConfig {
  title?: string
  path: string
  component: ReactNode
  layout?: JSX.ElementType
}

const routes: RouteConfig[] = [
  {
    path: '',
    component: <Home />,
    layout: MainLayout,
  },
  {
    path: '/login',
    component: <Login />,
    layout: MainLayout,
  },
  {
    path: '/register',
    component: <Register />,
    layout: MainLayout,
  },
  {
    path: '/collections/:type',
    component: <Products />,
    layout: MainLayout,
  },
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {routes.map(({ layout: Layout, component, path }, index) => (
        <Route
          key={index}
          path={path}
          element={Layout ? <Layout>{component}</Layout> : component}></Route>
      ))}
    </>,
  ),
)

export default function DefineRouter() {
  return <RouterProvider router={router} />
}
