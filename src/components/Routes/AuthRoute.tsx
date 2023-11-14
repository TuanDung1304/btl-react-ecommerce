import React from 'react'
import { useCurrentUser } from '../../hooks'
import { Navigate } from 'react-router-dom'
import { Role } from '../../api/services/types'
import { ROUTES } from './Router'

interface Props {
  children: React.ReactNode
}
export default function AuthRoute({ children }: Props) {
  const { user } = useCurrentUser()
  return !user.email ? (
    <>{children}</>
  ) : user.role === Role.Admin ? (
    <Navigate to={ROUTES.admin.dashboard} />
  ) : (
    <Navigate to="/" />
  )
}
