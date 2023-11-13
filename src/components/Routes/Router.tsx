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
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'
import AdminHome from '../../Pages/Admin/Home'

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
    component: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
    layout: MainLayout,
  },
  {
    title: 'Đăng ký',
    path: '/register',
    component: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
    layout: MainLayout,
  },
  {
    path: '/collections/:collection',
    component: (
      <PrivateRoute>
        <Products />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: '/products/:id',
    component: (
      <PrivateRoute>
        <ProductDetail />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    title: 'Admin Dashboard',
    path: '/admin',
    component: (
      <PrivateRoute role={0}>
        <AdminHome />
      </PrivateRoute>
    ),
  },
  {
    title: 'Create Product',
    path: '/admin/product/create',
    component: (
      <PrivateRoute role={0}>
        <CreateProduct />
      </PrivateRoute>
    ),
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
