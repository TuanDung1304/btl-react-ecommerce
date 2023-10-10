import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import CategoryGridItem from './CategoryGridItem'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  banner: {
    position: 'relative',
    width: '100%',

    '& img': {
      width: '100%',
    },
  },
  shopBtnContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
    position: 'absolute',
    top: '50%',
    right: '10%',
    transform: 'translateY(-50%)',
    gap: '25px',
  },
  label: { textAlign: 'center', fontWeight: 400, letterSpacing: '3px' },
  shopBtn: {
    fontSize: 25,
  },
  categoryGrid: {
    marginTop: '20px',
    width: '80%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

export default function Home() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.banner}>
        <img src="src/assets/home.jpg" />
        <Box className={classes.shopBtnContainer}>
          <Typography className={classes.label} variant="h2">
            Fashion Store
          </Typography>
          <Button fullWidth variant="contained" className={classes.shopBtn}>
            SHOP NOW
          </Button>
        </Box>
      </Box>
      <Grid container className={classes.categoryGrid} spacing={2}>
        <Grid item container xs={6} direction="column" rowSpacing={2}>
          <CategoryGridItem
            url="sports/men"
            content="MEN"
            img="src/assets/menCate.jpg"
          />
          <CategoryGridItem
            url="sports/sportswear"
            content="SPORTSWEAR"
            img="src/assets/sportCate.jpg"
          />
        </Grid>
        <CategoryGridItem
          url="products/women"
          content="WOMEN"
          img="src/assets/womenCate.jpg"
        />
      </Grid>
    </Box>
  )
}
