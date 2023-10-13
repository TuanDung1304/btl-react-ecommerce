import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
  },
  categoryImg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  categoryButton: {
    position: 'absolute',
    background: 'white',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '15px 24px',
    fontSize: 25,
    textDecoration: 'none',
    color: 'black',
    fontWeight: 500,
    fontFamily: 'Roboto',
    letterSpacing: 3.5,
  },
  ao: {
    objectPosition: '0 -50px',
  },
  quan: {
    objectPosition: '0 -393px',
  },
}))

interface Props {
  url: string
  content: 'AO' | 'QUAN' | 'PHU KIEN'
  img: string
}

export default function CategoryGridItem({ url, content, img }: Props) {
  const { classes, cx } = useStyles()

  return (
    <Grid item xs={6} className={classes.root}>
      <img
        src={img}
        className={cx(classes.categoryImg, {
          [classes.ao]: content === 'AO',
          [classes.quan]: content === 'QUAN',
        })}
      />
      <Box component={Link} className={classes.categoryButton} to={url}>
        {content}
      </Box>
    </Grid>
  )
}
