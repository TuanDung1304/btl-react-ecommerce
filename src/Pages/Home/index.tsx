import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: { width: '100%' },
  imageWrapper: {
    position: 'relative',
    width: '100%',

    '& img': {
      width: '100%',
    },
  },
  label: {
    position: 'absolute',
    top: '0',
  },
}))

export default function Home() {
  const { classes } = useStyles()
  return (
    <Box height={'5000px'} width={'100%'}>
      <Box className={classes.imageWrapper}>
        <img src="src/assets/home.jpg" />
        <Typography className={classes.label}>Fashion Store</Typography>
      </Box>
    </Box>
  )
}
