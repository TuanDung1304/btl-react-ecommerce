import { ReactNode } from 'react'
import MainLayout from '../Layout'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from 'react-router-dom'
import Login from '../../Pages/Auth/Login'
import Register from '../../Pages/Auth/Register'
import Products from '../../Pages/Products'
import Home from '../../Pages/Home'
import ProductDetail from '../../Pages/ProductDetail'
import { useDocumentTitle } from '../../hooks'
import CreateProduct from '../../Pages/Admin/Product/CreateProduct'

export interface RouteConfig {
  title?: string
  path: string
  component: ReactNode
  layout?: JSX.ElementType
}

export const routes: RouteConfig[] = [
  {
    title: 'Trang chủ',
    path: '',
    component: <Home />,
    layout: MainLayout,
  },
  {
    title: 'Đăng nhập',
    path: '/login',
    component: <Login />,
    layout: MainLayout,
  },
  {
    title: 'Đăng ký',
    path: '/register',
    component: <Register />,
    layout: MainLayout,
  },
  {
    path: '/collections/:collection',
    component: <Products />,
    layout: MainLayout,
  },
  {
    path: '/products/:id',
    component: <ProductDetail />,
    layout: MainLayout,
  },
  {
    title: 'Create Product',
    path: '/admin/product/create',
    component: <CreateProduct />,
  },
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {routes.map(({ layout: Layout, component, path }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <DocumentTitleProvider>
              {Layout ? <Layout>{component}</Layout> : component}
            </DocumentTitleProvider>
          }
        />
      ))}
    </>,
  ),
)

export default function DefineRouter() {
  return <RouterProvider router={router} />
}

function DocumentTitleProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  useDocumentTitle(
    routes.find((r) => r.path === location.pathname)?.title ?? 'Trang chủ',
  )
  return children
}
