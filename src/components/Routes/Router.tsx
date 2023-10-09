import { ReactNode } from 'react'
import Home from '../../Pages/Home'
import MainLayout from '../Layout'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

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
