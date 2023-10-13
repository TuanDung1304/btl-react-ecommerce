import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButton: {
    position: 'absolute',
    background: 'white',
    padding: '15px 46px',
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
}))

interface Props {
  url: string
  content: string
  title: string
  img: string
}

export default function CollectionGridItem({
  url,
  content,
  img,
  title,
}: Props) {
  const { classes } = useStyles()

  return (
    <Grid item xs={12} md={6} className={classes.root}>
      <img src={img} />
      <Box component={Link} className={classes.categoryButton} to={url}>
        <Typography color="primary">{title}</Typography>
        <Typography fontSize={26} fontWeight={500}>
          {content}
        </Typography>
      </Box>
    </Grid>
  )
}
