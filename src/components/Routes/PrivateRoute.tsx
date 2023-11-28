import { ReactNode } from 'react'
import { useCurrentUser } from '../../hooks'
import { Navigate } from 'react-router-dom'
import { Role } from '../../api/services/types'

interface Props {
  children: ReactNode
  role?: Role
}

export default function PrivateRoute({ children, role = Role.User }: Props) {
  const { user } = useCurrentUser()
  if (!user.email) return <Navigate to={'/login'} replace />

  if (user.role === Role.Admin)
    return role === Role.Admin ? (
      <>{children}</>
    ) : (
      <Navigate to={'/admin/dashboard'} replace />
    )

  if (user.role === Role.User)
    return role == Role.User ? <>{children}</> : <Navigate to={'/'} replace />
}
