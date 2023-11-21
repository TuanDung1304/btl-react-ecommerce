import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { CategoryType } from '../../consts'

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
    letterSpacing: 3.5,
  },
  ao: {
    marginTop: -16,
    '& img': {
      paddingTop: 16,
    },
  },
}))

interface Props {
  url: string
  content: CategoryType
  img: string
  xs?: number
}

export default function CategoryGridItem({ url, content, img, xs = 6 }: Props) {
  const { classes, cx } = useStyles()

  return (
    <Grid
      item
      xs={xs}
      className={cx(classes.root, {
        [classes.ao]: content === CategoryType.Ao,
      })}>
      <img src={img} className={cx(classes.categoryImg)} />
      <Box component={Link} className={classes.categoryButton} to={url}>
        {content}
      </Box>
    </Grid>
  )
}
