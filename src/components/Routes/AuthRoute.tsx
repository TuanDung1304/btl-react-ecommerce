import React from 'react'
import { useCurrentUser } from '../../hooks'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
export default function AuthRoute({ children }: Props) {
  const { user } = useCurrentUser()
  return !user.email ? (
    <>{children}</>
  ) : user.role === 0 ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/" />
  )
}
