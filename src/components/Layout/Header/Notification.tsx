import { Box, Typography, colors } from '@mui/material'
import { useCurrentUser } from '../../../hooks'
import { makeStyles } from 'tss-react/mui'
import { useNavigate } from 'react-router-dom'
import { formatTimeDifference } from './functions'
import { useEffect } from 'react'
import { UserService } from '../../../api/services/user'

const useStyles = makeStyles()(() => ({
  root: {
    width: 350,
    maxHeight: 500,
    padding: '12px ',
  },
  item: {
    display: 'flex',
    cursor: 'pointer',
    padding: '8px 0px',
    '& img': { height: 60 },
    gap: 10,
    '&:hover': {
      backgroundColor: colors.grey[100],
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  time: {
    fontSize: 12,
  },
}))

interface Props {
  onClose: () => void
}

export default function Notification({ onClose }: Props) {
  const { user } = useCurrentUser()
  const { classes } = useStyles()
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      await UserService.lastSeen()
    }
    fetch()
  }, [])

  return (
    <Box className={classes.root}>
      <Typography fontSize={18} fontWeight={600}>
        Thông báo
      </Typography>
      {user?.notifications &&
        user.notifications?.map((item) => (
          <Box
            className={classes.item}
            onClick={() => {
              onClose()
              navigate(`/product/${item.product.id}`)
            }}>
            <img src={item.product.thumbnail} />
            <Box className={classes.content}>
              <Typography flex={1} fontWeight={600} fontSize={14}>
                Sản phẩm được giảm giá {item.content}
                <p>{item.product.name}</p>
              </Typography>
              <Typography fontSize={12}>
                {formatTimeDifference(new Date(item.createdAt))}
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  )
}
