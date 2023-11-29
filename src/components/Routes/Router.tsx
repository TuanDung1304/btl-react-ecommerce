import { ReactNode } from 'react'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from 'react-router-dom'
import Login from '../../Pages/Auth/Login'
import Register from '../../Pages/Auth/Register'
import Home from '../../Pages/Home'
import ProductDetail from '../../Pages/ProductDetail'
import Products from '../../Pages/Products'
import { useDocumentTitle } from '../../hooks'
import MainLayout from '../Layout'
import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute'
import AdminHome from '../../Pages/Admin/Home'
import { Role } from '../../api/services/types'
import Cart from '../../Pages/Cart'
import Checkout from '../../Pages/Checkout'
import Account from '../../Pages/Account'
import Orders from '../../Pages/Account/Order'
import Profile from '../../Pages/Account/Profile'

export interface RouteConfig {
  title?: string
  path: string
  component: ReactNode
  children?: ReactNode
  layout?: JSX.ElementType
}

const routes: RouteConfig[] = [
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
    component: <Products />,
    layout: MainLayout,
  },
  {
    path: '/product/:id',
    component: <ProductDetail />,
    layout: MainLayout,
  },
  {
    title: 'Giỏ hàng',
    path: '/cart',
    component: (
      // <PrivateRoute>
      <Cart />
      // </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    title: 'Admin Dashboard',
    path: '/admin/:page',
    component: (
      <PrivateRoute role={Role.Admin}>
        <AdminHome />
      </PrivateRoute>
    ),
  },
  {
    title: 'Thanh toán',
    path: '/checkout',
    component: (
      <PrivateRoute role={Role.User}>
        <Checkout />
      </PrivateRoute>
    ),
  },
  {
    title: 'Đơn hàng',
    path: '/account',
    component: (
      <PrivateRoute role={Role.User}>
        <Account />
      </PrivateRoute>
    ),
    layout: MainLayout,
    children: (
      <>
        <Route path="my-orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </>
    ),
  },
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {routes.map(({ layout: Layout, component, path, children }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <DocumentTitleProvider>
              {Layout ? <Layout>{component}</Layout> : component}
            </DocumentTitleProvider>
          }>
          {children}
        </Route>
      ))}
    </>,
  ),
)

export const ROUTES = {
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    products: '/admin/products',
    orders: '/admin/orders',
  },
  client: {
    home: '/',
    account: {
      profile: '/account/profile',
      orders: '/account/my-orders',
      changePassword: '/account/change-password',
    },
  },
}

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
