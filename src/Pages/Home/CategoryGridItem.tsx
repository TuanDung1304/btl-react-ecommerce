import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    position: 'relative',
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
}))

interface Props {
  url: string
  content: 'MEN' | 'WOMEN' | 'SPORTSWEAR'
  img: string
}

export default function CategoryGridItem({ url, content, img }: Props) {
  const { classes } = useStyles()

  return (
    <Grid item xs={6} className={classes.root}>
      <img src={img} />
      <Box component={Link} className={classes.categoryButton} to={url}>
        {content}
      </Box>
    </Grid>
  )
}
