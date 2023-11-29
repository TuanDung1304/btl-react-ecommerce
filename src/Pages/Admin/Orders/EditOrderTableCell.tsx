import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { AdminService } from '../../../api/services/admin'
import { OrderStatus } from '../../../api/services/types'
import { useNotify } from '../../../components/Notify/hooks'
import { OrderStatusBadge } from '../../Account/Order/OrderStatusBadge'

interface Props {
  status: OrderStatus
  orderId: number
  handleChangeStatus: (orderId: number, value: OrderStatus) => void
}

export default function EditOrderTableCell(props: Props) {
  const { notify, notifyError } = useNotify()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUpdate = async (status: OrderStatus) => {
    if (status === props.status) {
      return
    }
    try {
      const res = await AdminService.updateOrderStatus({
        orderId: props.orderId,
        status,
      })
      props.handleChangeStatus(props.orderId, status)
      notify(res.message)
    } catch (err) {
      notifyError(err)
    } finally {
      handleClose()
    }
  }

  return (
    <>
      <div
        aria-haspopup="true"
        aria-controls={open ? 'basic-menu' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-expanded={open ? 'true' : undefined}>
        <OrderStatusBadge status={props.status} />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {Object.values(OrderStatus).map((value, index) => (
          <MenuItem onClick={() => handleUpdate(value)} key={index}>
            <OrderStatusBadge status={value} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
