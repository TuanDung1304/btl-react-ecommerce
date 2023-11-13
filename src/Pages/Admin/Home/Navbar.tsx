import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    gap: '10px',
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  notification: {
    position: 'relative',

    span: {
      backgroundColor: 'red',
      color: 'white',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
    },
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    img: {
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },
}))

export default function Navbar() {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.logo}>
        <img src="logo.svg" alt="" />
        <span>lamadmin</span>
      </Box>
      <Box className={classes.icons}>
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <Box className={classes.notification}>
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </Box>
        <Box className={classes.user}>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Jane</span>
        </Box>
        <img src="/settings.svg" alt="" className="icon" />
      </Box>
    </Box>
  )
}
