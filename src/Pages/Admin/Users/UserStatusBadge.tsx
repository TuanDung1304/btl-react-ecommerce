import { StatusBadge } from '../../../components/ui/StatusBadge'
import { Role } from '../../../api/services/types'
import { styleFromRole } from './functions'

interface Props {
  role: Role
}

export default function UserRoleBadge({ role }: Props) {
  return <StatusBadge status={role} styleFromStatus={styleFromRole} />
}
