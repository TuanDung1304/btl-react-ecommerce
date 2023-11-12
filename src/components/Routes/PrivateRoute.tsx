import { ReactNode } from 'react'
import { useCurrentUser } from '../../hooks'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
  role?: number
}

export default function PrivateRoute({ children, role }: Props) {
  const { user } = useCurrentUser()

  if (!user.email) return <Navigate to={'/login'} replace />
  if (user.role === 0)
    return role === 0 ? <>{children}</> : <Navigate to={'/admin'} replace />
  if (user.role === 1)
    return role == 1 ? <>{children}</> : <Navigate to={'/'} replace />
}
