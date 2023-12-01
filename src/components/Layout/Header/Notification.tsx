import { Box, Typography, colors } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useNavigate } from 'react-router-dom'
import { formatTimeDifference } from './functions'
import { UserService } from '../../../api/services/user'
import { useQuery } from '@tanstack/react-query'
import { useNotify } from '../../Notify/hooks'
import { useEffect } from 'react'
import { Notification as INotification } from '../../../api/services/types'
import { useCurrentUser } from '../../../hooks'

const useStyles = makeStyles()(() => ({
  root: {
    width: 350,
    maxHeight: 350,
    padding: '0 12px 12px',
    position: 'relative',
  },
  title: {
    position: 'sticky',
    top: 0,
    padding: '10px 0',
    background: 'white',
  },
  item: {
    display: 'flex',
    cursor: 'pointer',
    padding: '6px 0px',
    '& img': { height: 62, width: 46, objectFit: 'contain' },
    gap: 10,
    '&:hover': {
      backgroundColor: colors.grey[100],
    },
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
  },
  seen: {
    fontWeight: 500,
  },
  time: {
    fontSize: 12,
  },
  empty: {
    padding: '15px',
    textAlign: 'center',
  },
}))

interface Props {
  onClose: () => void
}

export default function Notification({ onClose }: Props) {
  const { notifyError } = useNotify()
  const { classes, cx } = useStyles()
  const { setUser } = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    setUser({ notifyBadge: 0 })
    const updateLastSeen = async () => {
      try {
        await UserService.lastSeen()
      } catch (error) {
        notifyError(error)
      }
    }
    updateLastSeen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data } = useQuery({
    queryKey: ['notifications'],
    async queryFn() {
      try {
        return await UserService.getNotifications()
      } catch (err) {
        notifyError(err)
      }
    },
  })

  const handleClick = (item: INotification) => {
    onClose()
    navigate(`/product/${item.product.id}`)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography fontSize={18} fontWeight={600}>
          Thông báo
        </Typography>
      </Box>
      {data?.notifications.length ? (
        data.notifications.map((item, index) => (
          <Box
            key={index}
            className={classes.item}
            onClick={() => handleClick(item)}>
            <img src={item.product.thumbnail} />
            <Box className={classes.contentBox}>
              <Typography
                className={cx(classes.content, {
                  [classes.seen]: item.createdAt < data.lastSeen,
                })}>
                Sản phẩm được giảm giá {item.content}
                <p>{item.product.name}</p>
              </Typography>
              <Typography fontSize={12}>
                {formatTimeDifference(new Date(item.createdAt))}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Box className={classes.empty}>Không có thông báo nào!</Box>
      )}
    </Box>
  )
}
