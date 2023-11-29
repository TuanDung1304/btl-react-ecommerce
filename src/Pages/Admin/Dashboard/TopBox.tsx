import { makeStyles } from 'tss-react/mui'
import { TopDeal } from '../../../api/services/types'
import { getCurrency } from '../../../utils/functions'
import { Box, Typography } from '@mui/material'

const useStyles = makeStyles()(() => ({
  root: {
    height: 400,
    overflow: 'hidden',
  },
  text: {
    marginBottom: '20px',
    fontWeight: 600,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  user: {
    display: 'flex',
    gap: '20px',
  },
  img: {
    width: '40px',
    height: '40px',
    borderRadius: ' 50%',
    objectFit: 'cover',
  },
  userTexts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  username: {
    fontSize: '14px',
    fontWeight: '500',
  },
  email: {
    fontSize: '12px',
  },
  amount: {
    fontWeight: 500,
  },
}))

interface Props {
  topUsers: TopDeal[]
}

const TopBox = ({ topUsers }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.text}>
        Top đặt hàng
      </Typography>
      <Box>
        {topUsers.map((user) => (
          <Box className={classes.listItem} key={user.id}>
            <Box className={classes.user}>
              <img src={user.avatar} alt="" className={classes.img} />
              <Box className={classes.userTexts}>
                <Typography className={classes.username}>
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography className={classes.email}>{user.email}</Typography>
              </Box>
            </Box>
            <Typography className={classes.amount}>
              {getCurrency(user.total)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default TopBox
