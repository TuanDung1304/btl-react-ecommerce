import { GridColDef } from '@mui/x-data-grid'
import DataTable from '../../../components/dataTable/DataTable'
import { useCallback, useEffect, useState } from 'react'
import { useNotify } from '../../../components/Notify/hooks'
import { ListUsersData } from '../../../api/services/types'
import { UserService } from '../../../api/services/user'
import { isAxiosError } from 'axios'
import moment from 'moment'
import { makeStyles } from 'tss-react/mui'
import { Button } from '@mui/material'

const useStyles = makeStyles()(() => ({
  root: {},
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
}))

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.avatar} alt="" />
    },
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
  },
]

const Users = () => {
  const { classes } = useStyles()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { notify } = useNotify()

  const [users, setUsers] = useState<ListUsersData[]>([])

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      const res = await UserService.getListUsers()
      setUsers(res)
    } catch (err) {
      if (isAxiosError(err)) {
        notify(err.response?.data.message, { severity: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="users">
      <div className={classes.info}>
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* TEST THE API */}

      {loading ? (
        'Loading...'
      ) : (
        <DataTable slug="users" columns={columns} rows={users} />
      )}
      {open && <Button>Add new user</Button>}
    </div>
  )
}

export default Users
