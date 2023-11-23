import { Box, Typography } from '@mui/material'
import { useCurrentUser } from '../../../hooks'
import { makeStyles } from 'tss-react/mui'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles()(() => ({
  root: {
    width: 300,
    maxHeight: 500,
  },
  item: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    padding: '10px 8px',
    '& img': { height: 60 },
    gap: 5,
  },
}))

export default function Notification() {
  const { user } = useCurrentUser()
  const { classes } = useStyles()
  const navigate = useNavigate()
  return (
    <Box className={classes.root}>
      {user.notifications.map((item) => (
        <Box
          className={classes.item}
          onClick={() => navigate(`/product/${item.product.id}`)}>
          <img src={item.product.thumbnail} />
          <Typography fontWeight={600} fontSize={14}>
            {item.content} - {item.product.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
