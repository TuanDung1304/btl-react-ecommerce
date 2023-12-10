import { Box, Button } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { ListUsersData } from '../../../api/services/types'
import { UserService } from '../../../api/services/user'
import DataTable from '../../../components/DataTable/DataTable'
import { useNotify } from '../../../components/Notify/hooks'
import UserRoleBadge from './UserStatusBadge'

const useStyles = makeStyles()(() => ({
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  tableContainer: {
    maxWidth: 'calc(100vw - 278px)',
  },
}))

const columns: GridColDef<ListUsersData>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 90,
    renderCell: (params) => {
      return <img src={params.row.avatar} alt="" />
    },
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'Tên',
    width: 120,
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Họ',
    width: 140,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 230,
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Số điện thoại',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    width: 150,
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 100,
    renderCell(params) {
      return <UserRoleBadge role={params.row.role} />
    },
  },
]

const Users = () => {
  const { classes } = useStyles()
  const [open, setOpen] = useState(false)

  const { notifyError } = useNotify()

  const [users, setUsers] = useState<ListUsersData[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await UserService.getListUsers()
        setUsers(res)
      } catch (err) {
        notifyError(err)
      }
    }
    fetch()
  }, [notifyError])

  return (
    <>
      <Box className={classes.info}>
        <h1>Users</h1>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Thêm Người Dùng
        </Button>
      </Box>
      <Box className={classes.tableContainer}>
        <DataTable slug="users" columns={columns} rows={users} />
      </Box>
    </>
  )
}

export default Users
