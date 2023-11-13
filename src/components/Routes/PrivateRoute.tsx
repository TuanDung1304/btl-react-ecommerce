import { ReactNode } from 'react'
import { useCurrentUser } from '../../hooks'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
  role?: number
}

export default function PrivateRoute({ children, role = 1 }: Props) {
  const { user } = useCurrentUser()
  // admin = 0, user = 1
  if (!user.email) return <Navigate to={'/login'} replace />
  if (user.role === 0)
    return role === 0 ? (
      <>{children}</>
    ) : (
      <Navigate to={'/admin/dashboard'} replace />
    )
  if (user.role === 1)
    return role == 1 ? <>{children}</> : <Navigate to={'/'} replace />
}
